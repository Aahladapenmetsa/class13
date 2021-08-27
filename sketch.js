var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud; 
var cloud_img;
var obstacle;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
var cloudGroup;
var obstacleGroup ;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
groundImage = loadImage("ground2.png");
  
cloud_img = loadImage("cloud.png");
 
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage ("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage ("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage ("obstacle6.png");
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 
  var ran = Math.round(random(1,10));
  console.log("hello" + 5);

  cloudGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {
  //set background color
  background(180);
text("Score : " + score,500,50);


if(gameState === PLAY){

// increase the score 
score = score + Math.round(frameCount/60)
// to move the ground 
ground.velocityX = -4;
// jump when the space key is pressed
if(keyDown("space")&& trex.y >= 160) {
  trex.velocityY = -10;
}
// gravity 
trex.velocityY = trex.velocityY + 0.8
// infinte ground
if (ground.x < 0){
  ground.x = ground.width/2;
}
spawnClouds();
  spawnObstacles();
  if(obstacleGroup.isTouching(trex)){
    gameState = END; 
  }
}
else if(gameState === END){
ground.velocityX = 0;

obstacleGroup.setVelocityXEach(0)
cloudGroup.setVelocityXEach(0)
}

  //stop trex from falling down
  trex.collide(invisibleGround);

 
  drawSprites();
  
}

function spawnClouds(){
if(frameCount%60 === 0 ){


cloud = createSprite(600,100,40,10);
cloud.addImage(cloud_img);
cloud.velocityX = -3;
cloud.scale = 0.4;
cloud.y = Math.round(random(10,90))
cloud.depth = trex.depth
trex.depth= trex.depth+1
cloud.lifetime = 200; 
cloudGroup.add(cloud)

}
}

function spawnObstacles(){
if(frameCount%60 === 0){

obstacle = createSprite (600,165,10,40);
obstacle.velocityX = -6;
var rand = Math.round(random(1,6)); 
switch(rand){
case 1: obstacle.addImage(obstacle1);
break;
case 2: obstacle.addImage(obstacle2);
break;
case 3: obstacle.addImage(obstacle3);
break;
case 4: obstacle.addImage(obstacle4);
break;
case 5: obstacle.addImage(obstacle5);
break;
case 6: obstacle.addImage(obstacle6);
break;
default: break;
}
obstacle.scale = 0.5;
obstacle.lifetime = 100;
obstacleGroup.add(obstacle);
}
}
