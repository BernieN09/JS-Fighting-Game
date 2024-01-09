// class creates background object
class Sprite{
  constructor({position, imageSrc}){
    this.position = position;
    this.height = 100;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
  }
  
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
  
  //updates our sprite; redraws them; applies gravity; allows left/right movement
  update() {
    this.draw();
  }
}

// Class creates characters that can run, jump, and slash
class Fighter{
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

    if(this.position.y + this.height + this.velocity.y >= canvas.height - 53){
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