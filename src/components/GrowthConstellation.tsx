"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const NODE_COUNT = 20;
const CONNECT_RATIO = 0.26;
const DRAW_DURATION = 1.6;
const HOLD_DURATION = 0.5;
const FADE_DURATION = 1.0;
const TRACE_CYCLE_MIN = 8;
const TRACE_CYCLE_RANGE = 4;

const TRIANGLE_POINTS: [number, number][] = [
  [50, 8],
  [92, 90],
  [8, 90],
];

// Upward-trending polyline (a growth chart) inscribed in the triangle.
const TRACE_POINTS: [number, number][] = [
  [18, 84],
  [34, 66],
  [30, 50],
  [54, 34],
  [50, 20],
  [68, 10],
];

const STATIC_NODES: [number, number][] = [
  [14, 22],
  [30, 12],
  [58, 18],
  [80, 10],
  [90, 30],
  [70, 48],
  [40, 42],
  [16, 55],
  [62, 68],
  [86, 72],
  [24, 80],
  [50, 88],
];

const STATIC_LINES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [5, 6],
  [6, 7],
  [8, 9],
  [10, 11],
  [8, 5],
];

interface ConstellationNode {
  ax: number;
  ay: number;
  ampX: number;
  ampY: number;
  freqX: number;
  freqY: number;
  phaseX: number;
  phaseY: number;
  radius: number;
}

function createNodes(): ConstellationNode[] {
  return Array.from({ length: NODE_COUNT }, () => ({
    ax: 0.08 + Math.random() * 0.84,
    ay: 0.1 + Math.random() * 0.8,
    ampX: 0.02 + Math.random() * 0.035,
    ampY: 0.02 + Math.random() * 0.035,
    freqX: 0.035 + Math.random() * 0.05,
    freqY: 0.035 + Math.random() * 0.05,
    phaseX: Math.random() * Math.PI * 2,
    phaseY: Math.random() * Math.PI * 2,
    radius: 1.2 + Math.random() * 1.4,
  }));
}

function segmentLength(a: [number, number], b: [number, number]) {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

function pathLength(points: [number, number][]) {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += segmentLength(points[i - 1], points[i]);
  }
  return total;
}

const TRACE_TOTAL_LENGTH = pathLength(TRACE_POINTS);

type ToPixel = (point: [number, number]) => [number, number];

function makeToPixel(centerX: number, centerY: number, size: number): ToPixel {
  return ([x, y]) => [centerX + (x / 100 - 0.5) * size, centerY + (y / 100 - 0.5) * size];
}

function drawPartialPath(
  ctx: CanvasRenderingContext2D,
  points: [number, number][],
  progress: number,
  toPixel: ToPixel,
) {
  const targetLength = TRACE_TOTAL_LENGTH * progress;
  let travelled = 0;
  const [startX, startY] = toPixel(points[0]);
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  for (let i = 1; i < points.length; i++) {
    const segLength = segmentLength(points[i - 1], points[i]);
    if (travelled + segLength <= targetLength) {
      const [x, y] = toPixel(points[i]);
      ctx.lineTo(x, y);
      travelled += segLength;
    } else {
      const remaining = targetLength - travelled;
      const t = segLength === 0 ? 0 : remaining / segLength;
      const mx = points[i - 1][0] + (points[i][0] - points[i - 1][0]) * t;
      const my = points[i - 1][1] + (points[i][1] - points[i - 1][1]) * t;
      const [x, y] = toPixel([mx, my]);
      ctx.lineTo(x, y);
      break;
    }
  }
  ctx.stroke();
}

function StaticConstellation() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full text-[var(--accent)]"
    >
      <path
        d="M50 8 L92 90 L8 90 Z"
        stroke="currentColor"
        strokeWidth="0.4"
        fill="none"
        opacity="0.07"
      />
      {STATIC_LINES.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={STATIC_NODES[a][0]}
          y1={STATIC_NODES[a][1]}
          x2={STATIC_NODES[b][0]}
          y2={STATIC_NODES[b][1]}
          stroke="currentColor"
          strokeWidth="0.15"
          opacity="0.15"
        />
      ))}
      {STATIC_NODES.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={0.6} fill="currentColor" opacity="0.5" />
      ))}
    </svg>
  );
}

export function GrowthConstellation() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodes = createNodes();
    const size = { width: 0, height: 0 };
    let rafId: number | null = null;
    let startTime: number | null = null;
    let nextTraceAt = 3 + Math.random() * 3;
    let traceStart: number | null = null;
    let accent = "#34d399";
    let isDark = false;
    let visible = true;
    let tabVisible = document.visibilityState === "visible";

    function readTheme() {
      const styles = getComputedStyle(document.documentElement);
      accent = styles.getPropertyValue("--accent").trim() || accent;
      isDark = document.documentElement.classList.contains("dark");
    }
    readTheme();

    const themeObserver = new MutationObserver(readTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    function resize() {
      if (!container || !canvas || !ctx) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size.width = rect.width;
      size.height = rect.height;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    function draw(now: number) {
      if (startTime === null) startTime = now;
      const t = (now - startTime) / 1000;
      const { width, height } = size;

      ctx!.clearRect(0, 0, width, height);

      const dotAlpha = isDark ? 0.55 : 0.7;
      const lineAlphaBase = isDark ? 0.18 : 0.24;
      const deltaAlphaBase = isDark ? 0.05 : 0.06;

      const centerX = width / 2;
      const centerY = height / 2;
      const triangleSize = Math.min(Math.min(width, height) * 0.85, 560);
      const toPixel = makeToPixel(centerX, centerY, triangleSize);

      // Delta outline: slow pulse (scale/opacity/rotation).
      const pulse = Math.sin(t * ((2 * Math.PI) / 16));
      ctx!.save();
      ctx!.translate(centerX, centerY);
      ctx!.rotate((1.5 * pulse * Math.PI) / 180);
      ctx!.scale(1 + 0.02 * pulse, 1 + 0.02 * pulse);
      ctx!.translate(-centerX, -centerY);
      ctx!.strokeStyle = accent;
      ctx!.lineWidth = 1;
      ctx!.globalAlpha = Math.max(deltaAlphaBase + 0.02 * pulse, 0);
      ctx!.beginPath();
      TRIANGLE_POINTS.forEach((p, i) => {
        const [x, y] = toPixel(p);
        if (i === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      });
      ctx!.closePath();
      ctx!.stroke();
      ctx!.restore();
      ctx!.globalAlpha = 1;

      // Growth trace: an occasional bright upward-tracing line through the delta.
      if (traceStart === null && t >= nextTraceAt) {
        traceStart = t;
      }
      if (traceStart !== null) {
        const elapsed = t - traceStart;
        const total = DRAW_DURATION + HOLD_DURATION + FADE_DURATION;
        if (elapsed <= total) {
          let progress = 1;
          let alpha = 1;
          if (elapsed < DRAW_DURATION) {
            const p = elapsed / DRAW_DURATION;
            progress = 1 - Math.pow(1 - p, 3);
          } else if (elapsed >= DRAW_DURATION + HOLD_DURATION) {
            const fadeP =
              (elapsed - DRAW_DURATION - HOLD_DURATION) / FADE_DURATION;
            alpha = 1 - fadeP;
          }
          ctx!.save();
          ctx!.strokeStyle = accent;
          ctx!.lineWidth = 2;
          ctx!.lineJoin = "round";
          ctx!.lineCap = "round";
          ctx!.shadowColor = accent;
          ctx!.shadowBlur = isDark ? 8 : 4;
          ctx!.globalAlpha = Math.max(alpha, 0) * (isDark ? 0.9 : 0.85);
          drawPartialPath(ctx!, TRACE_POINTS, progress, toPixel);
          ctx!.restore();
          ctx!.globalAlpha = 1;
        } else {
          nextTraceAt = traceStart + TRACE_CYCLE_MIN + Math.random() * TRACE_CYCLE_RANGE;
          traceStart = null;
        }
      }

      // Drifting nodes + proximity connections.
      const positions = nodes.map((n) => ({
        x: (n.ax + n.ampX * Math.sin(t * n.freqX + n.phaseX)) * width,
        y: (n.ay + n.ampY * Math.cos(t * n.freqY + n.phaseY)) * height,
        r: n.radius,
      }));
      const connectDist = Math.min(width, height) * CONNECT_RATIO;
      ctx!.strokeStyle = accent;
      ctx!.lineWidth = 1;
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dx = positions[i].x - positions[j].x;
          const dy = positions[i].y - positions[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < connectDist) {
            ctx!.globalAlpha = lineAlphaBase * (1 - dist / connectDist);
            ctx!.beginPath();
            ctx!.moveTo(positions[i].x, positions[i].y);
            ctx!.lineTo(positions[j].x, positions[j].y);
            ctx!.stroke();
          }
        }
      }
      ctx!.fillStyle = accent;
      ctx!.globalAlpha = dotAlpha;
      positions.forEach((p) => {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      });
      ctx!.globalAlpha = 1;

      rafId = requestAnimationFrame(draw);
    }

    function startLoop() {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(draw);
    }
    function stopLoop() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
    function updateRunning() {
      if (visible && tabVisible) startLoop();
      else stopLoop();
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        updateRunning();
      },
      { threshold: 0.01 },
    );
    intersectionObserver.observe(container);

    function onVisibilityChange() {
      tabVisible = document.visibilityState === "visible";
      updateRunning();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    updateRunning();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <StaticConstellation />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 h-full w-full">
      <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
    </div>
  );
}
