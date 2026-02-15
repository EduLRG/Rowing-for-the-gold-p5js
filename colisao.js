// ==================================================
// colisao.js
// Autor: Eduardo Gonçalves | ECGM
// Função que verifica colisões entre o jogador e os obstáculos
// e ajusta a velocidade do fundo após cada colisão
// ==================================================

function colisaoInimigo(jogador, obstaculos, fundo) {
  // Percorre todos os obstáculos ao contrário (para poder remover dentro do loop)
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    let o = obstaculos[i];

    // Calcula a distância entre o centro do jogador e o centro do obstáculo
    let distancia = dist(
      jogador.x + jogador.width / 2,
      jogador.y + jogador.height / 2,
      o.x + (o.drawWidth ? o.drawWidth / 2 : 0),
      o.y + (o.drawHeight ? o.drawHeight / 2 : 0)
    );

    // Define o raio aproximado para deteção de colisões circulares
    let raioJogador = jogador.raio ? jogador.raio : jogador.width / 2;
    let raioObstaculo = o.raio ? o.raio : (o.size ? o.size / 2 : 30);

    // Se a distância for menor que a soma dos raios, há colisão
    if (distancia < raioJogador + raioObstaculo) {
      fundo.speed = max(0.5, fundo.speed - 0.3); // Reduz a velocidade após colisão
      obstaculos.splice(i, 1);                   // Remove o obstáculo atingido
    }
  }
}