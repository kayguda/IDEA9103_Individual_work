let imgOriginal;
let img;
let dots = [];
let xStep = 10;
let yStep = 10;
let imgScale = 1;
let imgXOffset = 0;
let imgYOffset = 0;

// 音频相关
let song;
let fft;
let amp;

// 蛇
let snake;

function preload() {
  imgOriginal = loadImage('assets/Piet_Mondrian Broadway_Boogie_Woogie.jpeg');
  song = loadSound('assets/Aimer-Eclipse.wav'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // 初始化 dots
  calculateImageAndDots();

  // 初始化 snake
  snake = new Snake(width / 2, height / 2, 10);

  // 初始化音频分析
  fft = new p5.FFT(0.8, 64); // smoothing, bins
  amp = new p5.Amplitude();

  // 播放按钮
  let button = createButton('Play/Pause');
  button.position(20, 20);
  button.mousePressed(togglePlay);

  song.connect(fft);
  amp.setInput(song);
}

function draw() {
  background(255);

  // 画 dots
  for (let dot of dots) {
    dot.display();
  }

  // 获取音频数据
  let spectrum = fft.analyze();
  let level = amp.getLevel();

  // 更新和画 snake
  snake.update(level, spectrum);
  snake.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateImageAndDots();
}

function calculateImageAndDots() {
  dots = [];

  img = imgOriginal.get();
  img.resize(0, height);

  imgScale = height / img.height;
  imgXOffset = (width - img.width) / 2;
  imgYOffset = 0;

  for (let i = 0; i < img.width; i += xStep) {
    for (let j = 0; j < img.height; j += yStep) {
      let pixelColor = img.get(i, j);
      let bri = brightness(pixelColor);
      let size = map(bri, 0, 255, 20, 0);
      dots.push(new Dot(i + imgXOffset, j + imgYOffset, pixelColor, size));
    }
  }
}

function togglePlay() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.loop();
  }
}