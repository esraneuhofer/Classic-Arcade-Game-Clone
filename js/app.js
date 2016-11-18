
function init (){
    $('#gameEnd').hide();
    allEnemies=[];
}
init();
//width and height of one "Field" on canvas defined in engine.js

var length_X = 101;
var height_Y = 83;

var score ;
var time;

//max width of Enemy
var max_X_Enemy =505;

//min and max postion of Player on the canvas
var min_X_Player = 0;
var min_Y_Player = -40;
var max_X_Player = 404;
var max_Y_Player = 415;



function log (input){
    console.log(input);
}




//ENEMIES:
//Defining Enemie Classes
var Enemy = function(startingX,startingY) {

    this.x = startingX;
    this.y = startingY;
    this.speed = Math.floor(Math.random() * 400) + 200// Random speed
    this.sprite = 'images/enemy-bug.png'; // image of Enemey
};

Enemy.prototype.update = function(dt) {
    //checks if Enemy goes over boundary
    if (this.x > max_X_Enemy) {
        this.x =-Math.floor((Math.random() * 5) + 1) * length_X;
        this.y = Math.floor((Math.random() * 3) + 1) * height_Y;
    } else {
        this.x = this.x + (this.speed * dt);
    }

    //checks for collision with Player and is reset to beginning
    if(this.y === player.y && (this.x >= player.x-65 && this.x <= player.x+52 )){
            player.reset();
    }
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Player:
//Defining Player Classes
var Player = function () {
    this.x = 202;
    this.y = 415;
    this.sprite = 'images/char-boy.png';
}
Player.prototype.update = function(dt){
    //if players reaches "Water" points are added and player is set to start
        if(this.y === 0){
            score =score+50;
            //time = time +5;
            $('.score').empty().append(score);
            this.reset();
        }
}
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

Player.prototype.handleInput = function(key) {
    //Handels players Input on keyboard
    //if player not over max width or heigth of canvas player moves
            if(key === "left"){
                var leftPos = this.x - length_X;
                if (leftPos >= min_X_Player) {
                    this.x = leftPos;
                }
            }
           else if(key === "up"){
                var upPos = this.y - height_Y;
                    if (upPos >= min_Y_Player) {
                        this.y = upPos;
                    }
            }
            else if(key === "right"){
                var rightPos = this.x + length_X;
                    if (rightPos <= max_X_Player) {
                        this.x = rightPos;
                    }
            }
            else if(key === "down"){
                var downPos = this.y + height_Y;
                    if (downPos <= max_Y_Player) {
                        this.y = downPos;
                    }
            }
};
Player.prototype.reset = function(){
    //resets player to starting postion
    this.x = 202;
    this.y = 415;
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//var allEnemies=[];

//var allEnemies;//define var to prevent error
var player = new Player();
var countdown ;

function startgame (){
    score = 0;
    time = 20;
    $('#time').empty().append(time);
    var countdown = setInterval(function () {
        time --;
        if(time === 0){
            endGame();
            clearInterval(countdown);


        }
        $('#time').empty().append(time);
    },1000)


    $('#gameEnd').hide();
    $('.score').empty().append(score);

    var enemy_Start_X = -(Math.floor((Math.random() * 5) + 1) * length_X);
    var enemy_Start_Y = Math.floor((Math.random() * 3) + 1) * height_Y;

    enemy = new Enemy(enemy_Start_X,enemy_Start_Y);
    enemy2 = new Enemy(enemy_Start_X,enemy_Start_Y);
    enemy3 = new Enemy(enemy_Start_X,enemy_Start_Y);
    enemy4 = new Enemy(enemy_Start_X,enemy_Start_Y);

    allEnemies = [enemy, enemy2, enemy3,enemy4];
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
//Button first start
$('#buttonStart').click(function() {
    startgame();
    $('#gameStart').hide();
    player.x = 202;
    player.y = 415;

});
//BUtton repeat game
$( "#again" ).click(function() {
    startgame();
    $('#gameEnd').hide();
    player.x = 202;
    player.y = 415;

});
//Ending Game
function endGame() {
    allEnemies=[];
    $('#time').empty().append(0);
    $('#gameEnd').show();
}
