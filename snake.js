class Snake {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 20;
    this.speed = 5;
    this.direction = createVector(1, 0);
  }

  update(energy, spectrum) {
    // Map energy to speed (you can tune this!)
    this.speed = map(energy, 0, 255, 2, 10);

    // Optionally, also vary direction using spectrum data
    let angleOffset = map(spectrum[0], 0, 255, -0.1, 0.1);
    this.direction.rotate(angleOffset);

    // Update position
    this.x += this.direction.x * this.speed;
    this.y += this.direction.y * this.speed;

    // Boundary check: wrap around screen
    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    // Check collision with dots
    for (let dot of dots) {
      let d = dist(this.x, this.y, dot.x, dot.y);
      if (d < this.size / 2 + dot.size / 2) {
        dot.changeColor();
      }
    }
  }

  display() {
    fill(255, 0, 0);
    noStroke();
    circle(this.x, this.y, this.size);
  }
}