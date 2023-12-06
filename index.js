// Javascript file for fighting game
// =================================
// Inital setup:

// setting up our canvas and context consts
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);


// Characters:
const gravity = 0.2;
// Class creates characters that can run, jump, and slash
class Sprite{
  constructor({position, velocity}){
    this.position = position;
    this.velocity = velocity;
    this.height = 100;
  }

  draw() {
    c.fillStyle = "violet";
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }
  
  //updates our sprite; redraws them; applies gravity
  update() {
    this.draw();

    //implementation of gravity to the character
    this.position.y += this.velocity.y;

    if(this.position.y + this.height + this.velocity.y >= canvas.height){
      this.velocity.y = 0;
    }
    else{
    this.velocity.y += gravity;
    }
  }
}

// instantiate the player sprite
const player = new Sprite({
  position: {
  x: 0,
  y: 0
  },
  velocity: {
  x: 0,
  y: 0
  }
});
// instantiate the enemy sprite
const enemy = new Sprite({
  position: {
  x: 974,
  y: 0
  },
  velocity: {
  x: 974,
  y: 0
  }
});

// Properties for sprites
// animation loop for our sprites that updates the frame
function animate(){
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0,0, canvas.width, canvas.height);
  player.update();
  enemy.update();
}

//main
animate();
console.log(player);