(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  var explosionSmallSpriteSheet = new createjs.SpriteSheet({
    images: ["assets/explosion_small.png"],
    frames: {width: 44, height: 44, regX: 22, regY: 22},
  });

  ExplosionSmall = RailShooter.ExplosionSmall = function(options){
    this.Sprite_constructor(explosionSmallSpriteSheet);
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

  var proto = createjs.extend(ExplosionSmall, createjs.Sprite);

  ExplosionSmall.prototype.check = function(){
    if(this.currentFrame == 4 && this.wreck){
      this.wreck.remove();
      this.wreck = undefined;
    }else if(this.currentFrame == 9){
      this.getStage().removeChild(this);
    };
  };

  RailShooter.ExplosionSmall = createjs.promote(ExplosionSmall, "Sprite");

})()
