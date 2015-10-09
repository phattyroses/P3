var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks


Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

//TODO I need to figure out how to get this to recognize the this.x so that it throws the player back to the beginning when the enemy and
//the player share the x and y.  Uncomment the code directly below to get the enemy to move again!
    this.x= (this.x + this.speed*dt);
    if (this.x>505){
        this.x = 0;
    }
};

    var checkCollisions = function(){
        for (var i = 0; i<allEnemies.length; i++){
        if ((player.x <= (allEnemies[i].x+25) && player.x >= (allEnemies[i].x-25)) && (player.y <= (allEnemies[i].y+25) && player.y >= (allEnemies[i].y - 25))){
            player.x = 225;
            player.y = 400;
            resetScoreboard(score+1);
            score = 0;
            updateScore(score);
        }
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};
//The scoreboard
var score = 0;

var updateScore = function(score){
    resetScoreboard(score);
        ctx.fillStyle = 'black';
        ctx.fillText(score, 420, 50);

};


var resetScoreboard = function(score){
    ctx.fillStyle = 'white';
    ctx.fillText((score-1), 420, 50);
};

Player.prototype.update = function() {
    if (this.y <= 25){
        this.x = 225;
        this.y = 400;
        score = score+1;
        updateScore(score);
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys){
    if (allowedKeys==='left' && this.x>=0){
        this.x = this.x - 30;
    }else if(allowedKeys==='up' && this.y>=0){
        this.y = this.y - 30;
    }else if(allowedKeys === 'down' && this.y<= 400){
        this.y = this.y + 30;
    }else if(allowedKeys === 'right' && this.x <= 505){
        this.x = this.x + 30;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var player = new Player(225, 400);
var enemy1 = new Enemy(5, 25, 150);
var enemy2 = new Enemy(100, 40, 200);
var enemy3 = new Enemy(300, 100, 250);
var enemy4 = new Enemy(50, 150, 150);
var enemy5 = new Enemy(0, 200, 250);


var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

