var font;

var particles = [];
var mousePos;
var started = false;
var time = 0;

var string = "Thanos";

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100, 100, 200);
  loadPoints();
}

function loadPoints() {
   var points = font.textToPoints(string, 100, windowHeight/2, 192, {
    sampleFactor: 0.3
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var p = new Particle(pt.x, pt.y);
    particles.push(p);
  }
  print(points.length);
}

function mousePressed() {
  if(!started) {
    mousePos = createVector(mouseX, mouseY);
    started = true;
    time = 0;
  }
}

function wind(pos) {
  //return createVector( 2*Math.sin(time/100),  -10 + 2*Math.cos(time/100));
  //return createVector( 3*Math.sin(time/10 + pos.x/10),  -5 + 3*Math.cos(time/10 + pos.y/10));
  return createVector( 6 + 1*Math.sin(pos.y/10),  -4 + 1*Math.cos(pos.x/10));
  //return createVector( 6 + 2*Math.sin(pos.y/10),  -(500 - pos.y)/50 + 2*Math.cos(pos.x/10));
  //return createVector( 3*Math.sin(time/10),  -5 + 3*Math.cos(time/10));
}

function touch() {
  time++;
  //touchRadius = Math.exp(time/100);
  touchRadius = 2*time;

  for(let p of particles) {
    if(!p.flying){
      dis = mousePos.copy();
      dis.sub(p.pos);
      if(dis.mag() < touchRadius)
        p.flying = true;
        p.vel = p5.Vector.random2D();
        p.vel.mult(1/3);
    }
  }
}

function draw() {
  background(51);

  if(started) {
    touch();
    stroke(100);
    strokeWeight(2*touchRadius);
    //point(this.mousePos.x, this.mousePos.y);
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    if(particles[i].pos.x < windowWidth) {
      particles[i].update();
      particles[i].show();
    }
    else {
      particles.splice(i, 1);
    }
  }
}

function keyTyped() {
  for (let i = particles.length - 1; i >= 0; i--) {
    if(!particles[i].flying) {
      particles.splice(i, 1);
    }
  }

  if(started) {
    string = "";
  }
  
  started = false;
  string += key;

  loadPoints();
}

function keyPressed() {
  if(!started){
    if(keyCode === BACKSPACE) {
      for (let i = particles.length - 1; i >= 0; i--) {
        if(!particles[i].flying) {
          particles.splice(i, 1);
        }
      }
      string = string.slice(0, -1);
      loadPoints();
    }
    //return false; // prevent any default behaviour
  }
}
  
  
