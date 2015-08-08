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
    this.framerate = 20;

    var ship = this;
    this.addEventListener("tick", function(){
      ship.receiveInput();
    });
  };

  var proto = createjs.extend(Ship, createjs.Sprite);

  Ship.prototype.receiveInput = function(){
    var inputs = key.getPressedKeyCodes();
    this.handleMovement(inputs);
    this.handleDisplay(inputs);
  };

  Ship.prototype.handleMovement = function(inputs){
    if(!(inputs.indexOf(87) == -1) && this.y > 316){ this.y -=4; }; //W
    if(!(inputs.indexOf(83) == -1) && this.y < this.stage.height){ this.y +=4; }; //S
    if(!(inputs.indexOf(65) == -1) && this.x > 16){ this.x -=4; }; //A
    if(!(inputs.indexOf(68) == -1) && this.x < this.stage.width - 16){ this.x +=4; }; //D
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
