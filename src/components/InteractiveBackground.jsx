import { useEffect, useRef } from "react";

export const InteractiveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Sophisticated Resn-inspired background with floating blobs
    const blobs = [];

    class Blob {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 150 + 80;
        this.hue = Math.random() * 60 + 240; // Blues, purples, pinks
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.wobbleOffset = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.015 + 0.008;
      }

      update(time, mouseX, mouseY) {
        // Slow drift
        this.baseX += this.vx;
        this.baseY += this.vy;

        // Bounce off edges
        if (this.baseX < 0 || this.baseX > canvas.width) this.vx *= -1;
        if (this.baseY < 0 || this.baseY > canvas.height) this.vy *= -1;

        // Wave motion
        const wobble = Math.sin(time * this.wobbleSpeed + this.wobbleOffset) * 30;
        this.x = this.baseX + wobble;
        this.y = this.baseY + wobble * 0.7;

        // Slight attraction to mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 400) {
          this.x += dx * 0.00001;
          this.y += dy * 0.00001;
        }
      }

      draw(ctx, time) {
        const glow = Math.sin(time * 0.003) * 0.2 + 0.6;
        
        // Create radial gradient
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 1.5);
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 65%, ${0.25 * glow})`);
        gradient.addColorStop(0.4, `hsla(${this.hue}, 100%, 50%, ${0.12 * glow})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 40%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize blobs
    for (let i = 0; i < 4; i++) {
      blobs.push(new Blob());
    }

    const animate = () => {
      // Clear with dark background
      ctx.fillStyle = "rgba(8, 8, 15, 0.85)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw blobs
      blobs.forEach((blob) => {
        blob.update(time, mouseX, mouseY);
        blob.draw(ctx, time);
      });

      time++;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ display: "block", pointerEvents: "none" }}
    />
  );
};
