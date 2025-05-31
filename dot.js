class Dot {
  constructor(x, y, col, size) {
    this.x = x;
    this.y = y;
    this.originalCol = col;
    this.col = col;
    this.size = size;
  }

  display() {
    fill(this.col);
    noStroke();
    circle(this.x, this.y, this.size);
  }

  changeColor() {
    // Change to a random color when snake touches
    this.col = color(random(255), random(255), random(255));
  }

  resetColor() {
    // Optional: restore original color
    this.col = this.originalCol;
  }
}