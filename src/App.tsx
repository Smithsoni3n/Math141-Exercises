// App.tsx
import React, { useMemo, useState } from "react";

/**
 * Problem 4 (A–C)
 * Rectangle garden uses 1800 ft of NEW fencing.
 * Bottom side borders an existing fence (so no new fence there).
 * Fence is also used to create 8 pens arranged 2 rows x 4 columns:
 * - 3 interior vertical dividers (each length W)
 * - 1 interior horizontal divider (length L)
 *
 * Total NEW fencing:
 *   Top outer side: L
 *   Two outer sides: 2W
 *   3 interior vertical dividers: 3W
 *   1 interior horizontal divider: L
 *   -------------------------------
 *   Total = 2L + 5W = 1800
 */

function round2(x: number) {
  return Math.round(x * 100) / 100;
}

export default function App() {
  const TOTAL_FENCE = 1800;

  const [W, setW] = useState<number>(180);

  const computed = useMemo(() => {
    // Constraint from (A): 2L + 5W = 1800  ->  L = (1800 - 5W)/2
    const L = (TOTAL_FENCE - 5 * W) / 2;

    // Area from (B): A(W) = L*W = W*(1800 - 5W)/2 = 900W - (5/2)W^2
    const area = L * W;

    // (C) Max area occurs at vertex of A(W) = aW^2 + bW + c, where a = -5/2, b = 900
    const a = -5 / 2;
    const b = 900;
    const W_vertex = -b / (2 * a); // = 180
    const L_vertex = (TOTAL_FENCE - 5 * W_vertex) / 2; // = 450
    const area_max = L_vertex * W_vertex; // = 81000

    // Domain: need L>0 and W>0
    // L>0 => 1800 - 5W > 0 => W < 360
    const domainOk = W > 0 && W < 360;

    return {
      L,
      area,
      a,
      b,
      W_vertex,
      L_vertex,
      area_max,
      domainOk,
    };
  }, [W]);

  return (
    <div style={{ fontFamily: "system-ui, Arial", padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 8 }}>Problem 4 (A–C) — Fence & Area Optimization</h1>
      <p style={{ marginTop: 0, color: "#444" }}>
        Uses <b>1800 ft</b> of <b>new</b> fencing. Bottom side is an <b>existing fence</b>.
        Inside is divided into <b>8 pens</b> (2×4): 3 vertical dividers and 1 horizontal divider.
      </p>

      <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 12, marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>Part (A) — Constraint Equation</h2>
        <ul style={{ lineHeight: 1.6 }}>
          <li>Top outer side: <b>L</b></li>
          <li>Two outer sides: <b>2W</b></li>
          <li>3 interior vertical dividers: <b>3W</b></li>
          <li>1 interior horizontal divider: <b>L</b></li>
        </ul>
        <p style={{ fontSize: 18 }}>
          Total fencing: <b>2L + 5W = 1800</b>
        </p>
      </div>

      <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 12, marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>Part (B) — Area as a Function of Width</h2>
        <p style={{ fontSize: 16 }}>
          From <b>2L + 5W = 1800</b>, solve for <b>L</b>:
        </p>
        <p style={{ fontSize: 18 }}>
          <b>L(W) = (1800 − 5W) / 2</b>
        </p>
        <p style={{ fontSize: 16 }}>
          Area: <b>A = L·W</b> ⇒
        </p>
        <p style={{ fontSize: 18 }}>
          <b>A(W) = W(1800 − 5W)/2 = 900W − (5/2)W²</b>
        </p>

        <div style={{ marginTop: 12, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <label style={{ fontWeight: 600 }}>
            Try a width W (feet):{" "}
            <input
              type="number"
              value={W}
              step={1}
              min={0}
              max={359.999}
              onChange={(e) => setW(Number(e.target.value))}
              style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc", width: 120 }}
            />
          </label>
          <span style={{ color: computed.domainOk ? "#1a7f37" : "#b42318", fontWeight: 600 }}>
            {computed.domainOk ? "Domain OK (0 < W < 360)" : "Outside valid domain (need 0 < W < 360)"}
          </span>
        </div>

        <div style={{ marginTop: 12, lineHeight: 1.8 }}>
          <div>
            Computed <b>L</b> = <b>{round2(computed.L)}</b> feet
          </div>
          <div>
            Computed <b>Area</b> = <b>{round2(computed.area)}</b> square feet
          </div>
        </div>
      </div>

      <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 12, marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>Part (C) — Largest Possible Area (Algebraically)</h2>
        <p>
          Since <b>A(W) = 900W − (5/2)W²</b> is a downward-opening quadratic, the maximum occurs at the vertex:
        </p>
        <p style={{ fontSize: 18 }}>
          Vertex width:{" "}
          <b>
            W = -b/(2a) = -900 / (2·(-5/2)) = 180
          </b>{" "}
          feet
        </p>
        <p style={{ fontSize: 18 }}>
          Then{" "}
          <b>
            L = (1800 − 5·180)/2 = 450
          </b>{" "}
          feet
        </p>
        <p style={{ fontSize: 18 }}>
          Maximum area:{" "}
          <b>
            A = 450·180 = 81,000
          </b>{" "}
          square feet
        </p>

        <div style={{ marginTop: 8, color: "#444" }}>
          <b>Final Answer:</b> The largest possible area is <b>81,000 ft²</b>, achieved when{" "}
          <b>W = 180 ft</b> (and <b>L = 450 ft</b>).
        </div>
      </div>
    </div>
  );
}
