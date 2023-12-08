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
const gravity = 0.7;
// Class creates characters that can run, jump, and slash
class Sprite{
  constructor({position, velocity}){
    this.position = position;
    this.velocity = velocity;
    this.height = 100;
    this.lastkey;
  }

  draw() {
    c.fillStyle = "violet";
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }
  
  //updates our sprite; redraws them; applies gravity; allows left/right movement
  update() {
    this.draw();

    this.position.x += this.velocity.x;
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
  x: 0,
  y: 0
  }
});

// Properties for sprites
// animation loop for our sprites that updates the frame

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}


function animate(){
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0,0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  //player movement update
  player.velocity.x = 0;
  if (keys.a.pressed && player.lastkey == 'a') {
    player.velocity.x = -5;
  }
  else if (keys.d.pressed && player.lastkey == 'd') {
    player.velocity.x = 5;
  }

  //enemy movement update
  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastkey == 'ArrowLeft') {
    enemy.velocity.x = -5;
  }
  else if (keys.ArrowRight.pressed && enemy.lastkey == 'ArrowRight') {
    enemy.velocity.x = 5;
  }  
}

//main
animate();
console.log(player);

// Character Movement
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    //movement for player
    case 'd':
    keys.d.pressed = true;
    player.lastkey = 'd';
    break
    case 'a':
    keys.a.pressed = true;
    player.lastkey = 'a';
    break
    case 'w':
    player.velocity.y = -17;
    break

    //movement for enemy
    case 'ArrowRight':
    keys.ArrowRight.pressed = true;
    enemy.lastkey = 'ArrowRight';
    break
    case 'ArrowLeft':
    keys.ArrowLeft.pressed = true;
    enemy.lastkey = 'ArrowLeft';
    break
    case 'ArrowUp':
    enemy.velocity.y = -17;
    break
  }
  console.log(event.key);
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    //player movement
    case 'd':
    keys.d.pressed = false;
    case 'a':
    keys.a.pressed = false;
    break

    //enemy movement
    case 'ArrowRight':
    keys.ArrowRight.pressed = false;
    case 'ArrowLeft':
    keys.ArrowLeft.pressed = false;
    break
  }
  console.log(event.key);
});

