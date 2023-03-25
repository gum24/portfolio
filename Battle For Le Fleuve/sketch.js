//globals
let start = 0;
let selected = -1;
let selectedSprite = null;
let click = false;
let time = 0;
let bridge1 = false;
let bridge2 = false;
let menu = "none";

//player variable
let pminerals = 150;
let plumber = 150;
let pfood = 300;
let activep = -1; //like select but both teams can do it to spawn troops

//computer variable
let cminerals = 200;
let clumber = 200;
let cfood = 500;
let activec = -1;

function preload() {
  backgroundImg = loadImage("assets/map.png");
  brokenb1 = loadImage("assets/map2.png");
  brokenb2 = loadImage("assets/map3.png");
  archerL1 = loadImage("assets/archerL1.png");
  archerL2 = loadImage("assets/archerL2.png");
  archerR1 = loadImage("assets/archerR1.PNG");
  archerR2 = loadImage("assets/archerR2.png");
  blackknightL1 = loadImage("assets/blackknightL1.PNG");
  blackknightL2 = loadImage("assets/blackknightL2.png");
  blackknightR1 = loadImage("assets/blackknightR1.png");
  blackknightR2 = loadImage("assets/blackknightR2.png");
  cavalryL1 = loadImage("assets/cavalryL1.png");
  cavalryL2 = loadImage("assets/cavalryL2.png");
  cavalryR1 = loadImage("assets/cavalryR1.png");
  cavalryR2 = loadImage("assets/cavalryR2.png");
  spearmanL1 = loadImage("assets/spearmanL1.png");
  spearmanL2 = loadImage("assets/spearmanL2.png");
  spearmanR1 = loadImage("assets/spearmanR1.png");
  spearmanR2 = loadImage("assets/spearmanR2.PNG");
  cannonL1 = loadImage("assets/cannonL1.png");
  cannonL2 = loadImage("assets/cannonL2.png");
  cannonR1 = loadImage("assets/cannonR1.png");
  cannonR2 = loadImage("assets/cannonR2.png");
  trebucheL1 = loadImage("assets/trebucheL1.png");
  trebucheL2 = loadImage("assets/trebucheL2.png");
  trebucheR1 = loadImage("assets/trebucheR1.png");
  trebucheR2 = loadImage("assets/trebucheR2.png");
  castle1 = loadImage("assets/castle1.png");
  castle2 = loadImage("assets/castle2.PNG");
  barn = loadImage("assets/barn.PNG");
  outpost = loadImage("assets/outpost.PNG");
  lumber = loadImage("assets/lumber.PNG");
  mine1 = loadImage("assets/mine1.PNG");
  mine2 = loadImage("assets/mine2.png");
  tree = loadImage("assets/pinetree.png");
  laborerL = loadImage("assets/laborerL.png");
  laborerR = loadImage("assets/laborerR.png");
  tree = loadImage("assets/pinetree.png");
  
  font = loadFont("medievalnormal.ttf");
}

class Unit {
  constructor(type, team, x, y) {
    this.type = type;
    this.team = team;
    switch(type) {
      case "archer":
        this.x = x;
        this.y = y;
        this.speed = 0.8;
        this.atkspeed = 2000;
        this.range = 600;
        this.maxhp = 100;
        this.health = this.maxhp;
        this.damage = 10;
        this.size = 5;
        this.currSize = this.size;
        this.direction = "right";
        this.sprites = [archerL1,archerL2,archerR1,archerR2];
        this.currentSprite = this.sprites[2];
        this.isBuilding = false;
        break;
      case "cavalry":
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.atkspeed = 4000;
        this.range = 300;
        this.maxhp = 250;
        this.health = this.maxhp;
        this.damage = 50;
        this.size = 2;
        this.currSize = this.size;
        this.direction = "right";
        this.sprites = [cavalryL1,cavalryL2,cavalryR1,cavalryR2];  
        this.currentSprite = this.sprites[2];
        this.isBuilding = false;
        break;
      case "spearman":
        this.x = x;
        this.y = y;
        this.speed = 0.6;
        this.atkspeed = 3000;
        this.range = 250;
        this.maxhp = 160;
        this.health = this.maxhp;
        this.damage = 40;
        this.size = 4;
        this.currSize = this.size;
        this.direction = "right";
        this.sprites = [spearmanL1,spearmanL2,spearmanR1,spearmanR2]; 
        this.currentSprite = this.sprites[2];
        this.isBuilding = false;
        break;
      case "knight":
        this.x = x;
        this.y = y;
        this.speed = 1;
        this.atkspeed = 3000;
        this.range = 250;
        this.maxhp = 300;
        this.health = this.maxhp;
        this.damage = 100;
        this.size = 1;
        this.currSize = this.size;
        this.direction = "right";
        this.sprites = [blackknightL1,blackknightL2,blackknightR1,blackknightR2]; 
        this.currentSprite = this.sprites[2];
        this.isBuilding = false;
        break;
      case "cannon":
        this.x = x;
        this.y = y;
        this.speed = 0.3;
        this.atkspeed = 8000;
        this.range = 700;
        this.maxhp = 100;
        this.health = this.maxhp;
        this.damage = 300;
        this.size = 1;
        this.currSize = this.size;
        this.direction = "right";
        this.sprites = [cannonL1,cannonL2,cannonR1,cannonR2]; 
        this.currentSprite = this.sprites[2];
        this.isBuilding = false;
        break;
      case "trebuchet":
        this.x = x;
        this.y = y;
        this.speed = 0.6;
        this.atkspeed = 10000;
        this.range = 700;
        this.maxhp = 2000;
        this.health = this.maxhp;
        this.damage = 1000;
        this.size = 1;
        this.currSize = this.size;
        this.direction = "right";
        this.sprites = [trebucheL1,trebucheL2,trebucheR1,trebucheR2]; 
        this.currentSprite = this.sprites[2];
        this.isBuilding = false;
        break;
      case "laborer":
        this.x = x;
        this.y = y;
        this.speed = 0.6;
        this.atkspeed = 5000;
        this.range = 250;
        this.maxhp = 120;
        this.health = this.maxhp;
        this.damage = 0;
        this.size = 3;
        this.currSize = this.size;
        this.direction = "right";
        this.sprites = [laborerL,laborerL,laborerR,laborerR]; 
        this.currentSprite = this.sprites[2];
        this.isBuilding = false;
        break;
      case "castle":
        this.x = x;
        this.y = y;
        this.speed = 0;
        this.atkspeed = 11000;
        if(this.team == "computer") {
          this.atkspeed -= start * 2000;
        }
        this.range = 700;
        this.maxhp = 5000;
        this.health = this.maxhp;
        this.damage = 0;
        this.size = 1;
        this.currSize = this.size;
        this.direction = "right";
        this.sprites = [castle1, castle2]; 
        this.currentSprite = outpost;
        this.isBuilding = true;
        break;
      case "camp":
        this.x = x;
        this.y = y;
        this.speed = 0;
        this.atkspeed = 7000;
        this.range = 300;
        this.maxhp = 1000;
        this.health = this.maxhp;
        this.damage = 0;
        this.size = 1;
        this.currSize = this.size;
        this.direction = "right";
        this.sprites = [outpost]; 
        this.currentSprite = outpost;
        this.isBuilding = true;
        break;
    }
    this.targetX = this.x;
    this.targetY = this.y;
    this.targetAngle = 0;
    this.status = "none";
    this.startTime = millis();
  }
  
  //passive functions
  draw() {
    angleMode(DEGREES);
    
    //regular troops
    for(let i = 0; i < this.currSize && this.size > 1; i++) {
      image(this.currentSprite, this.x - 30 * cos((360 / this.size) * i) - 50, this.y - 10 * sin((360 / this.size) * i) - 50);   
    }
    //buildings and one troop units
    if(this.type == "camp" && this.health > 0) {
      image(this.currentSprite, this.x - 125,this.y - 60);  
    } else if(this.type == "castle" && this.health > 0) {
      if(this.team == "player") {
        image(castle2, this.x - 250,this.y - 150, 550, 300);
      } 
      if(this.team == "computer"){
        image(castle1, this.x - 250,this.y - 150, 600, 400);   
      }
    } else if(this.type == "trebuchet" && this.health > 0) {
      image(this.currentSprite, this.x - 150,this.y - 150);  
    } else if(this.size == 1){
      image(this.currentSprite, this.x - 50, this.y - 50);
    } 
    
    //shadow
    if(this.health > 0 && !this.isBuilding) {
      noStroke();
      fill(10,10,10,50);
      let s = 5; //corrects for poorly made sprites. my bad
      if(this.direction == "left" && this.type == "spearman") {
        s = -5;
      }
      ellipse(this.x - s,this.y + 50,120, 30);
    }
    
    //health bar
    if(this.health > 0 && this.health < this.maxhp) {
      strokeWeight(3);
      stroke(255,0,0,200);
      let s = 5; //corrects for poorly made sprites. my bad
      if(this.direction == "left" && this.type == "spearman") {
        s = -5;
      }
      line(this.x - 50 - s,this.y - 60, this.x + 50 - s, this.y - 60);
      stroke(0,255,50,200);
      line(this.x - 50 - s,this.y - 60, this.x - 50 + (100 * (this.health / this.maxhp)) - s, this.y - 60);
    }
    
  }
  
  move() {
    let x = this.targetX;
    let y = this.targetY;
    let angle = this.targetAngle;
    angleMode(RADIANS);
    
    
    //long if statement avoids river with chunky hitbox
    
    //right
    if(round(this.x) < x && abs(this.x - x) > 2) {
      this.direction = "right";
      
      if(this.x > 0 && this.x + this.speed < 790) {
        if(this.y < 1060 || this.y> 1265) {
          this.x +=  (cos(angle) * this.speed);
        }
      } else if(this.x + this.speed >= 790 && this.x + this.speed <= 1090) {//bridge1
        if(this.y < 985 || this.y > 1190 || bridge1) {
          this.x +=  (cos(angle) * this.speed);
        }
      } else  if(this.x + this.speed> 1090 && this.x + this.speed <= 1735) {
        if(this.y  < 835 || this.y  > 1080) {
          this.x +=  (cos(angle) * this.speed);
        }
      } else if(this.x  + this.speed> 1715 && this.x + this.speed <= 2475) {
        if(this.y < 650 || this.y > 815) {
          this.x +=  (cos(angle) * this.speed);
        }
      } else  if(this.x + this.speed>= 2475 && this.x + this.speed <= 2740) { // bridge2
        if(this.y < 610 || this.y > 815 || bridge2) {
          this.x +=  (cos(angle) * this.speed);
        }
      } else if(this.x + this.speed >= 2740 && this.x + this.speed<= 3000) {
        if(this.y < 460 || this.y  > 665) {
          this.x +=  (cos(angle) * this.speed);
        }
      }
    }
    
    //left
    if(round(this.x) > x && abs(this.x - x) > 2) {
      this.direction = "left";
      
      if(this.x > 0 - this.speed && this.x - this.speed < 790) {
        if(this.y < 1060 || this.y> 1265) {
          this.x -=  (cos(angle) * this.speed);
        }
      } else if(this.x >= 790 - this.speed && this.x - this.speed <= 1090) {//bridge1
        if(this.y < 985 || this.y > 1190 || bridge1) {
          this.x -=  (cos(angle) * this.speed);
        }
      } else  if(this.x - this.speed > 1090 && this.x - this.speed<= 1735) {
        if(this.y  < 835 || this.y  > 1080) {
          this.x -=  (cos(angle) * this.speed);
        }
        
      } else if(this.x - this.speed > 1715 && this.x - this.speed<= 2475) {
        if(this.y < 650 || this.y > 815) {
          this.x -=  (cos(angle) * this.speed);
        }
      } else  if(this.x - this.speed >= 2475 && this.x - this.speed <= 2740) { // bridge2
        if(this.y < 610 || this.y > 815 || bridge2) {
          this.x -=  (cos(angle) * this.speed);
        }
      } else if(this.x - this.speed >= 2740 && this.x - this.speed<= 3000) {
        if(this.y < 460 || this.y  > 665) {
          this.x -=  (cos(angle) * this.speed);
        }
      }
    }
    
    //down
    if(round(this.y) < y && abs(this.y - y) > 2) {
      if(this.x > 0 && this.x < 790) {
        if(this.y + this.speed < 1050 || this.y > 1275) {
          this.y +=  (sin(angle) * this.speed);
        } else {
          this.y -= 1;
        }
      } else if(this.x >= 790 && this.x < 1090) {//bridge1
        if(this.y + this.speed < 975 || this.y > 1190 || bridge1) {
          this.y +=  (sin(angle) * this.speed);
        } else {
          this.y -= 1;
        }
      } else  if(this.x > 1090 && this.x < 1725) {
        if(this.y + this.speed< 825 || this.y > 1080) {
          this.y +=  (sin(angle) * this.speed);
        } else {
          this.y -= 1;
        }
      } else if(this.x > 1500 && this.x < 2000) {
        if(this.y + this.speed< 700 || this.y > 950) {
          this.y +=  (sin(angle) * this.speed);
        } else {
          this.y -= 1;
        }
      } else if(this.x > 1725 && this.x < 2475) {
        if(this.y + this.speed< 640 || this.y > 815) {
          this.y +=  (sin(angle) * this.speed);
        } else {
          this.y -= 1;
        }
      } else  if(this.x >= 2475 && this.x < 2740) { // bridge2
        if(this.y + this.speed < 600 || this.y > 815 || bridge2) {
          this.y +=  (sin(angle) * this.speed);
        } else {
          this.y -= 1;
        }
      } else if(this.x >= 2740 && this.x < 3000) {
        if(this.y + this.speed < 450 || this.y > 665) {
          this.y +=  (sin(angle) * this.speed);
        } else {
          this.y -= 1;
        }
      }
    }
    
    //up
    if(round(this.y) > y && abs(this.y - y) > 2) {
      if(this.x > 0 && this.x < 790) {
        if(this.y < 1050 || this.y - this.speed > 1275) {
          this.y +=  (sin(angle) * this.speed);
        } else {
          this.y += 1;
        }
      } else if(this.x >= 790 && this.x < 1090) {//bridge1
        if(this.y < 985 || this.y - this.speed > 1200 || bridge1) {
          this.y +=  (sin(angle) * this.speed);
        } else {
          this.y += 1;
        }
      } else  if(this.x > 1090 && this.x < 1725) {
        if(this.y < 835 || this.y - this.speed > 1090) {
          this.y +=  (sin(angle) * this.speed);
        } else {
          this.y += 1;
        }
      } else if(this.x > 1500 && this.x < 2000) {
        if(this.y + this.speed< 700 || this.y > 950) {
          this.y +=  (sin(angle) * this.speed);
        } else {
          this.y += 1;
        }
      }  else if(this.x > 1725 && this.x < 2475) {
        if(this.y < 650 || this.y - this.speed > 825) {
          this.y +=  (sin(angle) * this.speed);
        } else {
          this.y += 1;
        }
      } else  if(this.x >= 2475 && this.x < 2740) { // bridge2
        if(this.y < 610 || this.y - this.speed> 825 || bridge2) {
          this.y +=  (sin(angle) * this.speed);
        } else {
          this.y += 1;
        }
      } else if(this.x >= 2740 && this.x < 3000) {
        if(this.y < 460 || this.y - this.speed > 675) {
          this.y +=  (sin(angle) * this.speed);
        } else {
          this.y += 1;
        }
      }
    }
  } 
  update(state) {
    
    if(!this.isBuilding) {
      this.currSize = ceil((this.health/this.maxhp) * this.size);
    
      if(state == "normal") {
        if(this.direction ==  "right") {
          this.currentSprite = this.sprites[2];
        }
        if(this.direction == "left") {
          this.currentSprite = this.sprites[0];
        } 
      }
      if(state == "fight") {
        if(this.direction == "right") {
          this.currentSprite = this.sprites[3];
      }
       if(this.direction == "left") {
        this.currentSprite = this.sprites[1];
      } 
    }
    }
    
  }
  
  //commands
  target(x,y) {
    if(!this.isBuilding) {
      angleMode(RADIANS);
      this.update("normal");
      this.targetX = x;
      this.targetY = y;
      this.targetAngle = atan((y - this.y)/abs(x - this.x)); 
    }
  }
  
}

class BUILDING {
  constructor(type, pic, x, y) {
    this.type = type;
    
    this.pic = pic
    
    this.x = x + 100;
    this.y = y + 100;
    this.status = "off";
  }
  
  draw() {
    image(this.pic, this.x - 100, this.y - 100);
  }
}

//demos
let demo1;
let demo2;
let demo3;


//player
let pUnits = [];

//computer
let cUnits = [];

let buildings = [];
let buildingStatus = [];


function setup() {
  
  time = millis();
  textFont(font);
  createCanvas(3000, 1800);
  angleMode(RADIANS);
  
  //demo
  bridge1 = false;
  bridge2 = false;
}

function draw() {
  
  background(220);
  image(backgroundImg, 0, 0, 3000, 1800);
  if(!bridge1) {
    image(brokenb2,0,0,3000,1800);
  }
  if(!bridge2) {
    image(brokenb1,0,0,3000,1800);
  }
  
  if(start == 0) {
    menu = "start";
  }
  
  if(start == 4) {
    textSize(200);
    fill(255);
    stroke(0);
    textAlign(CENTER);
    text("You Win!", 1500, 1000);
  }
  
  if(start == 5) {
    textSize(200);
    fill(255);
    stroke(0);
    textAlign(CENTER);
    text("You Lose!", 1500, 1000);
  }
  
  //buildingstart
  if(buildings.length == 0) {
    buildings.push(new BUILDING("mine", mine1, 550, 1450));
    buildings.push(new BUILDING("mine", mine2, 1750, 50));
    buildings.push(new BUILDING("lumber", lumber, 1500, 1550));
    buildings.push(new BUILDING("lumber",lumber, 2700, 50));
    buildings.push(new BUILDING("barn", barn, 2000, 900));
    buildings.push(new BUILDING("barn", barn, 1300, 600)); 
  }
  
 //start
  if(pUnits.length == 0 && start > 0) {
    cUnits.push(new Unit("castle", "computer", 470,75));
    pUnits.push(new Unit("castle", "player", 2700, 1650));    
    
  }
  buildingStatus = [0,0,0,0,0,0];
  
  for(let i = 0; i < 6; i++) {
    buildings[i].draw();
  }
  
  
  //comp loop
  let cUnitLength = cUnits.length;
  for(let i = 0; i < cUnitLength; i++) {
    
    cUnits[i].draw();
    cUnits[i].move(); 
    
    cminerals += 0.001 * start;
    clumber += 0.001 * start;
    cfood += 0.001 * start;
    
    if(cUnits[i].startTime + (cUnits[i].atkspeed / 2) < millis() && !cUnits[i].isBuilding) {
      cUnits[i].update("normal"); 
    }
    
    if(cUnits[i].startTime + cUnits[i].atkspeed < millis()) {
      let c = checkClosestPlayer(i);
      if(c != -1) {
        if(pUnits[c].health > 0) {
          attack("computer", i, c);
          cUnits[i].update("fight"); 
        }
      }
      if(cUnits[i].type == "laborer") {
        //reap rewards
        
        for(let j = 0; j < 6; j++) {
          if(sqrt(pow(abs(cUnits[i].x - buildings[j].x), 2) + pow(abs(cUnits[i].y - buildings[j].y), 2)) <= 250) {
            buildingStatus[j] += 1;
            cUnits[i].status = "working";
            switch(buildings[j].type) {
              case "mine":
                cminerals += cUnits[i].currSize * 6;
                break;
              case "lumber":
                clumber += cUnits[i].currSize * 6;
                break;
              case "barn":
                cfood += cUnits[i].currSize * 6;
                break;
            }
            j = 6;
          } else {
            cUnits[i].status = "none";
          }
        }
      }
      
      if(start > 0 && (cUnits[i].type == "castle" || cUnits[i].type == "camp")) {
        makeTroops(i); 
        if(cUnits[i].atkspeed > 3000) {
          cUnits[i].atkspeed -= 10; 
        }
      }
      
      cUnits[i].startTime = millis();
    }
    
    
    if(cUnits[i].health <= 0) {
      if(cUnits[i].type == "castle") {
        start = 4;
      }
      cUnits.splice(i,1);
      i = i + 1;
    }
    cUnitLength = cUnits.length;
  }
  
  //player loop
  let pUnitLength = pUnits.length;
  for(let i = 0; i < pUnitLength; i++) {
        
    pUnits[i].draw();
    pUnits[i].move(); 
    
    pminerals += 0.001;
    plumber += 0.001;
    pfood += 0.001;
  
    
    if(pUnits[i].startTime + 1000 < millis() && !pUnits[i].isBuilding) {
      pUnits[i].update("normal"); 
    }
    
    if(pUnits[i].startTime + pUnits[i].atkspeed < millis()) {
      let c = checkClosestEnemy(i);
      if(c != -1) {
        if(cUnits[c].health > 0) {
          attack("player", i, c);
          pUnits[i].update("fight"); 
        }
      }
      
      if(pUnits[i].type == "laborer") {
        //reap rewards
        for(let j = 0; j < 6; j++) {
          if(sqrt(pow(abs(pUnits[i].x - buildings[j].x), 2) + pow(abs(pUnits[i].y - buildings[j].y), 2)) <= 250) {
            buildingStatus[j] += 1;
            switch(buildings[j].type) {
              case "mine":
                pminerals += pUnits[i].currSize * 2;
                break;
              case "lumber":
                plumber += pUnits[i].currSize * 2;
                break;
              case "barn":
                pfood += pUnits[i].currSize * 2;
                break;
            }
            j = 6;
          }
        }
        
    }
      
      pUnits[i].startTime = millis();
    }
    
    
    if(pUnits[i].health <= 0) {
      if(pUnits[i].type == "castle") {
        start = 5;
      }
      pUnits.splice(i,1);
      i = i + 1;
    }
    pUnitLength = pUnits.length;
  }
    
  for(let j = 0; j < 6; j++) {
    if(buildingStatus[j] > 0) {
      buildings[j].status = "on";
    } else {
      buildings[j].status = "off";
    }
  }
  
  //comp ai orders
  if(start > 0 && time + 6000 - (start * 1000) < millis()) {
    order();
    time = millis();
  }
  
  
  leftMenu();
  openMenu(menu);
  
    
  //player select unit
  if(selected != -1 && selected < pUnits.length)  {
    stroke(255,0,0);
    fill(255,0,0,20);
    circle(pUnits[selected].x - 5, pUnits[selected].y, pUnits[selected].range);
    selectedSprite = pUnits[selected].sprites[0];
  }
  if(click && mouseX > 450) {
    if(selected == -1) {
      for(let i = 0; i < pUnits.length; i++) {
        if(abs(mouseX - pUnits[i].x) <= 50 && abs(mouseY - pUnits[i].y) <= 50) {
          selected = i;
        }  
      }  
    } else if(selected < pUnits.length) {
      pUnits[selected].target(mouseX,mouseY);
      selected = -1;
      selectedSprite = null;
    } else {
      selected = -1;
    }
    click = false;
  }
  
  
  
  //folliage
  for(let i = 0; i < 6; i++) {
      treeClumps(1650 - 200 * cos((12) * i), 1675 - 100 * sin((12) * i), 4 + (i % 2)); 
  }
  treeClumps(1350, 1750, 6);
  treeClumps(1950, 1750, 6);
  //folliage
  for(let i = 0; i < 7; i++) {
      treeClumps(2850 - 200 * cos((12) * -i), 125 - 100 * sin((12) * -i), 4 + (i % 2)); 
  }
  treeClumps(2550,50, 6);
  treeClumps(2950,300, 6);
}










//COMBAT

//IS CLOSEST IN RANGE? Player
function checkClosestEnemy(troop) {
  let range = 1000;
  let closest = -1;
  
  for(let i = 0; i < cUnits.length; i++) {
    
    if(i >= cUnits.length) {
      return -1;
    }
    
    if(sqrt(pow(abs(pUnits[troop].x - cUnits[i].x), 2) + pow(abs(pUnits[troop].y - cUnits[i].y), 2)) <= range) {
      range = sqrt(pow(abs(pUnits[troop].x - cUnits[i].x), 2) + pow(abs(pUnits[troop].y - cUnits[i].y), 2));
      closest = i;
    } 
    
    if(cUnits[i].type == "castle" && pUnits[troop].type == "trebuchet" && sqrt(pow(abs(pUnits[troop].x - cUnits[i].x), 2) + pow(abs(pUnits[troop].y - cUnits[i].y), 2)) <= pUnits[troop].range) {
      return i;
    }
  }
  if(range <= pUnits[troop].range - 100) {
    return closest;
  } else {
    return -1;
  }
}

//IS CLOSEST IN RANGE? Comp
function checkClosestPlayer(troop) {
  let range = 1000;
  let closest = -1;
  for(let i = 0; i < pUnits.length; i++) {
    
    if(i >= pUnits.length) {
      return -1;
    }
    
    if(sqrt(pow(abs(cUnits[troop].x - pUnits[i].x), 2) + pow(abs(cUnits[troop].y - pUnits[i].y), 2)) <= range) {
      range = sqrt(pow(abs(cUnits[troop].x - pUnits[i].x), 2) + pow(abs(cUnits[troop].y - pUnits[i].y), 2));
      closest = i;
    }
    
    if(pUnits[i].type == "castle" && cUnits[troop].type == "trebuchet" && sqrt(pow(abs(cUnits[troop].x - pUnits[i].x), 2) + pow(abs(cUnits[troop].y - pUnits[i].y), 2)) <= cUnits[troop].range) {
      return i;
    }
  }
  if(range <= cUnits[troop].range - 100) {
    return closest;
  } else {
    return -1;
  }
}

//ATTACK AND DAMAGE general
function attack(attacker, troopatk, troopdef) {
  if(attacker == "player" && pUnits[troopatk].health > 0) {
    cUnits[troopdef].health -= pUnits[troopatk].damage * pUnits[troopatk].currSize;
  }
  if(attacker == "computer" && cUnits[troopatk].health > 0) {
    pUnits[troopdef].health -= cUnits[troopatk].damage * cUnits[troopatk].currSize;
  }
}


//FIND CLOSEST WITHIN DISTANCE
function findClosestPlayer(troop, distance) {
  let range = distance;
  let closest = -1;
  for(let i = 0; i < pUnits.length; i++) {
    
    if(sqrt(pow(abs(cUnits[troop].x - pUnits[i].x), 2) + pow(abs(cUnits[troop].y - pUnits[i].y), 2)) <= range) {
      range = sqrt(pow(abs(cUnits[troop].x - pUnits[i].x), 2) + pow(abs(cUnits[troop].y - pUnits[i].y), 2));
      closest = i;
    }
  }
  
  if(closest < pUnits.length) {
    return closest; 
  } else {
    return 0;
  }
}










//ORDERS (AI)

function order() {
  
  for(let i = 0; i < cUnits.length; i++) {
    //cavalry orders
    if(cUnits[i].type == "cavalry") {
      
      //cavalry orders. capture and guard worksites
      
      if(findClosestPlayer(i, 500) == -1) { //finds no one
        
        if(!bridge1) {
          if(i % 3 == 0) {
            cUnits[i].target(buildings[3].x + i * 10, buildings[3].y);
          } else if(i % 3 == 1) {
            cUnits[i].target(buildings[1].x + i * 10, buildings[1].y);
          } else if(i % 3 == 2) {
            cUnits[i].target(buildings[5].x + i * 10, buildings[5].y);
          } else {
            cUnits[i].target(600 + 20 * i, 600 + 20 * i);
          }
            
        } else if(cUnits[i].x < 1000 && cUnits[i].y < 1200){ 
            cUnits[i].target(1000 + 20 * i, 1400 + 20 * i);
        } else if(cUnits[i].x > 2000 && cUnits[i].y < 800){ 
            cUnits[i].target(700 + 20 * i, 700 + 20 * i);
        } else if(cUnits[i].x < 1500 && cUnits[i].y > 1200) {
            cUnits[i].target(1600 + 20 * i, 1400 + 20 * i);
        } else if(cUnits[i].x >= 1500 && cUnits[i].y > 1200) {
          
        }
        
      } else if(findClosestPlayer(i, 500).type != "spearman" || findClosestPlayer(i, 500).type != "knights") {
          cUnits[i].target(pUnits[findClosestPlayer(i, 500)].x, pUnits[findClosestPlayer(i, 500)].y);
      }
    }
    
    
    //archer orders
     else if(cUnits[i].type == "archer") {
      
      //archer orders. guard bridges. slowly advance enemy. avoid cavalry and knights
      
      if(findClosestPlayer(i, 500) == -1) { //finds no one
        if(cUnits[i].x < 700 && cUnits[i].y < 700) {
          if(i % 2 == 0) {
            cUnits[i].target(800 + i * 20, 900);
          } else if(!bridge1|| bridge2) {
            cUnits[i].target(2400 + i * 20, 400);
          }
        } else {
          if(cUnits[i].x < 900 && cUnits[i].y < 1300 && bridge1) {
            cUnits[i].target(1000 + i * 20, 1400);
          }
          else if(cUnits[i].x > 2300 && cUnits[i].y < 900 && bridge2) {
            cUnits[i].target(2400 + i * 20, 1400);
          } else if(cUnits[i].y > 1300) {
            cUnits[i].target(2100 + i * 40, 1800 - i * 30);
          }
        }
        
      } else {
        
      }
    }
    
    //spearman orders
     else if(cUnits[i].type == "spearman") {
      
      //archer orders. guard bridges. slowly advance enemy. avoid cavalry and knights
      
      if(findClosestPlayer(i, 500) == -1) { //finds no one
        
        if(numOfTroops("trebuchet", cUnits) > 0) {
          if((cUnits[i].y < 900 && cUnits[i].x < 900) && bridge1) {
          
            cUnits[i].target(1000, 1400);
          
          } else if((cUnits[i].y < 500 && cUnits[i].x > 2500) && bridge2) {
          
            cUnits[i].target(2700, 1400);
          
          } else if(cUnits[i].y > 1200) {
            cUnits[i].target(2700, 1400 + i);
          }
        }
        else if(cUnits[i].x < 700 && cUnits[i].y < 400) {
          
          if(i % 2 == 0) {
             cUnits[i].target(800 + i * 20, 900 + i * 10);
          } else if(!bridge1 || bridge2){
             cUnits[i].target(2700 + i * 20, 400 + i * 10);
          } else {
            cUnits[i].target(800 + i * 10, 900 + i * 10);
          }
          
          
        }
      } else {
        if(findClosestPlayer(i, 500).type != "archers" || findClosestPlayer(i, 500).type != "cannons") {
          cUnits[i].target(pUnits[findClosestPlayer(i, 700)].x, pUnits[findClosestPlayer(i, 700)].y);
        }
      }
    }
    
    //laborer orders
     else if(cUnits[i].type == "laborer") {
      //work on own side, then work enemy if empty
      if(findClosestPlayer(i, 200) == -1) { //finds no one
        
        if(cUnits[i].y > 800) {
            cminerals -= 200;
            bridge1 = true;
        }
        
        if(buildings[3].status == "off" && cUnits[i].status != "working" && i % 3 == 0) {
          cUnits[i].target(buildings[3].x, buildings[3].y);
        } else if(buildings[1].status == "off" && cUnits[i].status != "working" && i % 3 == 1) {
          cUnits[i].target(buildings[1].x, buildings[1].y);
        } else if(buildings[5].status == "off" && cUnits[i].status != "working" && i % 3 == 2) {
          cUnits[i].target(buildings[5].x, buildings[5].y);
        } 
        
        
        if(!bridge1 &&  i % 3 == 2 && cUnits.length > 10) {
          cUnits[i].target(875,910);
        } 
        
      } else if(cUnits[i].status != "working"){
        cUnits[i].target(600, 600);
      }
    }
    
    //knight orders
    else if(cUnits[i].type == "knight") {
      
      //guard shit
      
      if(findClosestPlayer(i, 500) == -1) { //finds no one
        
        if(numOfTroops("trebuchet", cUnits) > 0) {
          if((cUnits[i].y < 900 && cUnits[i].x < 900) && bridge1) {
          
            cUnits[i].target(1000, 1400);
          
          } else if((cUnits[i].y < 500 && cUnits[i].x > 2500) && bridge2) {
          
            cUnits[i].target(2700, 1400);
          
          } else if(cUnits[i].y > 1200) {
            cUnits[i].target(2700, 1400 + 20 * i);
          }
        }
        else if(cUnits[i].x < 600 && cUnits[i].y < 600) {
          
          if(i % 2 == 0) {
             cUnits[i].target(800 + i * 10, 900 + i * 10);
          } else if(!bridge1 || bridge2){
             cUnits[i].target(2700 + i * 20, 400 + i * 10);
          } else {
            cUnits[i].target(800 + i * 10, 900 + i * 10);
          }
          
        }
      } else {
        if(findClosestPlayer(i, 500).type != "archers" || findClosestPlayer(i, 500).type != "cannons") {
          cUnits[i].target(pUnits[findClosestPlayer(i, 500)].x, pUnits[findClosestPlayer(i, 500)].y);
        }
      }
    }
    
    //cannon orders
    else if(cUnits[i].type == "cannon") {
    //acan    
      cUnits[i].target(800 + i * 30, 400 - i * 20);

    }
    
    //trebuchet orders
     else if(cUnits[i].type == "trebuchet") {
      
      //seige
      
      if(cUnits[i].y < 1200) {
        cUnits[i].target(1100, 1400);
      } else {
        cUnits[i].target(2300, 1600);
      }
    }   
  }
}

function makeTroops(camp) {
  let r = random(0, 100);
  
  if(buy("trebuchet", "computer") || (cUnits.length > 25 && numOfTroops("trebuchet", cUnits) < 1)) {
    spawn("computer", camp, "trebuchet");
  }
  
  if(numOfTroops("laborer", cUnits) < 6) {
    spawn("computer", camp, "laborer");
  } else if(r < 10) {
    if(buy("cannon", "computer") && cminerals > 400) {
      spawn("computer", camp, "cannon");
    } else if(buy("spearman", "computer")) {
      spawn("computer", camp, "spearman");
    }
  } else if(r < 20) {
    if(buy("knight", "computer")) {
      spawn("computer", camp, "knight");
    }
  } else if(r < 40) {
    if(buy("spearman", "computer")) {
      spawn("computer", camp, "spearman");
    }
  } else if(r < 60) {
    if(buy("archer", "computer")) {
      spawn("computer", camp, "archer");
    }
  } else if(r < 80) {
    if(buy("cavalry", "computer")) {
      spawn("computer", camp, "cavalry");
    }
  } else {
    if(buy("spearman", "computer")) {
      spawn("computer", camp, "spearman");
    }
  }
}














//TROOP ACQUISITION

//PURCHASE UNITS
function buy(type, team) {
  
  if(team == "player") {
    
    switch(type) {
      case "archer":
        if(pfood >= 25 && pminerals >= 10 && plumber >= 25) {
          pfood -= 25;
          pminerals -= 10;
          plumber -= 25;
          return true;
        }
        return false;
        break;
      case "cavalry":
        if(pfood >= 40 && pminerals >= 10 && plumber >= 10) {
          pfood -= 35;
          pminerals -= 10;
          plumber -= 10;
          return true;
        }
        return false;
        break;
      case "spearman":
        if(pfood >= 20 && pminerals >= 15 && plumber >= 15) {
          pfood -= 20;
          pminerals -= 15;
          plumber -= 15;
          return true;
        }
        return false;
        break;
      case "laborer":
        if(pfood >= 25 && pminerals >= 0 && plumber >= 0) {
          pfood -= 20;
          pminerals -= 0;
          plumber -= 0;
          return true;
        }
        return false;
        break;
      case "knight":
        if(pfood >= 30 && pminerals >= 50 && plumber >= 10) {
          pfood -= 30;
          pminerals -= 50;
          plumber -= 10;
          return true;
        }
        return false;
        break;
      case "cannon":
        if(pfood >= 0 && pminerals >= 200 && plumber >= 30) {
          pfood -= 0;
          pminerals -= 200;
          plumber -= 30;
          return true;
        }
        return false;
        break;
      case "trebuchet":
        if(pfood >= 0 && pminerals >= 100 && plumber >= 400) {
          pfood -= 0;
          pminerals -= 100;
          plumber -= 400;
          return true;
        }
        return false;
        break;
    }
  }
  
  if(team == "computer") {
    switch(type) {
      case "archer":
        if(cfood >= 25 && cminerals >= 10 && clumber >= 25) {
          cfood -= 25;
          cminerals -= 10;
          clumber -= 25;
          return true;
        }
        return false;
        break;
      case "cavalry":
        if(cfood >= 40 && cminerals >= 10 && clumber >= 10) {
          cfood -= 35;
          cminerals -= 10;
          clumber -= 10;
          return true;
        }
        return false;
        break;
      case "spearman":
        if(cfood >= 20 && cminerals >= 15 && clumber >= 15) {
          cfood -= 20;
          cminerals -= 15;
          clumber -= 15;
          return true;
        }
        return false;
        break;
      case "laborer":
        if(cfood >= 25 && cminerals >= 0 && clumber >= 0) {
          cfood -= 25;
          cminerals -= 0;
          clumber -= 0;
          return true;
        }
        return false;
        break;
      case "knight":
        if(cfood >= 30 && cminerals >= 50 && clumber >= 10) {
          cfood -= 30;
          cminerals -= 50;
          clumber -= 10;
          return true;
        }
        return false;
        break;
      case "cannon":
        if(cfood >= 0 && cminerals >= 200 && clumber >= 30) {
          cfood -= 0;
          cminerals -= 200;
          clumber -= 30;
          return true;
        }
        return false;
        break;
      case "trebuchet":
        if(cfood >= 0 && cminerals >= 100 && clumber >= 400) {
          cfood -= 0;
          cminerals -= 100;
          clumber -= 400;
          return true;
        }
        return false;
        break;
    }
  }
}

//PLACE NEW UNITS
function spawn(team, camp, type) {
  let x;
  let y;
  
  if(team == "player") {
    x = pUnits[camp].x;
    y = pUnits[camp].y;
    
    if(pUnits[camp].type == "castle") {
      x = x - 150;
      y = y - 100;
    } 
    
    pUnits.push(new Unit(type, team, x, y));
  }
  
  if(team == "computer") {
    x = cUnits[camp].x;
    y = cUnits[camp].y;
    
    if(cUnits[camp].type == "castle") {
      x = x + 155;
      y = y + 105;
    } 
    
    cUnits.push(new Unit(type, team, x, y));
  }
}




















//MENUS, BUTTONS, AND SMALL UTLITIES

//middle screen menu
function openMenu(m) {
  
  //general menu display settings
  if(m != "none") {
    fill(60,40,40,180);
    strokeWeight(5);
    stroke(60,20,20,180);
    rect(790, 300, 1800, 1050);
    fill(150);
    stroke(180);
    
    if(m != "start")
    button("Close Menu", "", "none", 2240, 1200);
    
  }
  
  if(m == "camp") {
    textAlign(CENTER);
    textSize(80);
    noStroke();
    fill(200);
    text("Train Troops", 1700, 410);
    
    tButton("SPEARMAN: \n20 food, 15 minerals, 15 lumber", spearmanL1, "spearman", 825, 525);
    tButton("CAVALRY: \n40 food, 10 minerals, 10 lumber", cavalryL1, "cavalry", 825, 720);
    tButton("ARCHER: \n25 food, 10 minerals, 25 lumber", archerL1, "archer", 825, 915);
    tButton("LABORER: \n25 food, 0 minerals, 0 lumber", laborerL, "laborer", 1720, 525);
  }
  
  if(m == "castle") {
    textAlign(CENTER);
    textSize(80);
    noStroke();
    fill(200);
    text("Purchase Units", 1700, 410);
    
    tButton("SPEARMAN: \n20 food, 15 minerals, 15 lumber", spearmanL1, "spearman", 825, 525);
    tButton("CAVALRY: \n40 food, 10 minerals, 10 lumber", cavalryL1, "cavalry", 825, 720);
    tButton("ARCHER: \n25 food, 10 minerals, 25 lumber", archerL1, "archer", 825, 915);
    tButton("KNIGHT: \n30 food, 50 minerals, 10 lumber", blackknightL1, "knight", 825, 1110);
    tButton("LABORER: \n25 food, 0 minerals, 0 lumber", laborerL, "laborer", 1720, 525);
    tButton("CANNON: \n0 food, 200 minerals, 30 lumber", cannonL1, "cannon", 1720, 720);
    tButton("TREBUCHET: \n0 food, 100 minerals, 400 lumber", trebucheL1, "trebuchet", 1720, 915);
  }
  
  if(m == "start") {
    textAlign(CENTER);
    textSize(80);
    noStroke();
    fill(200);
    text("Battle For Le Fleuve", 1700, 410);
    
    textSize(50);
    noStroke();
    fill(200);
    text("Battle for control of the land of Le Fleuve. \nEnlist various troops to gain the advantage over your openent.\nUtilize laborers to harvest the land and obtain its resources from locations around the map.\nUse seige weapons to overtake your opponent's castle and be victorious!!\nTap your castle (bottom right) to begin...", 1700, 600);
    
    button("Easy", "", "1", 1250, 1000);
    button("Medium", "", "2", 1550, 1000);
    button("Hard", "", "3", 1850, 1000);
    
    
  }
}

//left hand menu
function leftMenu() {
  //menu
  fill(60,20,20,150);
  strokeWeight(5);
  stroke(60,20,20,150);
  rect(-10,-10, 450, 2250);
  strokeWeight(5);
  stroke(60,20,20,150);
  rect(30,30,370,250);
  rect(75,300,280,280);
  rect(75,600,280,75);
  textAlign(LEFT);
  textSize(38);
  fill(200);
  noStroke();
  text("Food:                 " + floor(pfood) + "\n\nMinerals:            " + floor(pminerals) + "\n\nLumber:              " + floor(plumber), 45, 75); 
  
  //icon
  if(selectedSprite != null && selected >= 0 && selected < pUnits.length) {
    if(pUnits[selected].type == "castle") {
      image(castle1, 75, 300, 280,280);
    } else {
      image(selectedSprite, 75, 300, 280,280);
    }
    textAlign(CENTER);
    textSize(50);
    fill(200);
    noStroke();
    textStyle(BOLD);
    text(pUnits[selected].type, 215, 650); 
  }
  
  //MENUS
  textSize(40);
  noStroke();
  fill(200);
  textAlign(CENTER);
  
  text("To select a troop\nclick on it.\n\nTo move it,\nclick the desired\nlocation.", 215, 800);
  
  //camp menu
  if(selected != -1 && selected < pUnits.length && pUnits[selected].type == "camp") {
    button("Train", "", "camp", 75, 1500);
  }
  
  //castle menu
  if(selected != -1 && selected < pUnits.length && pUnits[selected].type == "castle") {
    button("But Units", "", "castle", 75, 1500);
  }
  
  //laborer options
  if(selected != -1 && selected < pUnits.length && pUnits[selected].type == "laborer") {
    button("Build Camp", "200 lumber", "buildcamp", 75, 1500);
    
    if(selected != -1 && pUnits[selected].x > 850 && pUnits[selected].x < 1200 && pUnits[selected].y > 1000  &&  pUnits[selected].y < 1350) {
      button("Build Bridge", "200 minerals", "buildbridge1", 75, 1650, 200,110);
    }
    if(selected != -1 && pUnits[selected].x > 2500 && pUnits[selected].x < 2750 && pUnits[selected].y > 800  &&  pUnits[selected].y < 900) {
      button("Build Bridge", "200 minerals", "buildbridge2", 75, 1650, 200,110);
    }
  }
}

function button(toptext, subtext, action, bx, by) {
  fill(150);
  stroke(180);
  rect(bx, by, 280, 110);
  textSize(50);
  textAlign(CENTER);
  fill(0);
  text(toptext, bx + 135, by + 70); 
  textSize(25);
  text(subtext, bx + 135, by + 95);
    
  //activate
  if(click && mouseX > bx && mouseX < bx + 280 && mouseY > by && mouseY < by + 110) {
    
    if(action == "buildbridge1") {
      if(pminerals >= 200) {
        pminerals -= 200;
        bridge1 = true;
      }
    } else if(action == "buildbridge2") {
      if(pminerals >= 200) {
        pminerals -= 200;
        bridge2 = true;
      }
    } else if(action == "buildcamp") {
      plumber -= 200;
      pUnits.unshift(new Unit("camp", "player", pUnits[selected].x, pUnits[selected].y));
      action == "none";
      selected = -1;
      selectedSprite = null;
    }  else if(action == "1") {
      start = 1;
      menu = "none";
    }  else if(action == "2") {
      start = 2;
      menu = "none";
    }  else if(action == "3") {
      start = 3;
      menu = "none";
    } else {
      menu = action;
      activep = selected; 
    }
    
    
  }
}

function tButton(btext, sprite, unit, bx, by) {
  fill(150);
  stroke(180);
  rect(bx, by, 825, 180);
  textAlign(LEFT);
  textSize(50);
  fill(0);
  text(btext, bx + 185, by + 75); 
  image(sprite, bx, by + 5, 150, 150);
  
  if(click) {
    if(mouseX > bx && mouseX < bx + 825 && mouseY > by && mouseY < by + 180) {
      if(buy(unit, "player")) {
          spawn("player", activep, unit);
        }
    } 
  }
}

function numOfTroops(type, team) {
  let num = 0;
  for(let i = 0; i < team.length; i++) {
    if(team[i].type == type) {
      num++;
    }
  }
  return num;
}



function treeClumps(x, y, n) {
  for(let i = 0; i < n && n > 1; i++) {
      image(tree, x - 40 * cos((360 / n) * i) - 50, y - 40 * sin((360 / n) * i) - 50);   
  }
}

function mouseClicked() {
  click = true;
}

