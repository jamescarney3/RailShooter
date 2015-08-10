(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  var enemyFastSpriteSheet = new createjs.SpriteSheet({
    images: ["assets/enemy_fast.png"],
    frames: {width: 16, height: 40, regX: 8, regY: 30},
    animations: {
      idle: [0],
      thrust: {
        frames: [3, 2, 1, 0]
      }
    }
  });

  EnemyFast = RailShooter.EnemyFast = function(options){
    this.Sprite_constructor(enemyFastSpriteSheet);
    this.x = options.x;
    this.y = options.y;
    this.game = options.game;
    this.framerate = 15;

    this.hitPoints = 2;
    this.gunTimer = 30;

    this.gotoAndPlay("thrust");

    var enemy = this;
    this.addEventListener("tick", function(){
      enemy.gunTimer -= 1;

      if(enemy.gunTimer <= 0 && enemy.game.ship){
        enemy.fireMainGun();
        enemy.gunTimer = 30;
      };

      if(enemy.paused){
        enemy.gotoAndPlay("cycleLights");
      };

      if(enemy.hitPoints <= 0 && !enemy.dead){
        enemy.dead = true;
        enemy.blowUp();
      };
    });
  };

  var proto = createjs.extend(EnemyFast, createjs.Sprite);

  EnemyFast.prototype.takeAim = function(angle){
    var yVel = 8 * Math.sin(angle);
    var xVel = 8 * Math.cos(angle);

    return [xVel, yVel];
  }

  EnemyFast.prototype.fireMainGun = function(){
    var angle = ((this.rotation + 90) * Math.PI) / 180;
    var gunCoords = RailShooter.Util.angleDistance([this.x, this.y], angle, 10);
    var velocity = this.takeAim(angle);
    this.game.addEnemyBullet(gunCoords[0], gunCoords[1], velocity);
  };

  EnemyFast.prototype.isHitAt = function(x, y){
    if(x > this.x - 8 && x < this.x + 8 && y > this.y - 30 && y < this.y + 10){
      return true;
    }else{
      return false;
    };
  };

  EnemyFast.prototype.receiveHit = function(dmg){
    this.hitPoints -= dmg;
    this.gotoAndStop(5);
  };

  EnemyFast.prototype.blowUp = function(){
    var explosion = new RailShooter.ExplosionSmall({
      x: this.x,
      y: this.y,
      wreck: this
    });
    this.getStage().addChild(explosion);
  };

  EnemyFast.prototype.remove = function(){
    this.game.removeEnemy(this);
  };

  RailShooter.EnemyFast = createjs.promote(EnemyFast, "Sprite");

})()
