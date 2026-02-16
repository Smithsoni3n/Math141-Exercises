import React from 'react';

export default function DetailedBurnPitGraph() {
  const canvasRef = React.useRef(null);
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const padding = 80;
    const graphWidth = canvas.width - 2 * padding;
    const graphHeight = canvas.height - 2 * padding;
    
    // Window Settings: Width 0-7, Cost 0-800
    const xMin = 0, xMax = 7;
    const yMin = 0, yMax = 800;
    
    const toCanvasX = (w) => padding + (w - xMin) / (xMax - xMin) * graphWidth;
    const toCanvasY = (c) => canvas.height - padding - (c - yMin) / (yMax - yMin) * graphHeight;
    
    const C = (w) => 12 * Math.pow(w, 2) + (900 / w);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. Draw Grid and Numerical Ticks
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.font = '12px Arial';
    ctx.fillStyle = '#6b7280';

    // Width ticks (0 to 7)
    for (let i = 0; i <= 7; i++) {
      const x = toCanvasX(i);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, canvas.height - padding);
      ctx.stroke();
      ctx.fillText(i.toString(), x - 5, canvas.height - padding + 20);
    }

    // Cost ticks (0 to 800)
    for (let i = 0; i <= 800; i += 100) {
      const y = toCanvasY(i);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
      ctx.fillText(`$${i}`, padding - 45, y + 5);
    }
    
    // 2. Draw Main Axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding); // Y
    ctx.lineTo(canvas.width - padding, canvas.height - padding); // X
    ctx.stroke();

    // 3. Draw Cost Curve
    ctx.strokeStyle = '#16a34a';
    ctx.lineWidth = 4;
    ctx.beginPath();
    let first = true;
    for (let w = 0.5; w <= 7; w += 0.05) {
      const x = toCanvasX(w);
      const y = toCanvasY(C(w));
      if (first) { ctx.moveTo(x, y); first = false; }
      else { ctx.lineTo(x, y); }
    }
    ctx.stroke();

    // 4. Accurate Min Point Labeling
    const wMin = 3.35;
    const cMin = 403.31;
    const minX = toCanvasX(wMin);
    const minY = toCanvasY(cMin);

    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#dc2626';
    ctx.beginPath(); ctx.moveTo(minX, minY); ctx.lineTo(minX, canvas.height - padding); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(minX, minY); ctx.lineTo(padding, minY); ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#dc2626';
    ctx.beginPath(); ctx.arc(minX, minY, 6, 0, 2 * Math.PI); ctx.fill();
    ctx.font = 'bold 14px Arial';
    ctx.fillText(`Min: (3.35, $403.31)`, minX + 10, minY - 10);

    // 5. Main Labels
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("Width W (feet)", canvas.width / 2, canvas.height - 20);
    
    ctx.save();
    ctx.translate(20, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Cost C (dollars)", 0, 0);
    ctx.restore();

  }, []);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h2 style={{ color: '#16a34a' }}>Problem 3: Detailed Cost Analysis</h2>
      <canvas ref={canvasRef} width={700} height={500} style={{ border: '1px solid #ddd', borderRadius: '8px' }} />
    </div>
  );
}