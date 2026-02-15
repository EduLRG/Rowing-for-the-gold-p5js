// ==================================================
// obstaculos.js
// Autor: Eduardo Gonçalves | ECGM
// Classe responsável pela criação, movimento e desenho
// dos obstáculos (troncos e pedras) no jogo
// ==================================================

class Obstaculo {
  constructor() {
    // Tipo de obstáculo (aleatório entre pedra e tronco)
    this.tipo = random(['pedra', 'tronco']);
    this.img = this.tipo === 'pedra' ? pedraImg : troncoImg;
    this.size = this.tipo === 'pedra' ? 80 : 140;
    this.drawWidth = this.tipo === 'pedra' ? 100 : 70;
    this.drawHeight = this.tipo === 'pedra' ? 100 : 50;
    this.raio = Math.min(this.drawWidth, this.drawHeight) * 0.5;

    // Posição inicial
    this.x = random(80, width - 180);
    this.y = -this.size;

  // Velocidade vertical (controlada pelo fundo no update)
  this.vel = 0;

    // Movimento lateral apenas para os troncos
    this.dx = this.tipo === 'tronco' ? random(2, 3) : 0;
    this.direcao = random(['esquerda', 'direita']);
  }

  // --------------------------------------------------
  // update()
  // Atualiza a posição do obstáculo (vertical e horizontal)
  // Troncos movem-se também lateralmente
  // --------------------------------------------------
  update(velocidadeFundo) {
    this.y += velocidadeFundo;

    if (this.tipo === 'tronco') {
      if (this.direcao === 'direita') this.x += this.dx;
      else this.x -= this.dx;

      // Inverte a direção ao tocar nas margens
      if (this.x <= 60) this.direcao = 'direita';
      if (this.x >= width - 180) this.direcao = 'esquerda';
    }
  }

  // --------------------------------------------------
  // show()
  // Desenha o obstáculo na posição atual
  // --------------------------------------------------
  show() {
    if (this.tipo === "tronco") {
      image(troncoImg, this.x, this.y, this.drawWidth, this.drawHeight);
    } else if (this.tipo === "pedra") {
      image(pedraImg, this.x, this.y, this.drawWidth, this.drawHeight);
    }
  }

  // --------------------------------------------------
  // foraDoEcrã()
  // Verifica se o obstáculo já saiu completamente do ecrã
  // --------------------------------------------------
  foraDoEcrã() {
    return this.y > height + this.size;
  }
}