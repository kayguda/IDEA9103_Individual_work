class Snake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.angle = random(TWO_PI);
  }

  update(level, spectrum) {
    // 用 level 控制速度
    this.speed = map(level, 0, 1, 1, 10);

    // 用某段频谱控制角度变化
    let freqEnergy = spectrum[10]; // 选第10个频段
    this.angle += map(freqEnergy, 0, 255, -0.1, 0.1);

    // 更新位置
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);

    // 边界处理
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  display() {
    fill(0, 255, 0);
    noStroke();
    ellipse(this.x, this.y, 20, 20); // Snake 头部
  }

  eatDots(dotArray) {
    for (let i = dotArray.length - 1; i >= 0; i--) {
      let d = dist(this.x, this.y, dotArray[i].x, dotArray[i].y);
      if (d < 15) {
        // 吃掉 Dot
        dotArray.splice(i, 1);
      }
    }
  }
}