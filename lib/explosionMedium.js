(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  var explosionMediumSpriteSheet = new createjs.SpriteSheet({
    images: ["assets/explosion_medium.png"],
    frames: {width: 66, height: 66, regX: 33, regY: 33},
  });

  ExplosionMedium = RailShooter.ExplosionMedium = function(options){
    this.Sprite_constructor(explosionMediumSpriteSheet);
    this.x = options.x;
    this.y = options.y;
    this.wreck = options.wreck;
    this.framerate = 17;

    this.play();

    var explosion = this;
    this.addEventListener("tick", function(){
      explosion.check();
    });
  };

  var proto = createjs.extend(ExplosionMedium, createjs.Sprite);

  ExplosionMedium.prototype.check = function(){
    if(this.currentFrame == 4 && this.wreck){
      this.wreck.remove();
      this.wreck = undefined;
    }else if(this.currentFrame == 9){
      this.getStage().removeChild(this);
    };
  };

  RailShooter.ExplosionMedium = createjs.promote(ExplosionMedium, "Sprite");

})()
