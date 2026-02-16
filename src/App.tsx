import React from 'react';

export default function BurnPitCostGraph() {
  const canvasRef = React.useRef(null);
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const padding = 80;
    const graphWidth = canvas.width - 2 * padding;
    const graphHeight = canvas.height - 2 * padding;
    
    // Window: Width between 0 and 7 feet 
    const xMin = 0, xMax = 7;
    const yMin = 0, yMax = 800;
    
    const toCanvasX = (w) => padding + (w - xMin) / (xMax - xMin) * graphWidth;
    const toCanvasY = (c) => canvas.height - padding - (c - yMin) / (yMax - yMin) * graphHeight;
    
    // Cost Function: C(W) = 12W² + 900/W [cite: 36]
    const Cost = (w) => 12 * Math.pow(w, 2) + (900 / w);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Grid Lines (Grey)
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 7; i++) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(i), padding);
      ctx.lineTo(toCanvasX(i), canvas.height - padding);
      ctx.stroke();
    }
    for (let i = 100; i <= 800; i += 100) {
      ctx.beginPath();
      ctx.moveTo(padding, toCanvasY(i));
      ctx.lineTo(canvas.width - padding, toCanvasY(i));
      ctx.stroke();
    }
    
    // Draw Main Axes (Black) 
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(padding, padding - 20);
    ctx.lineTo(padding, canvas.height - padding + 10); // Y-axis
    ctx.moveTo(padding - 10, canvas.height - padding);
    ctx.lineTo(canvas.width - padding + 20, canvas.height - padding); // X-axis
    ctx.stroke();

    // Draw Cost Curve (Green)
    ctx.strokeStyle = '#16a34a';
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

    // Minimum Point Marker (Red) 
    const wMin = 3.35;
    const cMin = 403.31;
    const minX = toCanvasX(wMin);
    const minY = toCanvasY(cMin);

    // Dashed lines to point
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(minX, minY); ctx.lineTo(minX, canvas.height - padding); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(minX, minY); ctx.lineTo(padding, minY); ctx.stroke();
    ctx.setLineDash([]);

    // Draw point
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(minX, minY, 8, 0, 2 * Math.PI);
    ctx.fill();

    // Labels and Units 
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("Width W (feet)", canvas.width / 2, canvas.height - 30);
    
    ctx.save();
    ctx.translate(25, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Cost C (dollars)", 0, 0);
    ctx.restore();

    // Min Point Label
    ctx.textAlign = 'left';
    ctx.fillText(`Minimum Cost Point`, minX + 15, minY - 25);
    ctx.fillText(`(3.35, $403.31)`, minX + 15, minY - 5);

  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
        <div className="text-center text-2xl font-mono font-bold mb-6 text-green-700">
          C(W) = 12W² + 900/W
        </div>
        
        <canvas ref={canvasRef} width={800} height={500} className="mx-auto" />
        
        <div className="mt-8 p-6 bg-green-50 border-2 border-green-500 rounded-lg">
          <h3 className="text-xl font-bold text-green-800 mb-4">✓ ANSWERS TO PART (C):</h3>
          <p className="text-lg mb-2"><strong>Minimum Cost:</strong> <span className="bg-green-200 px-2 rounded font-bold">$403.31</span> [cite: 41, 42]</p>
          <p className="text-lg"><strong>Optimal Width:</strong> <span className="bg-green-200 px-2 rounded font-bold">3.35 feet</span> [cite: 41, 42]</p>
          <p className="text-sm text-gray-600 mt-4 italic">Window: Xmin=0, Xmax=7, Ymin=0, Ymax=800 </p>
        </div>
      </div>
    </div>
  );
}