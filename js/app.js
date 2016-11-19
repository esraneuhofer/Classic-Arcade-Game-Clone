//Opens Starting Modal on load to choose options and start the game
$('#modalStart').modal('show');

//Hides Volume off
$('#volumeOff').hide();

//Creates empty Array to prevent error Message
function init (){
    allEnemies=[];
}
init();

//width and height of one "Field" on canvas defined in engine.js
var length_X = 101;
var height_Y = 83;

//Setting variables
var sound;
var score ;
var lives;
var oldLives; //keep track of lives for restarting with same options
var time;
var speed;
var numberEnemey;

//max width of Enemy
var max_X_Enemy =505;

//min and max postion of Player on the canvas
var min_X_Player = 0;
var min_Y_Player = -40;
var max_X_Player = 404;
var max_Y_Player = 498;
var start_X_Player=2*length_X;
var start_Y_Player=6*height_Y;

//ENEMIES:
//Defining Enemie Classes
//speed gets set on startgame()
var Enemy = function(startingX,startingY,speed) {

    this.x = startingX;
    this.y = startingY;
    this.speed = Math.floor(Math.random() * speed) + 200// Random speed
    this.sprite = 'images/enemy-bug.png'; // image of Enemey
};

//checks if Enemy goes over boundary
//Multiplied by dt as per instruction to keep it fluent
Enemy.prototype.update = function(dt) {
    if (this.x > max_X_Enemy) {
        this.x =-Math.floor((Math.random() * 5) + 1) * length_X;
        this.y = Math.floor((Math.random() * 4) + 2) * height_Y;
    } else {
        this.x = this.x + (this.speed * dt);
    }

    //checks for collision with Player and is reset to beginning
    if(this.y === player.y && (this.x >= player.x-65 && this.x <= player.x+52 )){
            lives --;
            $('#lives').empty().append(lives);

        if (lives === 0){
            endGame()
        }
            player.reset();
    }
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Player:
//Defining Player
var Player = function () {
    this.x = 202;
    this.y = 415;
    this.sprite = 'images/char-boy.png';
}

//if players reaches "Water" points are added and player is set to start
Player.prototype.update = function(dt){
        if(this.y === 0){
            score =score+50;
            $('.score').empty().append(score);
            this.reset();
        }
}
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

//Handels players Input on keyboard
//if player not over max width or heigth of canvas player moves
Player.prototype.handleInput = function(key) {

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

//resets player to starting postion
Player.prototype.reset = function(){
    this.x = start_X_Player;
    this.y = start_Y_Player;
};

var player = new Player();

//takes 3 parameters which are set by player
//Resets games
function startgame (speedValue,enemyValue,livesValue){
    player.x = start_X_Player;
    player.y = start_Y_Player;
    score = 0;

    //Sets new parameters for Enemies and time
    oldLives=livesValue;
    lives = livesValue;
    numberEnemey = enemyValue;
    speed =speedValue;

    $('#lives').empty().append(lives);

    //Starts timer
    //var countdown = setInterval(function () {
    //    time --;
    //    if(time === 0){
    //        endGame();
    //        clearInterval(countdown);
    //    }
    //    $('#lives').empty().append(time);
    //},1000)


    $('.score').empty().append(score);

    //Initiates amount of Enemies
    for (var i = 0;i<numberEnemey;i++){
        var enemy_Start_X = -(Math.floor((Math.random() * 5) + 1) * length_X);
        var enemy_Start_Y = Math.floor((Math.random() * 4) + 2) * height_Y;
        allEnemies.push(new Enemy(enemy_Start_X,enemy_Start_Y,speed));
    }
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
//Button start game
//Get values through input in modal
$('#buttonStart').click(function() {
    var speedMonster;
    var amountMonster;
    var timeGame;
    var livesGame


    var speedString = $('input[name=speedRadio]:checked').val();
    if(speedString === "slow"){
        speedMonster = 200;

    }
    if(speedString === "fast"){
        speedMonster = 400;
    }
    if(speedString === "insane"){
        speedMonster = 600;
    }

    var amountString = $('input[name=amountRadio]:checked').val();
    if(amountString === "few"){
        amountMonster = 3;
    }
    if(amountString === "many"){
        amountMonster = 6;
    }
    if(amountString === "army"){
        amountMonster = 8;
    }

    var livesString = $('input[name=livesRadio]:checked').val();
    if(livesString === "one"){
        livesGame = 1;
    }
    if(livesString === "three"){
        livesGame = 3;
    }
    if(livesString === "five"){
        livesGame = 5;
    }
    startgame(speedMonster,amountMonster,livesGame);
    player.x = start_X_Player;
    player.y = start_Y_Player;

});
//Button repeat game
//Repeats game with former input
$( "#again" ).click(function() {
    startgame(speed,numberEnemey,oldLives);

});
//Opens Starting Modal to set new options
$( "#restart" ).click(function() {
    $('#modalStart').modal('show');
});
//End game function is called when time is over
function endGame() {
    allEnemies=[];
    $('#lives').empty().append(0);
    $('#modalEnd').modal('show');
}

//Activates Sound
//Sets a loop
function activateSound(){

    sound = new Audio('audio/backgroundmusic.mp3');
    sound.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    sound.play();
    $('#volumeOff').hide();
    $('#volumeOn').show()
}

//Deavtivates Sound
function deactivateSound(){
    sound.pause();
    $('#volumeOff').show()
    $('#volumeOn').hide()
}

//Toggel Button to activate and deactivated the sound
$('#volumeOff').click(function () {
    activateSound()
});
$('#volumeOn').click(function () {
    deactivateSound()
});

//Resets and opens modal
$('#reset').click(function () {
    endGame();

});
activateSound()

