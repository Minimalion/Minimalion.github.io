var canvas = document.getElementById("project");
var c = canvas.getContext("2d");

c.lineCap = "round";

c.beginPath();
c.moveTo(400,300);
c.lineTo(1200,900);
c.strokeStyle="FF0000";
c.lineWidth=8;
c.stroke();

tick = 0.0;

function draw() { c.clearRect(0,0,canvas.width,canvas.height);
  tick += 0.05;

  c.beginPath();
  w = Math.sin(tick)*50 + 200
  c.rect(0,0,w,200);
  c.fillStyle="00ee99";
  c.fill();
  c.closePath();

}

setInterval(draw, 16);

function line(x1,y1,x2,y2) {
  c.moveTo(x1,y1);
  c.lineTo(x2,y2);
  c.stroke();
}
