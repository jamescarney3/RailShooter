(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  var shipSpriteSheet = new createjs.SpriteSheet({
    images: ["assets/ship.png"],
    frames: {width: 32, height: 32, regX: 16, regY: 16},
    animations: {
      idle: [0]
    }
  });

  Ship = RailShooter.Ship = function(options){
    this.Sprite_constructor(shipSpriteSheet);
    this.x = options.x;
    this.y = options.y;
    this.game = options.game;
    this.framerate = 20;

    this.bulletSide = "left";
    this.reloadTimer = 0;

    var ship = this;
    this.addEventListener("tick", function(){
      if(!ship.disabled){
        ship.receiveInput();
      };
    });
  };

  var proto = createjs.extend(Ship, createjs.Sprite);

  Ship.prototype.isHitAt = function(x, y){
    if(x > this.x - 12 && x < this.x + 12 && y > this.y - 12 && y < this.y +12){
      return true;
    }else{
      return false;
    };
  };

  Ship.prototype.blowUp = function(){
    this.disabled = true;
    this.game.lives -= 1;
    var explosion = new RailShooter.ExplosionMedium({
      x: this.x,
      y: this.y,
      wreck: this
    });
    this.getStage().addChild(explosion);
  };

  Ship.prototype.remove = function(){
    this.game.removeShip();
  };

  Ship.prototype.receiveInput = function(){
    var inputs = key.getPressedKeyCodes();
    this.handleMovement(inputs);
    this.handleDisplay(inputs);
    this.handleMainTrigger(inputs);
  };

  Ship.prototype.handleMainTrigger = function(inputs){
    if(!(inputs.indexOf(32) == -1) && this.reloadTimer == 0){
      this.fireMainGun();
      this.reloadTimer = 3;
    }else if(inputs.indexOf(32) == -1 && this.reloadTimer > 0){
      this.reloadTimer -= 1;
    };

    // THIS IS MAXIMUM BULLET HOSING:
    // if(this.reloadTimer == 0){
    //   this.fireMainGun();
    //   this.reloadTimer = 3;
    // }else{
    //   this.reloadTimer -= 1;
    // };
  };

  Ship.prototype.fireMainGun = function(){
    if(this.bulletSide == "left"){
      this.game.addShipBullet(this.x - 13, this.y - 16);
      this.bulletSide = "right";
    }else{
      this.game.addShipBullet(this.x + 13, this.y - 16);
      this.bulletSide = "left";
    }
  };

  Ship.prototype.handleMovement = function(inputs){
    if(!(inputs.indexOf(87) == -1) && this.y > 316){ this.y -=6; }; //W
    if(!(inputs.indexOf(83) == -1) && this.y < this.stage.height){ this.y +=6; }; //S
    if(!(inputs.indexOf(65) == -1) && this.x > 16){ this.x -=6; }; //A
    if(!(inputs.indexOf(68) == -1) && this.x < this.stage.width - 16){ this.x +=6; }; //D
  };

  Ship.prototype.handleDisplay = function(inputs){
    this.gotoAndStop(0);
    this.scaleX = 1;
    if(!(inputs.indexOf(87) == -1) && inputs.indexOf(83) == -1){
      this.gotoAndStop(1);
    };
    if(!(inputs.indexOf(65) == -1) && inputs.indexOf(68) == -1){
      if(!(inputs.indexOf(87) == -1)){
        this.gotoAndStop(3);
      }else{
        this.gotoAndStop(2);
      };
    };
    if(!(inputs.indexOf(68) == -1) && inputs.indexOf(65) == -1){
      if(!(inputs.indexOf(87) == -1)){
        this.gotoAndStop(3);
        this.scaleX = -1;
      }else{
        this.gotoAndStop(2);
        this.scaleX = -1;
      };
    };
  };

  RailShooter.Ship = createjs.promote(Ship, "Sprite");

})()
