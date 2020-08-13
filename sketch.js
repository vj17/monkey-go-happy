var PLAY = 1, END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var wooshSound, gameOverSound;

var survivalTime = 0;

function preload(){
  //load images and sounds here
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  wooshSound = loadSound("woosh.mp3");
  gameOverSound = loadSound("gameover.mp3");
 
}

function setup() {
  //create canvas
  createCanvas(600,400);
  
  //create the monkey sprite
  monkey = createSprite(40,365,40,40);
  monkey.addAnimation ("monkey_running", monkey_running);
  monkey.scale = 0.09;
  
  //create the ground sprite
  ground = createSprite(300,395,600,10);
    
  //create food group and obstacle group
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
}

function draw() {

 //set the background color
 background("darkgreen");
  
 //display survival time and score
 textSize(20);
 fill("white");
 text("Survival Time: " + survivalTime, 400, 100);
 survivalTime += Math.round(getFrameRate()/62); 
  
 if(gameState === PLAY){
  
 //add velocity to the ground
 ground.VelocityX = -4;
  
 //reset the ground if x<0
 if(ground.x<0){
  ground.x = ground.width/2; 
 }
  
 //make the monkey jump when space is pressed
 if(keyDown("space")){
  monkey.velocityY = -10; 
 }
  
 //add gravity to the monkey
 monkey.velocityY = monkey.velocityY + 0.8;
  
 //make the monkey collide with the ground
 monkey.collide(ground);
  
 //spawn bananas
 spawnBananas();
  
 //spawn obstacles
 spawnObstacles();
  
 if(monkey.isTouching(foodGroup)){
   foodGroup.destroyEach();
   wooshSound.play();
 }
  
 if(monkey.isTouching(obstacleGroup)){
  gameState = END; 
  gameOverSound.play();
 }
 }
  
  if(gameState === END){
   foodGroup.setVelocityEach(0);
   obstacleGroup.setVelocityEach(0);
   foodGroup.setLifeTimeEach = -1;
   obstacleGroup.setLifetimeEach = -1;
   monkey.destroy();
   survivalTime = 0;
   textSize(20);
   text("GAME OVER", 275,200);
}
 //draw the sprites 
 drawSprites();

}

function spawnBananas(){
 
  if(frameCount % 150 === 0){
    var banana = createSprite(600,200,40,40);
    banana.addImage(bananaImage);
    banana.scale = 0.06;
    //assign random y-position to banana
    var yPos = Math.round(random(120,200));
    banana.y = yPos;
    banana.velocityX = -4;
    banana.lifetime = 200;
    foodGroup.add(banana);
  }  
  
}

function spawnObstacles(){
  
  if(frameCount % 300 === 0){
    var obstacle = createSprite(600,375,50,70);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.09;
    obstacle.velocityX = -5;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}
