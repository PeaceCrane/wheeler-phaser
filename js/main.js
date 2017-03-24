console.log(Phaser);//This sets the variable for the spacebar.
var spaceKey;

var ground;
var player;
var obstacle;
var music;
//This sets the score to start at -1.
var score = -1;


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

//This is the object which runs the game.
function preload(){
	game.load.image('background', 'assets/TempestForceEndor-ROTJ.png');
	game.load.image('player', "assets/Darth_Vader.png");
	game.load.image('ground', 'assets/wallHorizontal.png');
	game.load.image('obstacle', 'assets/At-st.png');
	game.stage.backgroundColor = "000000";
	game.load.audio('backgroundMusic', 'assets/vadersong.mp3');

};

function create(){
	game.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'background');
	player = game.add.sprite(game.width/8, game.world.height*(5/7), 'player');
	obstacle = game.add.sprite(700,game.world.height, 'obstacle');
	obstacle.scale.setTo(.7,.7);
	obstacle.anchor.setTo(0,1);
	platforms = game.add.group();
	platforms.enableBody = true;
	ground = platforms.create(0, 600, 'ground');
	ground.anchor.setTo(0,1);
	ground.scale.setTo(4, 1);
	player.scale.setTo(.3, .3);
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.enable(player);
	game.physics.arcade.enable(ground);
 	game.physics.arcade.enable(obstacle);
 	obstacle.body.immovable = true;
 	ground.body.immovable = true; 
 	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 	player.body.bounce.y = .2;
 	player.body.gravity.y = 600;
	scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#ff0000'});
	music = game.add.audio('backgroundMusic');
	music.play();
	};
function update(){
game.physics.arcade.collide(player, obstacle);
game.physics.arcade.collide(player, ground);
if (spaceKey.isDown) {
	player.body.velocity.y = -300;
}
if (obstacle.x > 600) { 
obstacle.x -= .05;
};
if (obstacle.x < 0) {
obstacle.kill();	
obstacle = game.add.sprite(900, GAME_HEIGHT, 'obstacle');
obstacle.scale.setTo(.7,.7);
obstacle.anchor.setTo(0,1);
game.physics.arcade.enable(obstacle);
obstacle.body.immovable = true;
}
if (obstacle.x < 5 && player.x >5){ 
score++;
scoreText.text = 'score: ' + score;
};
if (player.x < 0){ 
scoreText = game.add.text(50,200, 'The Rebels ESCAPED!! (game by Ace the Sith Aprentice)', {fill: '#026807'});
obstacle.kill();
player.kill();
};

};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });

game.state.start();