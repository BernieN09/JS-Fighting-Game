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


const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/resizedbackground.png'
}); 

const crow = new Sprite({
  position: {
    x: 200,
    y: canvas.height - 150
  },
  imageSrc: './img/Crow.png',
  scale: 2,
  framesMax: 4
}); 

// instantiate the player sprite
const player = new Fighter({
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
const enemy = new Fighter({
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

decreaseTimer()

//animation loop that calls itself and updates: the background, sprite movement & interactions, health bar
function animate(){
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0,0, canvas.width, canvas.height);

  background.update();
  crow.update();
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
console.log(enemy);

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
      player.attack();
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
      enemy.attack();
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

