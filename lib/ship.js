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
  };

  var proto = createjs.extend(Ship, createjs.Sprite);

  RailShooter.Ship = createjs.promote(Ship, "Sprite");

})()
