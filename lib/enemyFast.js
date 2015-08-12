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

  EnemyFast = RailShooter.EnemyFast = function(x, y, game, options){
    this.Sprite_constructor(enemyFastSpriteSheet);
    this.x = x;
    this.y = y;
    this.game = game;

    this.framerate = 15;
    this.gotoAndPlay("thrust");


    if(options){
      if(options.holdingScript){ this.holdingScript = options.holdingScript; };
      if(options.holdingScriptOptions){ this.holdingScriptOptions = options.holdingScriptOptions; };
      if(options.entryScript){ this.entryScript = options.entryScript; };
      if(options.entryScriptOptions){ this.entryScriptOptions = options.entryScriptOptions; };
    };

    this.maxHitPoints = 2;
    this.hitPoints = this.maxHitPoints;

    this.shotFrequency = 50;
    this.shotTimer = this.shotFrequency * Math.random();
    this.shotPrecision = 0.15;
    this.shotSpeed = 5;

    this.basePoints = 2;


    var enemy = this;
    this.addEventListener("tick", function(){
      enemy.shotTimer -= 1;

      if(!enemy.positioned && enemy.entryScript && !enemy.dead){
        enemy.entryScript(enemy, enemy.entryScriptOptions);
      };

      if(enemy.positioned && enemy.holdingScript && !enemy.dead){
        enemy.holdingScript(enemy, enemy.holdingScriptOptions);
      };

      if(enemy.shotTimer <= 0 && enemy.game.ship){
        enemy.fireMainGun();
        enemy.shotTimer = enemy.shotFrequency;
      };

      if(enemy.paused){
        enemy.gotoAndPlay("thrust");
      };

      if(enemy.hitPoints <= 0 && !enemy.dead){
        enemy.dead = true;
        enemy.blowUp();
      };
    });
  };

  var proto = createjs.extend(EnemyFast, createjs.Sprite);

  EnemyFast.prototype.takeAim = function(angle){
    return [RailShooter.Util.angleVector(angle, this.shotSpeed)];
  }

  EnemyFast.prototype.fireMainGun = function(){
    var angle = ((this.rotation + 90) * Math.PI) / 180;
    var velocities = this.takeAim(angle);
    var gunCoords = RailShooter.Util.angleDistance([this.x, this.y], angle, 10);

    velocities.forEach(function(velocity){
      this.game.addEnemyBullet(gunCoords[0], gunCoords[1], velocity);
    }.bind(this));
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
    this.y -= 3;
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
