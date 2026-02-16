<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Problem 4 - Handwritten Solution</title>
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Kalam:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: #f5f5dc;
            font-family: 'Kalam', cursive;
            padding: 40px 20px;
            min-height: 100vh;
        }

        .notebook {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            position: relative;
        }

        .paper {
            background: 
                linear-gradient(90deg, transparent 0, transparent 39px, #e8e8e8 40px, transparent 41px),
                linear-gradient(#f5f5f5 1px, transparent 1px);
            background-size: 100% 30px;
            padding: 60px 50px 60px 80px;
            position: relative;
        }

        .red-line {
            position: absolute;
            left: 70px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #ff6b6b;
        }

        .header {
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #333;
        }

        h1 {
            font-family: 'Caveat', cursive;
            font-size: 3em;
            color: #2c3e50;
            margin-bottom: 10px;
            font-weight: 700;
        }

        .date {
            font-size: 1.2em;
            color: #555;
            font-style: italic;
        }

        .problem-title {
            font-size: 2em;
            color: #2c3e50;
            margin: 30px 0 20px 0;
            text-decoration: underline;
            font-weight: 700;
        }

        .solution {
            margin: 30px 0;
            line-height: 2.2;
            font-size: 1.3em;
            color: #1a1a1a;
        }

        .part {
            margin: 40px 0;
            padding: 20px;
            background: rgba(255, 248, 220, 0.3);
            border-left: 4px solid #3498db;
        }

        .part-label {
            font-size: 1.5em;
            color: #e74c3c;
            font-weight: 700;
            margin-bottom: 15px;
        }

        .diagram {
            text-align: center;
            margin: 30px 0;
            padding: 20px;
        }

        .equation {
            font-size: 1.4em;
            margin: 15px 0;
            padding: 10px 20px;
            background: rgba(52, 152, 219, 0.1);
            border-left: 3px solid #3498db;
            display: inline-block;
            font-weight: 400;
        }

        .box {
            border: 2px solid #2c3e50;
            padding: 15px;
            margin: 20px 0;
            display: inline-block;
            background: rgba(255, 255, 255, 0.8);
        }

        .arrow {
            font-size: 1.5em;
            color: #e74c3c;
            margin: 10px 0;
        }

        .underline {
            border-bottom: 2px solid #2c3e50;
            display: inline;
            font-weight: 700;
        }

        .highlight {
            background: rgba(255, 235, 59, 0.4);
            padding: 2px 8px;
            border-radius: 3px;
        }

        .work {
            margin: 10px 0 10px 40px;
            font-size: 1.2em;
        }

        .note {
            font-size: 1.1em;
            color: #7f8c8d;
            font-style: italic;
            margin: 10px 0;
            padding-left: 20px;
            border-left: 3px solid #95a5a6;
        }

        .check {
            color: #27ae60;
            font-size: 1.5em;
            font-weight: 700;
        }

        canvas {
            border: 2px dashed #7f8c8d;
            margin: 20px 0;
            background: rgba(255, 255, 255, 0.9);
        }

        .final-answer {
            border: 4px double #e74c3c;
            padding: 20px;
            margin: 30px 0;
            background: rgba(255, 235, 59, 0.2);
            text-align: center;
        }

        .final-answer .label {
            font-size: 1.3em;
            color: #c0392b;
            font-weight: 700;
        }

        .final-answer .answer {
            font-size: 2em;
            color: #2c3e50;
            font-weight: 700;
            margin: 10px 0;
        }

        .scribble {
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="notebook">
        <div class="red-line"></div>
        <div class="paper">
            <div class="header">
                <h1>Math Problem Set</h1>
                <div class="date">February 16, 2026</div>
            </div>

            <div class="problem-title">Problem 4: Rectangular Fence</div>

            <div class="solution">
                <p><strong>Given:</strong></p>
                <div class="work">
                    • Total fencing = 1800 feet<br>
                    • One side has existing fence (bottom)<br>
                    • Need to create 8 pens (7 internal dividers)
                </div>

                <div class="diagram">
                    <canvas id="sketchCanvas" width="600" height="250"></canvas>
                </div>

                <!-- Part A -->
                <div class="part">
                    <div class="part-label">(a) Find the constraint equation</div>
                    
                    <p><span class="underline">What we need to fence:</span></p>
                    <div class="work">
                        • Top side = L<br>
                        • Left side = W<br>
                        • Right side = W<br>
                        • 7 internal dividers = 7W<br>
                    </div>

                    <div class="scribble">
                        <div class="arrow">↓</div>
                        Total fencing needed:
                    </div>

                    <div class="work">
                        L + W + W + 7W = 1800
                    </div>

                    <div class="work">
                        L + 2W + 7W = 1800
                    </div>

                    <div class="final-answer">
                        <div class="label">Constraint Equation:</div>
                        <div class="answer">L + 9W = 1800</div>
                    </div>
                </div>

                <!-- Part B -->
                <div class="part">
                    <div class="part-label">(b) Find area as a function of width</div>

                    <p><span class="underline">Step 1:</span> Solve constraint for L</p>
                    <div class="work">
                        L + 9W = 1800<br>
                        L = 1800 - 9W
                    </div>

                    <p><span class="underline">Step 2:</span> Area formula</p>
                    <div class="work">
                        Area = L × W
                    </div>

                    <p><span class="underline">Step 3:</span> Substitute L = 1800 - 9W</p>
                    <div class="work">
                        A(W) = (1800 - 9W) × W
                    </div>

                    <div class="work">
                        A(W) = 1800W - 9W²
                    </div>

                    <div class="final-answer">
                        <div class="label">Area Function:</div>
                        <div class="answer">A(W) = 1800W - 9W²</div>
                        <div class="note">(This is a parabola opening downward)</div>
                    </div>
                </div>

                <!-- Part C -->
                <div class="part">
                    <div class="part-label">(c) Find the maximum area algebraically</div>

                    <p><span class="underline">Method:</span> Use calculus (or vertex formula)</p>

                    <p><strong>Using Calculus:</strong></p>
                    
                    <div class="work">
                        <span class="underline">Step 1:</span> Take derivative<br><br>
                        A(W) = 1800W - 9W²<br>
                        A'(W) = 1800 - 18W
                    </div>

                    <div class="work">
                        <span class="underline">Step 2:</span> Set derivative = 0<br><br>
                        1800 - 18W = 0<br>
                        18W = 1800<br>
                        W = 1800 ÷ 18<br>
                        <span class="highlight">W = 100 feet</span> <span class="check">✓</span>
                    </div>

                    <div class="work">
                        <span class="underline">Step 3:</span> Find L<br><br>
                        L = 1800 - 9W<br>
                        L = 1800 - 9(100)<br>
                        L = 1800 - 900<br>
                        <span class="highlight">L = 900 feet</span> <span class="check">✓</span>
                    </div>

                    <div class="work">
                        <span class="underline">Step 4:</span> Calculate maximum area<br><br>
                        A = L × W<br>
                        A = 900 × 100<br>
                        <span class="highlight">A = 90,000 sq ft</span> <span class="check">✓</span>
                    </div>

                    <div class="note">
                        Verification: Second derivative test<br>
                        A''(W) = -18 < 0, so this is indeed a maximum!
                    </div>

                    <div class="final-answer">
                        <div class="label">Maximum Area:</div>
                        <div class="answer">90,000 square feet</div>
                        <div style="margin-top: 15px; font-size: 1.2em;">
                            when W = 100 ft and L = 900 ft
                        </div>
                    </div>

                    <div class="diagram">
                        <p style="font-size: 1.2em; margin-bottom: 15px;"><strong>Graph of A(W):</strong></p>
                        <canvas id="graphCanvas" width="600" height="300"></canvas>
                    </div>
                </div>

                <div style="margin-top: 50px; text-align: right; font-size: 1.5em; color: #27ae60;">
                    ✓ Complete!
                </div>
            </div>
        </div>
    </div>

    <script>
        // Draw the sketch diagram
        const sketchCanvas = document.getElementById('sketchCanvas');
        const ctx = sketchCanvas.getContext('2d');

        // Set handdrawn style
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw rectangle with slight wobble for hand-drawn effect
        function drawWobblyLine(x1, y1, x2, y2, thickness = 3) {
            ctx.lineWidth = thickness;
            ctx.strokeStyle = '#2c3e50';
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            
            const segments = 20;
            for (let i = 1; i <= segments; i++) {
                const t = i / segments;
                const x = x1 + (x2 - x1) * t + (Math.random() - 0.5) * 2;
                const y = y1 + (y2 - y1) * t + (Math.random() - 0.5) * 2;
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        // Draw the fence outline
        const rectX = 50;
        const rectY = 50;
        const rectW = 500;
        const rectH = 120;

        // Top (new fence)
        drawWobblyLine(rectX, rectY, rectX + rectW, rectY, 3);
        
        // Left (new fence)
        drawWobblyLine(rectX, rectY, rectX, rectY + rectH, 3);
        
        // Right (new fence)
        drawWobblyLine(rectX + rectW, rectY, rectX + rectW, rectY + rectH, 3);
        
        // Bottom (existing fence - different style)
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 5;
        ctx.setLineDash([10, 5]);
        ctx.beginPath();
        ctx.moveTo(rectX, rectY + rectH);
        ctx.lineTo(rectX + rectW, rectY + rectH);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw 7 internal dividers
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        const dividerSpacing = rectW / 8;
        for (let i = 1; i < 8; i++) {
            drawWobblyLine(
                rectX + i * dividerSpacing, rectY,
                rectX + i * dividerSpacing, rectY + rectH,
                2
            );
        }

        // Add labels
        ctx.font = 'bold 24px Kalam';
        ctx.fillStyle = '#2c3e50';
        ctx.textAlign = 'center';
        
        // Length label
        ctx.fillText('L', rectX + rectW / 2, rectY - 15);
        
        // Width label
        ctx.save();
        ctx.translate(rectX + rectW + 30, rectY + rectH / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('W', 0, 0);
        ctx.restore();

        // Existing fence label
        ctx.fillStyle = '#e74c3c';
        ctx.font = 'bold 18px Kalam';
        ctx.fillText('EXISTING FENCE', rectX + rectW / 2, rectY + rectH + 30);

        // Draw arrow annotations
        ctx.strokeStyle = '#7f8c8d';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 3]);
        
        // Arrow for dividers
        ctx.beginPath();
        ctx.moveTo(rectX + dividerSpacing, rectY - 20);
        ctx.lineTo(rectX + dividerSpacing, rectY - 40);
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.fillStyle = '#7f8c8d';
        ctx.font = '16px Kalam';
        ctx.textAlign = 'left';
        ctx.fillText('7 dividers', rectX + dividerSpacing + 5, rectY - 35);

        // Draw the graph
        const graphCanvas = document.getElementById('graphCanvas');
        const gCtx = graphCanvas.getContext('2d');

        // Graph setup
        const padding = 50;
        const graphWidth = graphCanvas.width - 2 * padding;
        const graphHeight = graphCanvas.height - 2 * padding;

        // Draw axes with hand-drawn style
        gCtx.strokeStyle = '#2c3e50';
        gCtx.lineWidth = 3;
        gCtx.beginPath();
        gCtx.moveTo(padding, padding);
        gCtx.lineTo(padding, padding + graphHeight);
        gCtx.lineTo(padding + graphWidth, padding + graphHeight);
        gCtx.stroke();

        // Draw the parabola
        gCtx.strokeStyle = '#3498db';
        gCtx.lineWidth = 3;
        gCtx.beginPath();

        const maxW = 200;
        const maxArea = 100000;

        for (let w = 0; w <= maxW; w += 0.5) {
            const area = 1800 * w - 9 * w * w;
            if (area < 0) continue;
            
            const x = padding + (w / maxW) * graphWidth;
            const y = padding + graphHeight - (area / maxArea) * graphHeight;
            
            if (w === 0) {
                gCtx.moveTo(x, y);
            } else {
                gCtx.lineTo(x, y);
            }
        }
        gCtx.stroke();

        // Mark the maximum point
        const maxX = padding + (100 / maxW) * graphWidth;
        const maxY = padding + graphHeight - (90000 / maxArea) * graphHeight;

        gCtx.fillStyle = '#e74c3c';
        gCtx.beginPath();
        gCtx.arc(maxX, maxY, 8, 0, 2 * Math.PI);
        gCtx.fill();

        // Draw dashed lines to axes
        gCtx.strokeStyle = '#95a5a6';
        gCtx.lineWidth = 1;
        gCtx.setLineDash([5, 3]);
        
        gCtx.beginPath();
        gCtx.moveTo(maxX, maxY);
        gCtx.lineTo(maxX, padding + graphHeight);
        gCtx.stroke();
        
        gCtx.beginPath();
        gCtx.moveTo(maxX, maxY);
        gCtx.lineTo(padding, maxY);
        gCtx.stroke();
        
        gCtx.setLineDash([]);

        // Labels
        gCtx.fillStyle = '#2c3e50';
        gCtx.font = 'bold 18px Kalam';
        gCtx.textAlign = 'center';
        
        gCtx.fillText('W (feet)', padding + graphWidth / 2, graphCanvas.height - 15);
        
        gCtx.save();
        gCtx.translate(15, padding + graphHeight / 2);
        gCtx.rotate(-Math.PI / 2);
        gCtx.fillText('Area (sq ft)', 0, 0);
        gCtx.restore();

        // Axis markings
        gCtx.font = '14px Kalam';
        gCtx.fillText('100', maxX, padding + graphHeight + 20);
        gCtx.fillText('200', padding + graphWidth, padding + graphHeight + 20);
        
        gCtx.textAlign = 'right';
        gCtx.fillText('90,000', padding - 5, maxY + 5);

        // Maximum point label
        gCtx.fillStyle = '#e74c3c';
        gCtx.font = 'bold 16px Kalam';
        gCtx.textAlign = 'left';
        gCtx.fillText('Max: (100, 90000)', maxX + 15, maxY - 10);
    </script>
</body>
</html>