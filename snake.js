class Snake {
  constructor() {
    this.segments = [];
    this.length = 15;  // Number of snake segments
    this.x = width / 2;
    this.y = height / 2;
    this.angle = 0;
  }

  update(level) {
    // Changing movement speed with audio level (dynamic)
    this.angle += map(level, 0, 1, 0.02, 0.2);

    this.x += cos(this.angle) * 5;
    this.y += sin(this.angle) * 5;

    // Make sure the snake doesn't go out of bounds
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);

    // Adding new segments
    this.segments.push({ x: this.x, y: this.y });

    // Keep the snake length
    if (this.segments.length > this.length) {
      this.segments.shift();
    }
  }

  display() {
    fill(255, 100, 0);
    noStroke();
    for (let seg of this.segments) {
      ellipse(seg.x, seg.y, 15, 15);
    }
  }
}