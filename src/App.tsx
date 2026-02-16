import React from 'react';

export default function FinalGardenGraph() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const padding = 85;
    const graphWidth = canvas.width - 2 * padding;
    const graphHeight = canvas.height - 2 * padding;
    
    // Window: Width 0-200ft, Area 0-100,000 sq ft
    const xMin = 0, xMax = 200;
    const yMin = 0, yMax = 100000;
    
    const toX = (w: number) => padding + (w - xMin) / (xMax - xMin) * graphWidth;
    const toY = (a: number) => canvas.height - padding - (a - yMin) / (yMax - yMin) * graphHeight;
    
    // THE MATH: A(W) = W(1800 - 9W)
    const Area = (w: number) => -9 * Math.pow(w, 2) + 1800 * w;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. Draw Grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.font = '12px Arial';
    ctx.fillStyle = '#6b7280';
    for (let i = 0; i <= 200; i += 25) {
      ctx.beginPath(); ctx.moveTo(toX(i), padding); ctx.lineTo(toX(i), canvas.height - padding); ctx.stroke();
      ctx.fillText(i.toString(), toX(i) - 10, canvas.height - padding + 20);
    }
    for (let i = 0; i <= 100000; i += 20000) {
      ctx.beginPath(); ctx.moveTo(padding, toY(i)); ctx.lineTo(canvas.width - padding, toY(i)); ctx.stroke();
      ctx.fillText(i.toLocaleString(), padding - 65, toY(i) + 5);
    }
    
    // 2. Draw Curve (Blue)
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let w = 0; w <= 200; w++) {
      w === 0 ? ctx.moveTo(toX(w), toY(Area(w))) : ctx.lineTo(toX(w), toY(Area(w)));
    }
    ctx.stroke();

    // 3. Max Point (100, 90000)
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#dc2626';
    ctx.beginPath(); ctx.moveTo(toX(100), toY(90000)); ctx.lineTo(toX(100), canvas.height - padding); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(toX(100), toY(90000)); ctx.lineTo(padding, toY(90000)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#dc2626';
    ctx.beginPath(); ctx.arc(toX(100), toY(90000), 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillText("Max Point: (100, 90,000)", toX(100) - 70, toY(90000) - 20);

    // 4. Labels
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("Width W (feet)", canvas.width / 2, canvas.height - 25);
    ctx.save();
    ctx.translate(20, canvas.height / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText("Area A (sq feet)", 0, 0); ctx.restore();
  }, []);
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f9fafb', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#1d4ed8', marginBottom: '20px' }}>Problem 4: Garden Area Optimization</h2>
        <canvas ref={canvasRef} width={800} height={550} />
        <div style={{ marginTop: '20px', borderTop: '2px solid #e5e7eb', paddingTop: '15px' }}>
          <p><strong>(a) Constraint:</strong> L + 9W = 1800</p>
          <p><strong>(b) Area Function:</strong> A(W) = W(1800 - 9W)</p>
          <p><strong>(c) Largest Area:</strong> 90,000 sq ft at W = 100 ft</p>
        </div>
      </div>
    </div>
  );
}