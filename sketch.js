
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var ground
var gamestate="PLAY"
var points=0
function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(500,500)
  background(255)
  
  monkey=createSprite(80,470,20,20)
  monkey.addAnimation("moving",monkey_running) 
  monkey.scale=0.1
  
  ground=createSprite(250,490,990,10)
  
  
  foodGroup=new Group()
  obstacleGroup=new Group()
  
  score = 0
  
}


function draw() {
 
  background("lightgreen")
 if(gamestate==="PLAY"){
   textSize(20);
   fill("black")
  text("Score:"+points,300,40) 
 
  ground.velocityX=-(5+score/50);
  if(ground.x<0){
    ground.x=250
  }
  
  if(keyDown("space")&&monkey.y>300){
    monkey.velocityY=-12
  }  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    points=points+1
  }
  
  monkey.velocityY=monkey.velocityY+0.8
  monkey.collide(ground)
  
  spawnObstacle()
  spawnFood()
  
  score = score+Math.round( getFrameRate()/60)
   fill("black");
   textSize(20);
  text("Survival Time:" + score , 300 , 20)
    drawSprites()
   if (obstacleGroup.isTouching(monkey)){
     gamestate="END"
   }
 }
 if (gamestate==="END"){
   textSize(50)
   fill ("red")
  text("GAME OVER", 100,250) 
   
   
 }
}

function spawnFood(){
  if(frameCount%200===0){
    banana=createSprite(400,250)
    banana.addImage(bananaImage)
    banana.y=Math.round(random(200,300))
    banana.velocityX=-3
    banana.lifetime=300
    banana.scale=0.1
    foodGroup.add(banana)
  }
}

function spawnObstacle(){
  if(frameCount%100===0){
    obstacle=createSprite(500,470)
    obstacle.addImage(obstacleImage)
   
   obstacle.velocityX=-(3+score/50)
   obstacle.lifetime=300
    obstacle.scale=0.1
    obstacleGroup.add(obstacle)
  }
}


