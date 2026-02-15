// ==================================================
// player.js
// Autor: Eduardo Gonçalves | ECGM
// Classe responsável pelo jogador e pelo seu movimento
// ==================================================

class Player {
  constructor(img) {
    this.img = img;                 // Imagem do jogador
    this.width = 250;               // Largura do sprite
    this.height = 250;              // Altura do sprite
    this.x = width / 2 - this.width / 2; // Posição inicial horizontal (centro)
    this.y = height - 230;          // Posição vertical fixa
  this.raio = Math.min(this.width, this.height) * 0.25; // Raio de colisão

    // Limites de movimento horizontal
    this.minX = 40;
    this.maxX = width - 300;
  }

  // --------------------------------------------------
  // update()
  // Atualiza a posição do jogador conforme as teclas pressionadas
  // --------------------------------------------------
  update() {
    if (keyIsDown(LEFT_ARROW)) this.x -= 5;
    if (keyIsDown(RIGHT_ARROW)) this.x += 5;

    // Mantém o jogador dentro dos limites do ecrã
    this.x = constrain(this.x, this.minX, this.maxX);
  }

  // --------------------------------------------------
  // show()
  // Desenha o jogador no ecrã
  // --------------------------------------------------
  show() {
    image(this.img, this.x, this.y, this.width, this.height);
  }
}