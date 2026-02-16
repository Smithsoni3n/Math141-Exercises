import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Problem 4 (A–C) — ONE FILE VERSION (StackBlitz/Vite/React/TS)
 *
 * Given 1800 ft of NEW fencing.
 * Bottom edge is an EXISTING fence (so no new fence along the bottom).
 * Interior division makes 8 pens arranged 2 rows x 4 columns:
 *  - 3 interior vertical dividers (each length W)
 *  - 1 interior horizontal divider (length L)
 *
 * (A) Constraint (new fencing):
 *   Top outer: L
 *   Two outer sides: 2W
 *   3 vertical dividers: 3W
 *   1 horizontal divider: L
 *   Total: 2L + 5W = 1800
 *
 * (B) Area in terms of W:
 *   2L + 5W = 1800  =>  L(W) = (1800 - 5W)/2
 *   A(W) = L*W = W(1800 - 5W)/2 = 900W - (5/2)W^2
 *
 * (C) Max area (vertex of quadratic):
 *   A(W)=900W - 2.5W^2 is downward-opening
 *   Vertex: W = -b/(2a) with a=-2.5, b=900 => W=180 ft
 *   L = (1800 - 5*180)/2 = 450 ft
 *   Amax = 450*180 = 81,000 ft^2
 */

function round2(n: number) {
  return (Math.round(n * 100) / 100).toFixed(2);
}

export default function App(): JSX.Element {
  const TOTAL_FENCE = 1800;

  // Domain: 0 < W < 360 so L>0
  const [W, setW] = useState<number>(180);

  // ✅ typed canvas ref prevents TS errors
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const math = useMemo(() => {
    // (A) L(W) from constraint
    const L = (TOTAL_FENCE - 5 * W) / 2;

    // (B) area
    const A = L * W; // = 900W - 2.5W^2

    // (C) max
    const Wmax = 180;
    const Lmax = (TOTAL_FENCE - 5 * Wmax) / 2; // 450
    const Amax = Lmax * Wmax; // 81000

    const domainOk = W > 0 && W < 360;

    return { L, A, Wmax, Lmax, Amax, domainOk };
  }, [W]);

  // ----- CANVAS GRAPH -----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // CSS size (what you see)
    const cssWidth = 860;
    const cssHeight = 440;

    // HiDPI crispness
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;
    canvas.width = Math.floor(cssWidth * dpr);
    canvas.height = Math.floor(cssHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const pad = 70;
    const gw = cssWidth - 2 * pad;
    const gh = cssHeight - 2 * pad;

    // Graph window
    const xMin = 0;
    const xMax = 360; // domain limit
    const yMin = 0;
    const yMax = 81000; // maximum area

    const toX = (w: number) => pad + ((w - xMin) / (xMax - xMin)) * gw;
    const toY = (a: number) =>
      cssHeight - pad - ((a - yMin) / (yMax - yMin)) * gh;

    // Correct area function
    const Area = (w: number) => 900 * w - 2.5 * w * w;

    // Clear
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    // Grid lines
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    // Vertical grid every 60 ft
    for (let w = 0; w <= 360; w += 60) {
      const x = toX(w);
      ctx.beginPath();
      ctx.moveTo(x, pad);
      ctx.lineTo(x, cssHeight - pad);
      ctx.stroke();
    }

    // Horizontal grid every 10,000 ft^2
    for (let a = 0; a <= 81000; a += 10000) {
      const y = toY(a);
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(cssWidth - pad, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2;

    // x-axis
    ctx.beginPath();
    ctx.moveTo(pad, cssHeight - pad);
    ctx.lineTo(cssWidth - pad, cssHeight - pad);
    ctx.stroke();

    // y-axis
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, cssHeight - pad);
    ctx.stroke();

    // Labels
    ctx.fillStyle = "#111827";
    ctx.font = "14px system-ui, Arial";

    ctx.fillText("Width W (feet)", cssWidth / 2 - 55, cssHeight - 20);

    ctx.save();
    ctx.translate(22, cssHeight / 2 + 55);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Area A (square feet)", 0, 0);
    ctx.restore();

    // Tick labels
    ctx.fillStyle = "#374151";
    ctx.font = "12px system-ui, Arial";

    for (let w = 0; w <= 360; w += 60) {
      const x = toX(w);
      ctx.fillText(String(w), x - 10, cssHeight - pad + 20);
    }

    for (let a = 0; a <= 81000; a += 10000) {
      const y = toY(a);
      ctx.fillText(String(a), 10, y + 4);
    }

    // Draw curve
    ctx.strokeStyle = "#16a34a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    let first = true;
    for (let w = 0; w <= 360; w += 1) {
      const a = Area(w);
      const x = toX(w);
      const y = toY(a);
      if (first) {
        ctx.moveTo(x, y);
        first = false;
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Mark maximum vertex at W=180
    const wStar = 180;
    const aStar = Area(wStar);
    const vx = toX(wStar);
    const vy = toY(aStar);

    ctx.fillStyle = "#dc2626";
    ctx.beginPath();
    ctx.arc(vx, vy, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = "13px system-ui, Arial";
    ctx.fillText(
      `Max: (${wStar}, ${Math.round(aStar).toLocaleString()})`,
      vx - 80,
      vy - 12
    );

    // Mark chosen W with dashed guides (if valid)
    if (W > 0 && W < 360) {
      const aW = Area(W);
      const mx = toX(W);
      const my = toY(aW);

      ctx.strokeStyle = "#dc2626";
      ctx.setLineDash([6, 6]);
      ctx.lineWidth = 2;

      // vertical guide
      ctx.beginPath();
      ctx.moveTo(mx, cssHeight - pad);
      ctx.lineTo(mx, my);
      ctx.stroke();

      // horizontal guide
      ctx.beginPath();
      ctx.moveTo(pad, my);
      ctx.lineTo(mx, my);
      ctx.stroke();

      ctx.setLineDash([]);

      ctx.fillStyle = "#dc2626";
      ctx.beginPath();
      ctx.arc(mx, my, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillText(
        `W=${W.toFixed(2)}, A=${Math.round(aW).toLocaleString()}`,
        mx + 8,
        my - 8
      );
    }
  }, [W]);

  return (
    <div
      style={{
        fontFamily: "system-ui, Arial, sans-serif",
        padding: 18,
        maxWidth: 980,
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: 6 }}>Problem 4 (A–C) — Coded Correctly</h1>
      <p style={{ marginTop: 0, color: "#444" }}>
        1800 ft of <b>new</b> fencing. Bottom edge is an <b>existing fence</b>.
        8 pens arranged 2×4.
      </p>

      {/* A */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 14,
          marginBottom: 12,
        }}
      >
        <h2 style={{ marginTop: 0 }}>(A) Constraint equation</h2>
        <p style={{ lineHeight: 1.6 }}>
          New fencing = Top (<b>L</b>) + Sides (<b>2W</b>) + 3 vertical dividers (
          <b>3W</b>) + 1 horizontal divider (<b>L</b>)
        </p>
        <p style={{ fontSize: 18 }}>
          <b>2L + 5W = 1800</b> (feet)
        </p>
      </div>

      {/* B */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 14,
          marginBottom: 12,
        }}
      >
        <h2 style={{ marginTop: 0 }}>(B) Area as a function of width</h2>
        <p style={{ fontSize: 18, marginTop: 6 }}>
          <b>L(W) = (1800 − 5W)/2</b>
          <br />
          <b>A(W) = L·W = W(1800 − 5W)/2 = 900W − (5/2)W²</b>
        </p>

        <label style={{ fontWeight: 700 }}>
          Try a width W (feet):{" "}
          <input
            type="number"
            min={1}
            max={359}
            step={1}
            value={W}
            onChange={(e) => setW(Number(e.target.value))}
            style={{
              padding: 8,
              borderRadius: 8,
              border: "1px solid #bbb",
              width: 120,
            }}
          />
        </label>

        <div style={{ marginTop: 10, lineHeight: 1.8 }}>
          <div>
            Valid domain: <b>0 &lt; W &lt; 360</b> →{" "}
            <b style={{ color: math.domainOk ? "#1a7f37" : "#b42318" }}>
              {math.domainOk ? "Valid" : "Invalid"}
            </b>
          </div>
          <div>
            L = <b>{round2(math.L)} ft</b>
          </div>
          <div>
            A = <b>{round2(math.A)} ft²</b>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canvasRef} />
        </div>
      </div>

      {/* C */}
      <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 14 }}>
        <h2 style={{ marginTop: 0 }}>(C) Largest possible area (algebra)</h2>
        <p style={{ fontSize: 18, lineHeight: 1.7 }}>
          Because <b>A(W) = 900W − (5/2)W²</b> is a downward-opening quadratic,
          the maximum occurs at its vertex.
          <br />
          <br />
          <b>W = 180 ft</b>, then <b>L = 450 ft</b>.
          <br />
          Largest area: <b>81,000 ft²</b>.
        </p>

        <p style={{ marginTop: 8, color: "#444" }}>
          Final: The largest possible area is <b>{math.Amax.toLocaleString()} ft²</b>{" "}
          at <b>W = {math.Wmax} ft</b> (and <b>L = {math.Lmax} ft</b>).
        </p>
      </div>
    </div>
  );
}
