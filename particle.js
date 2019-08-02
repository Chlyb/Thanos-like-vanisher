class Particle {
  constructor(x, y) {
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.flying = false;
    this.lifetime = 1;
    
    this.cOff = Math.random()*20;
    this.currentColor = color(255);
  }

  update() {
    if(this.flying){
      if(this.lifetime > 25) {
        let acc = wind(this.pos);
        acc.sub(this.vel);
        acc.mult(1/200);
        this.vel.add(acc);
        this.pos.add(this.vel);
      }
      
      if (this.lifetime < 100){
        this.currentColor = color(47 + 2000/this.lifetime + this.cOff,35 + 2000/this.lifetime +this.cOff,34 + 2000/this.lifetime + this.cOff);
      }
      this.lifetime++;
    }
  }

  show() {
    stroke(this.currentColor);

    strokeWeight(5);
    /*
    if(this.lifetime > 55){
      strokeWeight( 5 * this.lifetime / 55);
    }
    else strokeWeight(5);
    */

    point(this.pos.x, this.pos.y);
  }
}