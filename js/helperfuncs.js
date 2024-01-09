
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
  