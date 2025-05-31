// Global variables
let imgOriginal;
let img;
let dots = [];
let xStep = 10;
let yStep = 10;
let imgScale = 1;
let imgXOffset = 0;
let imgYOffset = 0;

// Snake variables
let snake;

// Audio variables
let song;
let fft;
let numBins = 64;
let smoothing = 0.8;
let volumeSlider;

function preload() {
  imgOriginal = loadImage('assets/Piet_Mondrian Broadway_Boogie_Woogie.jpeg');
  song = loadSound('assets/Aimer-Eclipse.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Initialize FFT
  fft = new p5.FFT(smoothing, numBins);
  song.connect(fft);

  // Add Play/Pause button
  let playButton = createButton('Play/Pause');
  playButton.position(20, 20);
  playButton.mousePressed(play_pause);

  // Create volume slider
  volumeSlider = createSlider(0, 1, 0.5, 0.01);
  volumeSlider.position(width - 160, 30);
  volumeSlider.style('width', '150px');

  // Initialize image and dots
  calculateImageAndDots();

  // Initialize snake
  snake = new Snake();
}

function draw() {
  background(255);

  // Update volume
  song.setVolume(volumeSlider.value());

  // Display dots
  for (let dot of dots) {
    dot.display();
  }

  // Analyze spectrum
  let spectrum = fft.analyze();
  let energy = fft.getEnergy(20, 20000);

  // Update and display snake
  snake.update(energy, spectrum);
  snake.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  volumeSlider.position(width - 160, 30);
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

function play_pause() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}