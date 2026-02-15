// ==================================================
// background.js
// Autor: Eduardo Gonçalves | ECGM
// Classe responsável pelo movimento do fundo do jogo
// ==================================================

class Background {
  constructor(img, speed) {
    this.img = img;       // Imagem de fundo
    this.speed = speed;   // Velocidade de deslocamento vertical
    this.y = 0;           // Posição vertical inicial do fundo
  }

  // --------------------------------------------------
  // update()
  // Atualiza a posição vertical do fundo simulando o movimento
  // Quando uma imagem sai completamente do ecrã, reinicia a posição
  // --------------------------------------------------
  update() {
    this.y += this.speed;
    if (this.y >= height) {
      this.y = 0;
    }
  }

  // --------------------------------------------------
  // show()
  // Desenha duas imagens de fundo para criar um loop contínuo
  // --------------------------------------------------
  show() {
    image(this.img, 0, this.y, width, height);
    image(this.img, 0, this.y - height, width, height);
  }
}