let kirby;
let cheese;
let leftKeyIsHeld = false;
let rightKeyIsHeld = false;
let upKeyIsHeld = false;
let downKeyIsHeld = false;
var Player;
var globs = [];
let shoots = [];
let moveLeftBlock = false;
let moveRightBlock = false;
var GlobSystem;
var gs;
var timer;
var Glob;
var DeathBar;
var DeathBlock;
var bp = -1;
var UltimateBar;
var clock = 0;
var screenChange = 0;
var myVar;
var score = 0;
var changeColorplease;

function preload(){
  kirby = loadImage('kirby.png');
  cheese = loadImage('cheese.png');
}

function setup() {
  createCanvas(1000,960);
  background(20);
  textFont("Courier New");
  changeColorplease =  color(random(255), random(255), random(255));
  player = new Player();
  gs = new GlobSystem();
  death = new DeathBar();
  ult = new UltimateBar();
  sec = new Timer();
  death.container();
  timer = 3000;
  setInterval ( () => gs.produceGlob(), timer);
  myVar = setInterval ( () => sec.countup(),1000);
}

function draw() {
console.log(timer);
if (screenChange === 0){
  background(255,0,0);
  fill(255,0,255);
  stroke(0);
  textSize(50);
  fill(0);
  text("Click To Start",270,560);
  text("Epilepsy Warning",240,620);
  fill(0);
  textSize(30);
  text("Welcome to",390, 250);
  text("FUN TRIM WORLD WAIL WORLD RISK", 220,300);
  textSize(20);
  text("Aim at the monsters to defeat them",280,350);
  text("Defeat as many as you can and survive the longest!", 190,400);
  bp = -1;
  clock = 0;
} else if(screenChange == 1){
  background(changeColorplease);
  fill(255);
  death.container();
  ult.display();
  player.display();
  player.movement();
  gs.run();
  // making sure kirby doesn't run off screen
  if(player.xPosition > width){
    player.xPosition = 0;
  }
  if(player.xPosition <0){
    player.xPosition = 1000;
  }
  if(player.yPosition > height){
    player.yPosition = 0;
  }
  if(player.yPosition < 0){
    player.yPosition = 960;
  }
  // Kirby is shooting and hitting the globs and the globs are dying
  for (var i = 0; i < shoots.length; i++){
    shoots[i].display();
    shoots[i].movement();
//bullets go away after hitting and the globs get smaller
    for(var j = 0; j < globs.length; j++){
      if(shoots[i].hit(globs[j])){
        globs[j].shrink();
        shoots[i].gone();
      }
      //globs diappear when it is too small
        if (globs[j].radius < 0){
          globs[j].gone();
        }
      }
    }
    //bullet gets big if you have no block in you deathbar
    if(ult.ultimate == 200){
        if(bp == -1){
          image(cheese,700,200,100,100);
          text("so i see that your have charged your ultimate \n BUT \n you don't need it since you are just that good at this game \n so instead of here is a upgrade for your bullets",200,100);
          for(var e = 0; e < shoots.length; e++){
            shoots[e].radius = 70;
          }
        }  else {
            bp = -1;
            ult.end();
          }
    }
  }  else if(screenChange == 2){
    background(255,0,0);
    fill(0);
    textSize(40);
    text("YOU DID GREAT!",400,400);
    text("Click to Play Again",380,450);
    textSize(20);
    text("Survival Time: " + clock, 400,600);
    text("Score: " + score,400,700);
  }
  for (var i = 0; i <= bp; i++) {
    rectMode(CORNER);
    fill(random(255),random(255),random(255));
    rect(0, height - ((i+1) * 80), 80, 80);
  }
// deleting the bullets
  for(var i = shoots.length - 1; i >= 0; i--){
    if(shoots[i].toDelete){
      shoots.splice(i,1);
    }
  }
  //add to your ult bar
  for(var i = globs.length - 1; i >= 0; i--){
    if(globs[i].delete){
      globs.splice(i,1);
      score += 1;
      if(ult.ultimate < 200){
        ult.ultimate += 50;
      }else{
        ult.ultimate += 0;
      }
    }
  }

//losing screen
if(bp == 11){
  screenChange = 2;
  clearInterval(myVar);
}

}
function mousePressed(){
  if(screenChange == 0){
    screenChange = 1;
  }else if (screenChange == 2){
    screenChange = 0;
  }
}
//////////////////////////K I R B Y   C H A R A C T E R /////////////////////////////////
function Player(){
  this.xPosition = 500;
  this.yPosition = 500 ;
}
//showing kirby
Player.prototype.display = function(){
  image(kirby,this.xPosition,this.yPosition,100,100);

}
//moving kirby
Player.prototype.movement = function(){
  if (upKeyIsHeld == true){
    this.yPosition -= 5;
  }
  if (downKeyIsHeld == true){
    this.yPosition += 5;
  }
  if (leftKeyIsHeld == true){
    this.xPosition -= 5;
  }
  if(rightKeyIsHeld == true){
    this.xPosition += 5;
  }
}
//moving kirby
function keyPressed(){
  if (keyCode === UP_ARROW){
    upKeyIsHeld = true;
    downKeyIsHeld = false;
    rightKeyIsHeld = false;
    leftKeyIsHeld = false;
  }
  if(keyCode === DOWN_ARROW){
    upKeyIsHeld = false;
    downKeyIsHeld = true;
    rightKeyIsHeld = false;
    leftKeyIsHeld = false;
  }
  if(keyCode === LEFT_ARROW){
    upKeyIsHeld = false;
    downKeyIsHeld = false;
    rightKeyIsHeld = false;
    leftKeyIsHeld = true;
  }
  if(keyCode === RIGHT_ARROW){
    upKeyIsHeld = false;
    downKeyIsHeld = false;
    rightKeyIsHeld = true;
    leftKeyIsHeld = false;
  }
  //shooting
  if(key === ' '){
    var shoot = new Shoot(player.xPosition + 50,player.yPosition +10);
    shoots.push(shoot);
    changeColorplease =  color(random(255), random(255), random(255));

  }
}

function keyReleased(){
  if (keyCode === UP_ARROW){
    upKeyIsHeld = false;
    downKeyIsHeld = false;
    rightKeyIsHeld = false;
    leftKeyIsHeld = false;
  }
  if(keyCode === DOWN_ARROW){
    upKeyIsHeld = false;
    downKeyIsHeld = false;
    rightKeyIsHeld = false;
    leftKeyIsHeld = false;
  }
  if(keyCode === LEFT_ARROW){
    upKeyIsHeld = false;
    downKeyIsHeld = false;
    rightKeyIsHeld = false;
    leftKeyIsHeld = false;
  }
  if(keyCode === RIGHT_ARROW){
    upKeyIsHeld = false;
    downKeyIsHeld = false;
    rightKeyIsHeld = false;
    leftKeyIsHeld = false;
  }
  if(key === " "){
    shootPress = false;
  }
}

function Shoot(x,y){
  this.xPosition = x;
  this.yPosition = y;
  this.radius = 15;
  this.toDelete = false;
}
//bullet displays
Shoot.prototype.display = function(){
  fill(random(255),random(255),random(255));
  ellipse(this.xPosition,this.yPosition,this.radius*2,this.radius*2);
}
//bullets moving
Shoot.prototype.movement = function(){
  this.yPosition -= 4;
}
//bullets hitting
Shoot.prototype.hit = function(Glob){
  var d = dist(this.xPosition,this.yPosition,Glob.xPosition,Glob.yPosition);
  if( d < this.radius + Glob.radius){
    return true;
  }else{
    return false;
  }
}
//bullets go away
Shoot.prototype.gone = function(){
  this.toDelete = true;
}
////////////////////////////////E N E M Y   G L O B S ////////////////////////////////////////
function Glob (x,y){
  this.xPosition = x;
  this.yPosition = y;
  this.radius = 40;
  this.xDir = 2;
  this.yDir = 2;
  this.delete = false;
  this.total = 0;
}
//enemy display
Glob.prototype.display = function (){
  rectMode(CENTER);
  fill(255,0,0);
  stroke(255,0,0);
  rect(this.xPosition,this.yPosition,this.radius*2,this.radius*2);
	fill(255);
	ellipse(this.xPosition , this.yPosition , this.radius*2 - 10, this.radius*2 - 10);

	fill(0);
	stroke(2);
	arc(this.xPosition, this.yPosition +10, this.radius - 10, this.radius - 10, 0, PI);

	ellipse(this.xPosition -20, this.yPosition -15, this.radius/9,  this.radius/9);
	ellipse(this.xPosition + 20, this.yPosition -15, this.radius/9,  this.radius/9);
}
//enemy get smaller
Glob.prototype.shrink = function(){
  this.radius = this.radius - 15;
}
//enemy moving and getting faster as time progresses
Glob.prototype.move = function(){
  this.yPosition += this.yDir;
  if (clock >= 30 && clock <= 60){
    this.yDir = 5;
    timer = 2000;
  }
  if(clock >= 60){
    this.yDir = 10;
    timer = 1000;
  }
}
Glob.prototype.run = function(){
  this.display();
  this.move();
}
Glob.prototype.gone = function(){
  this.delete = true;
}
Glob.prototype.passed = function(){
  if(Glob.yPosition > height){
    this.total += 1;
  }
}
function GlobSystem (){
}
GlobSystem.prototype.produceGlob = function(){
  globs.push(new Glob(random(100,900),0));
}
//enemy that passes counter
GlobSystem.prototype.run = function(){
  var p;
  push();
    for (var i = globs.length - 1; i >= 0; i--) {
        p = globs[i];
        p.run();

        if(p.yPosition >= height){
          bp += 1;
          globs.splice(i,1);

        }

    }
    pop();
}
/////////////////////////////// DEATH BAR ////////////////////////////////////////
//losing score
function DeathBar(){
  this.xPosition = 0;
  this.yPosition =00;
  this.xSize = 80;
  this.ySize = 1000;

}
DeathBar.prototype.container = function(){
  rectMode(CORNER);
  stroke(0);
  fill(255);
  rect(this.xPosition, this.yPosition,this.xSize, this.ySize);
}
function DeathBlock(x,y){
  this.xPosition = x;
  this.yPosition = y;
  this.size = 80;
}
DeathBlock.prototype.display = function(){
  stroke(255,0,0);
  fill(0);
  rect(this.xPosition,this.yPosition,this.size, this.size);
}
DeathBlock.prototype.run = function(){
  DeathBlock.display();
}
///////////////////////ULTIMATE BAR////////////////////////////////
function UltimateBar (){
  this.ultimate = 0;
  this.max = 200;
  this.rectWidth = 400;
  this.ultMet = false;
}

UltimateBar.prototype.display = function(){
  var drawWidth = (this.ultimate/this.max) * this.rectWidth;

  fill(255,0,0);
  rect(300, 900, drawWidth, 50);
 // Outline
 stroke(0);
 noFill();
 rect(300, 900, this.rectWidth, 50);
}
UltimateBar.prototype.boom = function (){
  this.ultMet = true;
}
UltimateBar.prototype.end = function(){
  this.ultMet = false;
  this.ultimate = 0;
}
/////////////////////////Timer//////////////////
function Timer (){
}
Timer.prototype.countup = function(){
  clock += 1;
}
