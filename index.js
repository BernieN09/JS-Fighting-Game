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
  constructor({position, velocity, color, offset}){
    this.position = position;
    this.velocity = velocity;
    this.height = 100;
    this.width = 50;
    this.lastkey;
    this.color = color;
    this.isAttacking;
    this.health = 100;

    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset,
      width: 125,
      height: 25
    };
  }

  draw() {
    c.fillStyle = this.color;
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
      
     //attack box
    if (this.isAttacking){
      c.fillStyle = "white";
      c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
    }
  }
  
  //updates our sprite; redraws them; applies gravity; allows left/right movement
  update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    //implementation of gravity to the character
    this.position.y += this.velocity.y;

    if(this.position.y + this.height + this.velocity.y >= canvas.height){
      this.velocity.y = 0;
    }
    else{
    this.velocity.y += gravity;
    }

    //update attack box
    //this.attackBox.position.x = this.position.x + this.width;
    //this.attackBox.position.y = this.position.y;
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100)
  }
}

// instantiate the player sprite
const player = new Sprite({
  position: {
  x: 200,
  y: 0
  },
  velocity: {
  x: 0,
  y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  color: 'violet'
});
// instantiate the enemy sprite
const enemy = new Sprite({
  position: {
  x: 775,
  y: 0
  },
  velocity: {
  x: 0,
  y: 0
  },
  offset : {
    x: -75,
    y: 0
  },
  color: 'lime'
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

// helper function for calculating if attack landed successfully
function rectangularCollision({rectangle1, rectangle2}) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
    rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

//
function determineWinner ({player, enemy, timerId}) {
  clearTimeout(timerId);
  document.querySelector('#gameResult').style.display = 'flex';
  if (player.health === enemy.health) {
    document.querySelector('#gameResult').innerHTML = 'Tie';
  }
  else if (player.health > enemy.health) {
    document.querySelector('#gameResult').innerHTML = 'Player 1 wins';
  }
  else if (player.health < enemy.health) {
    document.querySelector('#gameResult').innerHTML = 'Player 2 wins'
  }
}

// function that decrements the html timer using an infinite loop
let timer = 60;
let timerId;
function decreaseTimer() {
  if (timer > 0){
    timerId = setTimeout(decreaseTimer, 1000, timerId);
    timer --;
    document.querySelector('#timer').innerHTML = timer;
  }

  //determine who won by who has the most health
  
  if (timer === 0) {
    determineWinner({player, enemy});
  }
}

decreaseTimer()

//animation loop that calls itself and updates: the background, sprite movement & interactions, health bar
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

  // detect for collision
  if (rectangularCollision({
    rectangle1: player,
    rectangle2: enemy
  }) && player.isAttacking){
    player.isAttacking = false;
    enemy.health -= 20;
    document.querySelector('#enemyHealth').style.width = enemy.health + '%';
  }

  if (rectangularCollision({
    rectangle1: enemy,
    rectangle2: player
  }) && enemy.isAttacking){
    enemy.isAttacking = false;
    player.health -= 20;
    document.querySelector('#playerHealth').style.width = player.health + '%';
  }

  // Ending the game based on health
  if (enemy.health <= 0 || player.health <= 0){
    determineWinner({player, enemy, timerId})
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
    case ' ':
      player.attack()
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
    case 'ArrowDown':
      enemy.isAttacking = true;
    break
  }
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
});

