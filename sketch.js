let imgOriginal, img, dots = [], snake;
let xStep = 10, yStep = 10;
let imgScale = 1, imgXOffset = 0, imgYOffset = 0;

let audio, fft, amplitude;

function preload() {
  imgOriginal = loadImage('assets/Piet_Mondrian Broadway_Boogie_Woogie.jpeg');
  audio = loadSound('assets/Aimer-Eclipse.wav'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  calculateImageAndDots();

  fft = new p5.FFT(0.8, 64);
  amplitude = new p5.Amplitude();
  amplitude.setInput(audio);

  snake = new Snake(width / 2, height / 2);

  let button = createButton('Play / Pause');
  button.position(10, 10);
  button.mousePressed(() => {
    if (audio.isPlaying()) audio.pause();
    else audio.loop();
  });
}

function draw() {
  background(255);

  // Draw Dot Art
  for (let dot of dots) {
    dot.display();
  }

  // Get audio data
  let level = amplitude.getLevel();
  let spectrum = fft.analyze();

  // Update Snake
  snake.update(level, spectrum);
  snake.display();

  // Snake eats dots
  snake.eatDots(dots);
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