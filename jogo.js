angular.module('BlackjackApp', [])
  .controller('JogoController', function() {
    this.jogo_iniciado = false;
    this.jogo_encerrado = true;
    this.qtd_baralhos = "1";
    this.baralho = new Array();
    this.cartas_jogador = new Array();
    this.valor_jogador = 0;
    this.cartas_banca = new Array();
    this.valor_banca = 0;
    this.valor_banca_visivel = 0;
    this.vez = 'Jogador';
    this.ganhador = '';

    this.lista_naipes = [
      {
        nome: 'Espadas',
        nome_img: 'spades'
      }, {
        nome: 'Copas',
        nome_img: 'hearts'
      }, {
        nome: 'Paus',
        nome_img: 'clubs'
      }, {
        nome: 'Ouros',
        nome_img: 'diamonds'
      }
    ];

    this.valores_cartas = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

    this.iniciar_jogo = function() {
      this.jogo_iniciado = true;
      this.jogo_encerrado = false;
      this.vez = 'Jogador';
      this.mostrar_cartas = false;

      // this.qtd_baralhos = 2;
      this.baralho = new Array();
      this.cartas_jogador = new Array();
      this.cartas_banca = new Array();
      this.valor_jogador = 0;
      this.valor_banca = 0;

      this.embaralhar_cartas();
      this.distribuir_cartas_iniciais();
    };

    this.embaralhar_cartas = function() {
      var cartas = new Array();
      for(var i=0; i<this.qtd_baralhos; i++) {
        this.lista_naipes.forEach(naipe => {
          this.valores_cartas.forEach(valor => {
            var carta = {
              naipe: naipe,
              valor: valor,
              img: `assets/svg/${ valor }_of_${naipe.nome_img}.svg`
            }
            cartas.push(carta);
          });
        });
      }
      this.baralho = cartas.sort(function() { return 0.5 - Math.random() });
    }

    this.distribuir_cartas_iniciais = function() {
      this.puxar_carta('Jogador',true);
      this.puxar_carta('Banca',true);
      this.puxar_carta('Jogador',true);
      this.puxar_carta('Banca',false);
    }

    this.puxar_carta = function(player, mostrar_valor=false) {
      var carta = this.baralho.pop();
      carta.visivel = mostrar_valor;

      if (player == "Jogador") {
        this.cartas_jogador.push(carta);
        this.valor_jogador += this.get_valor_carta(carta);

        if (this.valor_jogador >= 21) {
          this.encerrar_rodada();
        }
        
      } else {
        this.cartas_banca.push(carta);
        this.valor_banca += this.get_valor_carta(carta);
        if (mostrar_valor) {
          this.valor_banca_visivel = this.valor_banca;
        }

        if (this.valor_banca >= 21) {
          this.encerrar_rodada();
        }
      }
    }

    this.passar_vez_para_banca = function() {
      this.vez = "Banca";

      while(this.valor_banca <= 17) {
        this.puxar_carta('Banca', false);
      }

      this.encerrar_rodada();
    }

    this.encerrar_rodada = function() {
      this.cartas_banca.forEach(carta => {
        carta.visivel = true;
      });
      this.valor_banca_visivel = this.valor_banca;
      this.jogo_encerrado = true;

      if (this.valor_banca > 21) {
        this.ganhador = 'Jogador';
        console.log('O Jogador venceu!');
      } else if (this.valor_jogador > 21) {
        this.ganhador = 'Banca';
        console.log('A Banca venceu!');
      } else if (this.valor_jogador > this.valor_banca) {
        this.ganhador = 'Jogador';
        console.log('O Jogador venceu!');
      } else if (this.valor_jogador < this.valor_banca) {
        this.ganhador = 'Banca';
        console.log('A Banca venceu!');
      } else {
        this.ganhador = null;
        console.log('Empate!');
      }
    }

    this.reiniciar_jogo = function() {
      this.jogo_iniciado = true;
      this.jogo_encerrado = false;
      this.vez = 'Jogador';
      this.mostrar_cartas = false;

      // this.qtd_baralhos = 2;
      this.baralho = new Array();
      this.cartas_jogador = new Array();
      this.cartas_banca = new Array();
      this.valor_jogador = 0;
      this.valor_banca = 0;

      this.embaralhar_cartas();
      this.distribuir_cartas_iniciais();
    }

    this.finalizar_jogo = function() {
      this.jogo_iniciado = false;
      this.jogo_encerrado = true;
      // this.qtd_baralhos = 2;
      this.baralho = new Array();
      this.cartas_jogador = new Array();
      this.valor_jogador = 0;
      this.cartas_banca = new Array();
      this.valor_banca = 0;
      this.valor_banca_visivel = 0;
      this.vez = 'Jogador';
      this.ganhador = '';
    }

    this.get_valor_carta = function(carta) {
      var pontos_jogador;
      var valor;

      if (this.vez == "Jogador") {
        pontos_jogador = this.valor_jogador;
      } else {
        pontos_jogador = this.valor_banca;
      }

      switch(carta.valor) {
        case 'ace':
          if (pontos_jogador > 10) {
            valor = 1;
          } else {
            valor = 11;
          }
          break;
        case 'jack':
          valor = 10;
          break;
        case 'queen':
          valor = 10;
          break;
        case 'king':
          valor = 10;
          break;
        default:
          valor = +carta.valor;
      }

      return valor;
    }

    this.cartas_a_serem_viradas_jogador = function() {
      return Array(5-this.cartas_jogador.length).fill('');
    }

    this.cartas_a_serem_viradas_banca = function() {
      return Array(5-this.cartas_banca.length).fill('');
    }
  });