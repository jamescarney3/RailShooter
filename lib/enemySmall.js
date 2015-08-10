(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  var enemySmallSpriteSheet = new createjs.SpriteSheet({
    images: ["assets/enemy_small.png"],
    frames: {width: 32, height: 32, regX: 16, regY: 16},
    animations: {
      idle: [0],
      cycleLights: {
        frames: [1, 4, 3, 2, 3, 4]
      }
    }
  });

  EnemySmall = RailShooter.EnemySmall = function(options){
    this.Sprite_constructor(enemySmallSpriteSheet);
    this.x = options.x;
    this.y = options.y;
    this.game = options.game;
    this.framerate = 20;

    this.hitPoints = 5;
    this.gunTimer = 30;

    this.gotoAndPlay("cycleLights");

    var enemy = this;
    this.addEventListener("tick", function(){
      enemy.rotation += 1;
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

  var proto = createjs.extend(EnemySmall, createjs.Sprite);

  EnemySmall.prototype.takeAim = function(ship){
    var velocity = RailShooter.Util.findRandomizedVector(this, ship, 6, .2);
    return velocity;
  }

  EnemySmall.prototype.fireMainGun = function(){
    var velocity = this.takeAim(this.game.ship);
    this.game.addEnemyBullet(this.x, this.y, velocity);
  };

  EnemySmall.prototype.isHitAt = function(x, y){
    if(RailShooter.Util.distance([x,y], [this.x, this.y]) < 13){
      return true;
    }else{
      return false;
    };
  };

  EnemySmall.prototype.receiveHit = function(dmg){
    this.hitPoints -= dmg;
    this.rotation -= 2;
    this.gotoAndStop(5);
  };

  EnemySmall.prototype.blowUp = function(){
    var explosion = new RailShooter.ExplosionSmall({
      x: this.x,
      y: this.y,
      wreck: this
    });
    this.getStage().addChild(explosion);
  };

  EnemySmall.prototype.remove = function(){
    this.game.removeEnemy(this);
  };

  RailShooter.EnemySmall = createjs.promote(EnemySmall, "Sprite");

})()
