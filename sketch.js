let kirby;
let Cheese;
let leftKeyIsHeld = false;
let rightKeyIsHeld = false;
let upKeyIsHeld = false;
let downKeyIsHeld = false;
var Player;
var globs = [];
let shoots = [];
let moveLeftBlock = false;
let moveRightBlock = false;
var TetrisBlock;
var GlobSystem;
var gs;
var timer;
var Glob;
var DeathBar;
var DeathBlock;
var dbOne;
var dbTwo;
var dbThree;
var dbFour;
var dbFive;
var dbSix;
var blockPass = [];
var bp = 0;
var db = [];
var a = 880;
var UltimateBar;
var clock = 0;
var screenChange = 0;
var myVar;





function preload(){
  kirby = loadImage('kirby.png');
  Cheese = loadImage('Cheese.jpg');
}


function setup() {

  createCanvas(1000,960);
  background(20);
  textFont("Courier New");
  // block = new TetrisBlock(0,0,60)
  // myPiece = new Pieces(piece_S,0,0);
  player = new Player();
  gs = new GlobSystem();
  death = new DeathBar();
  ult = new UltimateBar();
  sec = new Timer();
  // dbs = new DeathBlockSystem();
  // db = new DeathBlockSystem();
  death.container();
  timer = 3000;
  setInterval ( () => gs.produceGlob(), timer);
  myVar = setInterval ( () => sec.countup(),1000);

}
// var myVar;
function draw() {

if (screenChange === 0){
  background(255);
  fill(0);
  text("Welcome to \n Fun Trim World Wail World Risk! \n click 's' to begin",width/2, height/2);

}

if(screenChange == 1){
  background(255);
  fill(255);
  death.container();
  ult.display();
  // console.log(clock);
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


    for(var j = 0; j < globs.length; j++){
      if(shoots[i].hit(globs[j])){
        globs[j].shrink();
        shoots[i].gone();
      }
        if (globs[j].radius < 0){
          globs[j].gone();
        }
      }
    }
    if(ult.ultimate == 100){
        if(bp == 0){
          text("so i see that your have charged your ultimate \n BUT \n you don't need it since you are just that good at this game \n so instead of here is a upgrade for your bullets",width/2,height/2);
          for(var e = 0; e < shoots.length; e++){
            shoots[e].radius = 30;
          }
        }  else {
            bp = 0;
            ult.end();
          }
    }
  }
  for (var i = 0; i <= bp; i++) {
    rect(0, height - ((i+1) * 80), 80, 80);
  }
// deleting the bullets

  for(var i = shoots.length - 1; i >= 0; i--){
    if(shoots[i].toDelete){
      shoots.splice(i,1);

    }
  }
  for(var i = globs.length - 1; i >= 0; i--){
    if(globs[i].delete){
      globs.splice(i,1);
      if(ult.ultimate < 100){
        ult.ultimate += 50;
      }else{
        ult.ultimate += 0;
      }
    }
  }

if(bp == 13){
  screenChange = 2;
  clearInterval(myVar);
}

if(screenChange == 2){
  background(255);
  fill(0);
  text("you did great! \n your time was: " + clock, width/2,height/2);
}
// console.log(bp);

}
// console.log("yo");


//////////////////////////K I R B Y   C H A R A C T E R /////////////////////////////////



function Player(){
  this.xPosition = 500;
  this.yPosition = 500 ;
}

Player.prototype.display = function(){
  image(kirby,this.xPosition,this.yPosition,100,100);

}

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
  if(key === ' '){
    // console.log('w');
    var shoot = new Shoot(player.xPosition + 50,player.yPosition +10);
    shoots.push(shoot);
  }
  if(key === ','){
    moveLeftBlock = true;
  }
  if(key === '.'){
    moveRightBlock = true;
  }
  if(key === 's'){
    screenChange =1;
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
  if(key === ','){
    moveLeftBlock = false;
  }
  if(key === '.'){
    moveRightBlock = false;
  }
}

function Shoot(x,y){
  this.xPosition = x;
  this.yPosition = y;
  this.radius = 15;
  this.toDelete = false;
}

Shoot.prototype.display = function(){
  fill(random(255),random(255),random(255));
  ellipse(this.xPosition,this.yPosition,this.radius*2,this.radius*2);
}

Shoot.prototype.movement = function(){
  this.yPosition -= 4;
}

Shoot.prototype.hit = function(Glob){
  var d = dist(this.xPosition,this.yPosition,Glob.xPosition,Glob.yPosition);
  if( d < this.radius + Glob.radius){
    return true;
  }else{
    return false;
  }
}
Shoot.prototype.normalSize = function(){
  this.radius = 15;
}
Shoot.prototype.ultSize = function(){
  this.radius = 40;
}
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

Glob.prototype.display = function (){
  fill(255,0,0);
  stroke(255,0,0);
  rect(this.xPosition,this.yPosition,this.radius*2,this.radius*2);
	// fill(255);
	// ellipse(this.xPosition + 40, this.yPosition + 40, this.radius*2 - 10, this.radius*2 - 10);
  //
	// fill(0);
	// stroke(2);
	// arc(this.xPosition+40, this.yPosition +50, this.radius - 10, this.radius - 10, 0, PI);
  //
	// ellipse(this.xPosition + 20, this.yPosition + 25, this.radius/9,  this.radius/9);
	// ellipse(this.xPosition + 60, this.yPosition + 25, this.radius/9,  this.radius/9);

}

Glob.prototype.shrink = function(){
  this.radius = this.radius - 15;
}

Glob.prototype.move = function(){
  this.yPosition += this.yDir;

  // console.log("log");


}

Glob.prototype.turnLeft = function(){
  this.xDir = -2;
}

Glob.prototype.turnRight = function(){
  this.xDir = 2;
}

Glob.prototype.stopMove = function(){
  this.yDir = 0;
}

Glob.prototype.run = function(){
  this.display();
  this.move();
}

Glob.prototype.collide = function(other){
  var d = dist(this.xPosition, this.yPosition, other.xPosition, other.yPosition);
  if(d<this.radius + other.radius){
    return true;
  }else{
    return false;
  }

}

Glob.prototype.gone = function(){
  this.delete = true;
}

Glob.prototype.passed = function(){
  if(Glob.yPosition > height){
    this.total += 1;
  }
}


//
function GlobSystem (){
  // this.globs = [];
}

GlobSystem.prototype.produceGlob = function(){
  globs.push(new Glob(random(0,1000),0));
}

GlobSystem.prototype.run = function(){
  var p;
    for (var i = globs.length - 1; i >= 0; i--) {
        p = globs[i];
        p.run();
        console.log(globs[i].yDir);

        if(p.yPosition >= height){
          bp += 1;
          globs.splice(i,1);
          // a -= 80;
          console.log(bp);
        }

    }

}



/////////////////////////////// DEATH BAR ////////////////////////////////////////

function DeathBar(){
  this.xPosition = 0;
  this.yPosition =00;
  this.xSize = 80;
  this.ySize = 1000;

}

DeathBar.prototype.container = function(){
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


// function DeathBlockSystem (){
//   // this.db = [];
// }
//
// DeathBlockSystem.prototype.produceBlock = function (){
//   db.push(new DeathBlock(0,a));
// }
//
// DeathBlockSystem.prototype.run = function(){
//   var b;
//     for (var i = db.length - 1; i >= 0; i--) {
//         b = db[i];
//         b.run();
//       }
//
// }



//
// function DeathBlockSystem (){
//
// }
//
// DeathBlockSystem.prototype.produce = function(){
//   dbList.push(new DeathBlock(this.xPosition,this.yPosition));
// }
//
// DeathBlockSystem.prototype.run = function(){
//   var d;
//     for (var i = dbList.length - 1; i >= 0; i--) {
//         d = dbList[i];
//         d.displ();
//
//     }
//   }
// }



///////////////////////ULTIMATE BAR////////////////////////////////
function UltimateBar (){
  this.ultimate = 0;
  this.max = 100;
  this.rectWidth = 200;
  this.ultMet = false;
}

UltimateBar.prototype.display = function(){
  var drawWidth = (this.ultimate / this.max) * this.rectWidth;
  fill(255,0,0);
  rect(500, 900, drawWidth, 50);

 // Outline
 stroke(0);
 noFill();
 rect(500, 900, this.rectWidth, 50);
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
