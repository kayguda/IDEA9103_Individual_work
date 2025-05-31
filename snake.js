class Snake {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = 2;
    this.angle = random(TWO_PI);
  }

  update(level, spectrum) {
    // 音量控制速度
    this.speed = map(level, 0, 1, 1, 10);

    // 高频率能量控制方向变化
    let freqEnergy = spectrum[10];
    this.angle += map(freqEnergy, 0, 255, -0.1, 0.1);

    // 更新位置
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);

    // 撞墙反弹
    if (this.x < 0 || this.x > width) {
      this.angle = PI - this.angle;
    }
    if (this.y < 0 || this.y > height) {
      this.angle = -this.angle;
    }

    // 检测碰撞 dots
    for (let dot of dots) {
      let d = dist(this.x, this.y, dot.x, dot.y);
      if (d < this.radius + dot.size / 2) {
        // 改变 dot 颜色，改成随机颜色
        dot.changeColor(color(random(255), random(255), random(255)));
      }
    }
  }

  draw() {
    fill(255, 0, 0); // 红色蛇头
    noStroke();
    circle(this.x, this.y, this.radius * 2);
  }
}