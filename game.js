// ============================================
// Jogo de Remo - "Rowing for the Gold"
// Autor: Eduardo Gonçalves |
// ============================================

// ---------- CONSTANTES PRINCIPAIS ----------
const VELOCIDADE_INICIAL = 0.8;   // Velocidade inicial do fundo (movimento)
const VELOCIDADE_MINIMA = 1.0;    // Velocidade mínima após uma colisão
const MAX_VELOCIDADE = 11.0;      // Velocidade máxima atingível pelo jogador
const TEMPO_TOTAL = 60;           // Duração total do jogo (segundos)

// ---------- VARIÁVEIS GERAIS ----------
let backgroundImage;
let fundo;
let playerImage;
let jogador;
let score = 0;
let obstaculos = [];
let pedraImg, troncoImg;

// ---------- ESTADO DO JOGO ----------
let gameState = "start";          // Pode ser: "start", "playing" ou "gameover"
let startMillis = 0;

// ---------- CONFIGURAÇÕES DE OBSTÁCULOS ----------
let spawnRate = 110;              // Intervalo entre o aparecimento de obstáculos
let maxObstaculos = 8;            // Número máximo de obstáculos simultâneos

// ---------- MICROFONE ----------
let mic;
let volumeThreshold = 0.02;       // Sensibilidade para captar o som
let smoothedVolume = 0;           // Volume suavizado (para maior estabilidade)
let smoothingFactor = 0.05;       // Fator de suavização

// ---------- ÁUDIO ----------
let colisaoSound;                 // Som de colisão
let musica;                       // Música de fundo

// ==================================================
// FUNÇÃO: preload()
// Carrega todas as imagens e sons antes do jogo começar
// ==================================================
function preload() {
  backgroundImage = loadImage('media/media/background.png');
  playerImage = loadImage('media/media/personagem.png');
  pedraImg = loadImage('media/media/pedra.png');
  troncoImg = loadImage('media/media/tronco.png');

  colisaoSound = loadSound('media/media/colisao.wav');
  musica = loadSound('media/media/musica.wav');
}

// ==================================================
// FUNÇÃO: setup()
// Configura o ambiente inicial do jogo
// ==================================================
function setup() {
  createCanvas(900, 750);

  // Criação do fundo e do jogador
  fundo = new Background(backgroundImage, VELOCIDADE_INICIAL);
  jogador = new Player(playerImage);
  jogador.y = height - 250;

  // Configuração do texto
  textSize(24);
  textAlign(RIGHT, TOP);
  fill(255);

  // Inicialização do microfone
  mic = new p5.AudioIn();
  mic.start();

  // Iniciar música de fundo (volume reduzido e em loop)
  if (!musica.isPlaying()) {
    musica.loop();
    musica.setVolume(0.2);
  }
}

// ==================================================
// FUNÇÃO: draw()
// Função principal que é chamada a cada frame
// ==================================================
function draw() {
  fundo.update();
  fundo.show();

  if (gameState === "start") drawStartScreen();
  else if (gameState === "playing") drawGame();
  else if (gameState === "gameover") drawGameOver();

  drawInformacoesFixas();
}

// ==================================================
// FUNÇÃO: drawStartScreen()
// Mostra a tela inicial do jogo
// ==================================================
function drawStartScreen() {
  textAlign(CENTER, CENTER);
  textSize(48);
  fill(255);
  text("Rowing for the Gold", width / 2, height / 2 - 50);

  textSize(20);
  text("Pressiona a Barra de Espaço para começar", width / 2, height / 2 + 10);

  textSize(14);
  text("Usa o som do teu microfone para aumentar a velocidade do barco.", width / 2, height / 2 + 50);
  text("Evita os obstáculos e tenta remar o máximo possível!", width / 2, height / 2 + 70);
}

// ==================================================
// FUNÇÃO: drawGame()
// Controla toda a jogabilidade durante a corrida
// ==================================================
function drawGame() {
  jogador.update();
  jogador.show();

  // Cálculo do tempo restante
  let elapsedSeconds = floor((millis() - startMillis) / 1000);
  let remaining = max(0, TEMPO_TOTAL - elapsedSeconds);

  textAlign(LEFT, TOP);
  textSize(24);
  fill(255);
  text("Tempo: " + nf(floor(remaining / 60), 2) + ":" + nf(remaining % 60, 2), 20, 20);
  text("Pontuação: " + Math.floor(score) + " metros", 20, 50);

  // Atualiza a pontuação
  score += fundo.speed * 0.1;

  // --- Captação do som ---
  let volume = mic.getLevel();
  smoothedVolume = lerp(smoothedVolume, volume, smoothingFactor);

  // Se o som ultrapassar o limiar, aumenta a velocidade do fundo
  if (smoothedVolume > volumeThreshold) {
    fundo.speed = constrain(fundo.speed + 0.05, VELOCIDADE_INICIAL, MAX_VELOCIDADE);
  }

  // --- Colisões ---
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    let o = obstaculos[i];
    if (colisaoCirculoJogador(jogador, o)) {
      fundo.speed = max(VELOCIDADE_MINIMA, fundo.speed * 0.85);
      obstaculos.splice(i, 1);
      colisaoSound.play();
    }
  }

  // --- Geração de obstáculos ---
  let velocidadeRatio = constrain(fundo.speed / VELOCIDADE_INICIAL, 1, 6);
  let adjustedSpawnRate = max(30, Math.floor(spawnRate / velocidadeRatio));
  let adjustedMaxObstaculos = Math.floor(maxObstaculos * velocidadeRatio);

  // Adiciona novos obstáculos de forma controlada
  if (frameCount % floor(adjustedSpawnRate) === 0 && obstaculos.length < adjustedMaxObstaculos) {
    obstaculos.push(new Obstaculo());
  }

  // Atualiza e desenha os obstáculos
  for (let obstaculo of obstaculos) {
    obstaculo.update(fundo.speed);
    obstaculo.show();
  }

  obstaculos = obstaculos.filter(o => !o.foraDoEcrã());

  // Termina o jogo quando o tempo acaba
  if (remaining <= 0) gameState = "gameover";
}

// ==================================================
// FUNÇÃO: drawGameOver()
// Ecrã final após o tempo acabar
// ==================================================
function drawGameOver() {
  textAlign(CENTER, CENTER);
  textSize(48);
  fill(255, 0, 0);
  text("Fim de Jogo!", width / 2, height / 2 - 50);

  textSize(24);
  fill(255);
  text("Distância total: " + Math.floor(score) + " metros", width / 2, height / 2 + 10);
  text("Pressiona Barra de Espaço para jogar novamente", width / 2, height / 2 + 60);
}

// ==================================================
// FUNÇÃO: keyPressed()
// Controla as teclas pressionadas
// ==================================================
function keyPressed() {
  if (key === ' ' && gameState === "start") {
    gameState = "playing";
    startMillis = millis();
    score = 0;
    fundo.speed = VELOCIDADE_INICIAL;
    obstaculos = [];
  } else if (key === ' ' && gameState === "gameover") {
    gameState = "start";
  }
}

// ==================================================
// FUNÇÃO: drawInformacoesFixas()
// Mostra dados úteis (debug, volume, etc.)
// ==================================================
function drawInformacoesFixas() {
  textAlign(RIGHT, TOP);
  textSize(14);
  fill(255);
  text("Velocidade: " + fundo.speed.toFixed(2), width - 20, 20);
}

// ==================================================
// FUNÇÃO AUXILIAR: colisaoCirculoJogador()
// Verifica se há colisão entre jogador e obstáculo
// ==================================================
function colisaoCirculoJogador(j, o) {
  let jx = j.x + j.width / 2;
  let jy = j.y + j.height / 2;
  let ox = o.x + (o.drawWidth ? o.drawWidth / 2 : 0);
  let oy = o.y + (o.drawHeight ? o.drawHeight / 2 : 0);
  let d = dist(jx, jy, ox, oy);
  return d < (j.raio + o.raio);
}