import React from "react";

const TOTAL_FENCE = 1800;

// (a) Constraint: 2L + 5W = 1800
function L_from_W(W: number) {
  return (TOTAL_FENCE - 5 * W) / 2;
}

// (b) Area function: A(W) = L(W)*W
function A_from_W(W: number) {
  return L_from_W(W) * W;
}

// Fence check (should equal 1800)
function fenceUsed(L: number, W: number) {
  return 2 * L + 5 * W;
}

export default function App() {
  // (c) Max area occurs at vertex of A(W) = -2.5W^2 + 900W
  const a = -2.5;
  const b = 900;

  const W = -b / (2 * a); // = 180
  const L = L_from_W(W);  // = 450
  const A = A_from_W(W);  // = 81000
  const check = fenceUsed(L, W); // = 1800

  const domainNote = "Domain: 0 < W < 360 (so L(W) stays positive)";

  return (
    <div style={{ fontFamily: "system-ui", padding: 18, lineHeight: 1.5 }}>
      <h1>Problem 4 (A–C) — Exact Solution</h1>

      <h2>(a) Constraint</h2>
      <p>
        New fencing = top L + horizontal divider L + sides 2W + 3 vertical dividers 3W
      </p>
      <p>
        <b>2L + 5W = 1800</b>
      </p>

      <h2>(b) Area as a function of W</h2>
      <p>
        L(W) = (1800 − 5W)/2
      </p>
      <p>
        <b>A(W) = W · (1800 − 5W)/2 = 900W − 2.5W²</b>
      </p>
      <p>{domainNote}</p>

      <h2>(c) Maximum Area</h2>
      <p>
        A(W) = -2.5W² + 900W → vertex at W = -b/(2a)
      </p>
      <ul>
        <li><b>W = {W} ft</b></li>
        <li><b>L = {L} ft</b></li>
        <li><b>Max Area = {A.toLocaleString()} ft²</b></li>
        <li>Fence check: 2L + 5W = {check} ft</li>
      </ul>
    </div>
  );
}
