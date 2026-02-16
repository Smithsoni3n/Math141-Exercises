import React from 'react';

export default function GardenAreaGraph() {
  const canvasRef = React.useRef(null);
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const padding = 85;
    const graphWidth = canvas.width - 2 * padding;
    const graphHeight = canvas.height - 2 * padding;
    
    // Window: Width (W) 0-200 feet, Area (A) 0-100,000 sq ft
    const xMin = 0, xMax = 200;
    const yMin = 0, yMax = 100000;
    
    const toCanvasX = (w) => padding + (w - xMin) / (xMax - xMin) * graphWidth;
    const toCanvasY = (a) => canvas.height - padding - (a - yMin) / (yMax - yMin) * graphHeight;
    
    // THE AREA FUNCTION FROM PART (B): A(W) = W(1800 - 9W)
    const Area = (w) => -9 * Math.pow(w, 2) + 1800 * w;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. Draw Detailed Grid & Ticks
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.font = '12px Arial';
    ctx.fillStyle = '#6b7280';
    for (let i = 0; i <= 200; i += 25) {
      const x = toCanvasX(i);
      ctx.beginPath(); ctx.moveTo(x, padding); ctx.lineTo(x, canvas.height - padding); ctx.stroke();
      ctx.fillText(i.toString(), x - 10, canvas.height - padding + 20);
    }
    for (let i = 0; i <= 100000; i += 20000) {
      const y = toCanvasY(i);
      ctx.beginPath(); ctx.moveTo(padding, y); ctx.lineTo(canvas.width - padding, y); ctx.stroke();
      ctx.fillText(`${i.toLocaleString()}`, padding - 65, y + 5);
    }
    
    // 2. Draw Main Axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding - 10); ctx.lineTo(padding, canvas.height - padding); 
    ctx.lineTo(canvas.width - padding + 10, canvas.height - padding);
    ctx.stroke();

    // 3. Draw Area Curve (Parabola)
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 4;
    ctx.beginPath();
    let first = true;
    for (let w = 0; w <= 200; w += 1) {
      const x = toCanvasX(w);
      const y = toCanvasY(Area(w));
      if (first) { ctx.moveTo(x, y); first = false; }
      else { ctx.lineTo(x, y); }
    }
    ctx.stroke();

    // 4. Vertex / Maximum Point (Part C)
    const wMax = 100, aMax = 90000;
    const maxX = toCanvasX(wMax), maxY = toCanvasY(aMax);
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#dc2626';
    ctx.beginPath(); ctx.moveTo(maxX, maxY); ctx.lineTo(maxX, canvas.height - padding); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(maxX, maxY); ctx.lineTo(padding, maxY); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#dc2626';
    ctx.beginPath(); ctx.arc(maxX, maxY, 7, 0, 2 * Math.PI); ctx.fill();
    ctx.font = 'bold 15px Arial';
    ctx.fillText(`Max Point: (100, 90,000)`, maxX - 70, maxY - 20);

    // 5. Labels and Units
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("Width W (feet)", canvas.width / 2, canvas.height - 25);
    ctx.save();
    ctx.translate(20, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Area A (sq feet)", 0, 0);
    ctx.restore();
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
        <div className="text-center text-2xl font-bold mb-6 text-blue-700">Problem 4: Garden Area Optimization</div>
        <canvas ref={canvasRef} width={800} height={550} className="mx-auto" />
        <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-500 rounded-lg">
          <h3 className="text-xl font-bold text-blue-800 mb-4">✓ ANSWERS FOR PROBLEM 4:</h3>
          <p className="text-lg"><strong>(a) Constraint:</strong> L + 9W = 1800</p>
          <p className="text-lg"><strong>(b) Area Function:</strong> A(W) = W(1800 - 9W)</p>
          <p className="text-lg"><strong>(c) Maximum Area:</strong> 90,000 sq ft at W = 100 ft</p>
        </div>
      </div>
    </div>
  );
}