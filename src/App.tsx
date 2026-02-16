import React from 'react';

export default function BoxVolumeGraph() {
  const canvasRef = React.useRef(null);
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const padding = 70;
    const graphWidth = canvas.width - 2 * padding;
    const graphHeight = canvas.height - 2 * padding;
    const xMin = 0, xMax = 3.5;
    const yMin = 0, yMax = 25;
    
    const toCanvasX = (x) => padding + (x - xMin) / (xMax - xMin) * graphWidth;
    const toCanvasY = (y) => canvas.height - padding - (y - yMin) / (yMax - yMin) * graphHeight;
    const V = (x) => x * (8 - 2*x) * (6 - 2*x);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(padding, padding - 15);
    ctx.lineTo(padding, canvas.height - padding + 10);
    ctx.moveTo(padding - 10, canvas.height - padding);
    ctx.lineTo(canvas.width - padding + 15, canvas.height - padding);
    ctx.stroke();
    
    // Arrow heads
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(padding, padding - 15);
    ctx.lineTo(padding - 6, padding - 5);
    ctx.lineTo(padding + 6, padding - 5);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(canvas.width - padding + 15, canvas.height - padding);
    ctx.lineTo(canvas.width - padding + 5, canvas.height - padding - 6);
    ctx.lineTo(canvas.width - padding + 5, canvas.height - padding + 6);
    ctx.closePath();
    ctx.fill();
    
    // Grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let x = 0.5; x <= 3; x += 0.5) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x), padding);
      ctx.lineTo(toCanvasX(x), canvas.height - padding);
      ctx.stroke();
    }
    for (let y = 5; y <= 25; y += 5) {
      ctx.beginPath();
      ctx.moveTo(padding, toCanvasY(y));
      ctx.lineTo(canvas.width - padding, toCanvasY(y));
      ctx.stroke();
    }
    
    // X-axis ticks and labels
    ctx.fillStyle = '#000';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    for (let x = 0; x <= 3.5; x += 0.5) {
      const canvasX = toCanvasX(x);
      ctx.beginPath();
      ctx.moveTo(canvasX, canvas.height - padding - 6);
      ctx.lineTo(canvasX, canvas.height - padding + 6);
      ctx.stroke();
      ctx.fillText(x.toFixed(1), canvasX, canvas.height - padding + 25);
    }
    
    // Y-axis ticks and labels
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let y = 0; y <= 25; y += 5) {
      const canvasY = toCanvasY(y);
      ctx.beginPath();
      ctx.moveTo(padding - 6, canvasY);
      ctx.lineTo(padding + 6, canvasY);
      ctx.stroke();
      ctx.fillText(y.toString(), padding - 12, canvasY);
    }
    
    // Axis labels
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('Cut length x (feet)', canvas.width / 2, canvas.height - 20);
    
    ctx.save();
    ctx.translate(20, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Volume V (cubic feet)', 0, 0);
    ctx.restore();
    
    // Draw curve
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 4;
    ctx.beginPath();
    let firstPoint = true;
    for (let x = 0; x <= 3; x += 0.01) {
      const y = V(x);
      const canvasX = toCanvasX(x);
      const canvasY = toCanvasY(y);
      if (firstPoint) {
        ctx.moveTo(canvasX, canvasY);
        firstPoint = false;
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }
    ctx.stroke();
    
    // Maximum point
    const xMaxPoint = 1.13;
    const yMaxPoint = V(xMaxPoint);
    const maxX = toCanvasX(xMaxPoint);
    const maxY = toCanvasY(yMaxPoint);
    
    // Dashed lines
    ctx.setLineDash([8, 5]);
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(maxX, maxY);
    ctx.lineTo(maxX, canvas.height - padding);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(maxX, maxY);
    ctx.lineTo(padding, maxY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw max point
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(maxX, maxY, 9, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Label max point
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText('Maximum Point', maxX + 20, maxY - 40);
    ctx.fillText('(1.13, 18.96)', maxX + 20, maxY - 18);
    
    // Arrow to max
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(maxX + 18, maxY - 12);
    ctx.lineTo(maxX + 8, maxY - 4);
    ctx.stroke();
    
    // Domain label
    ctx.fillStyle = '#16a34a';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('Domain: 0 < x < 3', canvas.width / 2, padding - 20);
    
    // Endpoints
    ctx.fillStyle = '#6b7280';
    ctx.beginPath();
    ctx.arc(toCanvasX(0), toCanvasY(0), 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(toCanvasX(3), toCanvasY(0), 6, 0, 2 * Math.PI);
    ctx.fill();
    
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl">
        <div className="text-center text-3xl font-bold mb-6 text-gray-800" style={{fontFamily: 'monospace'}}>
          V(x) = x(8 - 2x)(6 - 2x)
        </div>
        
        <canvas 
          ref={canvasRef}
          width={800}
          height={600}
          className="border-4 border-gray-800 bg-white mx-auto"
        />
        
        <div className="bg-yellow-100 border-4 border-yellow-500 rounded-lg p-6 mt-6">
          <h3 className="text-xl font-bold text-yellow-800 mb-4">✓ ANSWERS TO PART (c):</h3>
          <p className="text-lg mb-3">
            <strong>Maximum Volume:</strong> <span className="bg-yellow-300 px-2 py-1 rounded font-bold text-xl">V = 18.96 ft³</span>
          </p>
          <p className="text-lg mb-3">
            <strong>Cut Length:</strong> <span className="bg-yellow-300 px-2 py-1 rounded font-bold text-xl">x = 1.13 feet</span>
          </p>
          <p className="text-sm text-gray-600 mt-4">
            Window: Xmin=0, Xmax=3.5, Ymin=0, Ymax=25<br />
            Units: x-axis in feet, y-axis in cubic feet
          </p>
        </div>
      </div>
    </div>
  );
}