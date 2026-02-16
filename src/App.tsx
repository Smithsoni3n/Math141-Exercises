import React from 'react';

export default function BurnPitCostGraph() {
  const canvasRef = React.useRef(null);
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const padding = 70;
    const graphWidth = canvas.width - 2 * padding;
    const graphHeight = canvas.height - 2 * padding;
    
    // Window: Width (x) between 0 and 7 as requested
    const xMin = 0, xMax = 7;
    const yMin = 0, yMax = 800; // Cost scale
    
    const toCanvasX = (w) => padding + (w - xMin) / (xMax - xMin) * graphWidth;
    const toCanvasY = (c) => canvas.height - padding - (c - yMin) / (yMax - yMin) * graphHeight;
    
    // THE COST FUNCTION
    const Cost = (w) => 12 * Math.pow(w, 2) + (900 / w);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw Cost Curve
    ctx.strokeStyle = '#16a34a'; // Green for money/cost
    ctx.lineWidth = 4;
    ctx.beginPath();
    let firstPoint = true;
    for (let w = 0.5; w <= 7; w += 0.05) {
      const c = Cost(w);
      const canvasX = toCanvasX(w);
      const canvasY = toCanvasY(c);
      if (firstPoint) {
        ctx.moveTo(canvasX, canvasY);
        firstPoint = false;
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }
    ctx.stroke();

    // Minimum Point Calculation
    const wMinPoint = 3.35; 
    const cMinPoint = 403.31; // Check calculation: 12(3.35^2) + 900/3.35
    const minX = toCanvasX(wMinPoint);
    const minY = toCanvasY(403.31); 

    // Draw min point
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(minX, minY, 8, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.font = 'bold 16px Arial';
    ctx.fillText(`Min Cost: $403.31 at W=3.35ft`, minX - 50, minY - 20);

    // Axis Labels
    ctx.fillStyle = '#000';
    ctx.fillText("Width (ft)", canvas.width/2, canvas.height - 30);
    ctx.save();
    ctx.translate(30, canvas.height/2);
    ctx.rotate(-Math.PI/2);
    ctx.fillText("Cost ($)", 0, 0);
    ctx.restore();

  }, []);
  
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Problem 3: Burn Pit Minimum Cost</h2>
      <canvas ref={canvasRef} width={600} height={400} style={{ border: '1px solid #ccc' }} />
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
        <p><strong>(A) Model:</strong> C(W) = 12W² + 900/W</p>
        <p><strong>(B) Graph Window:</strong> Input 0 to 7</p>
        <p><strong>(C) Minimum Cost:</strong> $403.31 (Width: 3.35 ft)</p>
      </div>
    </div>
  );
}