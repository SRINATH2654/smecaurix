const canvas = document.getElementById("smoke-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let W = canvas.width;
let H = canvas.height;

class SmokeParticle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = -100; // start from left side
    this.y = H / 2 + (Math.random() * 300 - 150); // random vertical
    this.size = Math.random() * 60 + 40; // puff size
    this.speedX = Math.random() * 1.5 + 0.5; // horizontal drift speed
    this.speedY = Math.random() * 0.4 - 0.2; // slight vertical variation
    this.angle = Math.random() * Math.PI * 2;
    this.alpha = 0.05 + Math.random() * 0.07; // light transparency
  }

  update() {
    this.x += this.speedX;
    this.y += Math.sin(this.angle) * 0.5;
    this.angle += 0.01; // curl like smoke

    if (this.x > W + 100) {
      this.reset();
      this.x = -100;
    }
  }

  draw() {
    const gradient = ctx.createRadialGradient(
      this.x, this.y, this.size * 0.2,
      this.x, this.y, this.size
    );
    gradient.addColorStop(0, `rgba(255,255,255,${this.alpha})`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

let particles = [];
for (let i = 0; i < 40; i++) {
  particles.push(new SmokeParticle());
}

function animate() {
  ctx.clearRect(0, 0, W, H);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  W = canvas.width;
  H = canvas.height;
});
