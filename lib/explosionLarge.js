(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  var explosionLargeSpriteSheet = new createjs.SpriteSheet({
    images: ["assets/explosion_large.png"],
    frames: {width: 132, height: 132, regX: 66, regY: 66},
  });

  ExplosionLarge = RailShooter.ExplosionLarge = function(options){
    this.Sprite_constructor(explosionLargeSpriteSheet);
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

  var proto = createjs.extend(ExplosionLarge, createjs.Sprite);

  ExplosionLarge.prototype.check = function(){
    if(this.currentFrame == 4 && this.wreck){
      this.wreck.remove();
      this.wreck = undefined;
    }else if(this.currentFrame == 9){
      this.getStage().removeChild(this);
    };
  };

  RailShooter.ExplosionLarge = createjs.promote(ExplosionLarge, "Sprite");

})()
