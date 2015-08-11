(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  var explosionBulletSpriteSheet = new createjs.SpriteSheet({
    images: ["assets/explosion_bullet.png"],
    frames: {width: 12, height: 12, regX: 6, regY: 6},
  });

  ExplosionBullet = RailShooter.ExplosionBullet = function(options){
    this.Sprite_constructor(explosionBulletSpriteSheet);
    this.x = options.x;
    this.y = options.y;
    this.framerate = 17;

    this.play();

    var explosion = this;
    this.addEventListener("tick", function(){
      explosion.check();
    });
  };

  var proto = createjs.extend(ExplosionBullet, createjs.Sprite);

  ExplosionBullet.prototype.check = function(){
    if(this.currentFrame == 6){
      this.getStage().removeChild(this);
    };
  };

  RailShooter.ExplosionBullet = createjs.promote(ExplosionBullet, "Sprite");

})()
