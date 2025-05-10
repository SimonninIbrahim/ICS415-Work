
const canvas = document.getElementById('bezierCanvas');
const ctx = canvas.getContext('2d');

// Each segment has an anchor point and a control point
let segments = [
  { anchor: { x: 100, y: 500 }, control: { x: 200, y: 300 } },
  { anchor: { x: 500, y: 500 }, control: { x: 400, y: 300 } }
];

let dragging = { type: null, segmentIndex: -1 };

canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  const newAnchor = { x: e.offsetX, y: e.offsetY };
  const newControl = { x: e.offsetX - 50, y: e.offsetY - 50 };
  segments.push({ anchor: newAnchor, control: newControl });
  draw();
});

canvas.addEventListener('mousedown', (e) => {
  const { offsetX, offsetY } = e;
  for (let i = 0; i < segments.length; i++) {
    const { anchor, control } = segments[i];
    if (Math.hypot(anchor.x - offsetX, anchor.y - offsetY) < 10) {
      dragging = { type: 'anchor', segmentIndex: i };
      return;
    }
    if (Math.hypot(control.x - offsetX, control.y - offsetY) < 10) {
      dragging = { type: 'control', segmentIndex: i };
      return;
    }
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (dragging.type !== null) {
    const point = segments[dragging.segmentIndex][dragging.type];
    point.x = e.offsetX;
    point.y = e.offsetY;
    draw();
  }
});

canvas.addEventListener('mouseup', () => {
  dragging = { type: null, segmentIndex: -1 };
});

function drawBezierSegments() {
  if (segments.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(segments[0].anchor.x, segments[0].anchor.y);
  for (let i = 1; i < segments.length; i++) {
    const prev = segments[i - 1];
    const curr = segments[i];
    ctx.quadraticCurveTo(prev.control.x, prev.control.y, curr.anchor.x, curr.anchor.y);
  }
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw control lines
  for (let i = 1; i < segments.length; i++) {
    const prev = segments[i - 1];
    ctx.beginPath();
    ctx.moveTo(prev.anchor.x, prev.anchor.y);
    ctx.lineTo(prev.control.x, prev.control.y);
    ctx.lineTo(segments[i].anchor.x, segments[i].anchor.y);
    ctx.strokeStyle = "#aaa";
    ctx.stroke();
  }

  // Draw curve
  drawBezierSegments();

  // Draw anchor and control points
  for (let i = 0; i < segments.length; i++) {
    const { anchor, control } = segments[i];

    // Anchor: red
    ctx.beginPath();
    ctx.arc(anchor.x, anchor.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    // Control: green
    ctx.beginPath();
    ctx.arc(control.x, control.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
  }
}

draw();
