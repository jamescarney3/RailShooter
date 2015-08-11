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

  EnemySmall = RailShooter.EnemySmall = function(x, y, game, options){
    this.Sprite_constructor(enemySmallSpriteSheet);
    this.x = x;
    this.y = y;
    this.game = game;

    this.framerate = 20;
    this.gotoAndPlay("cycleLights");
    this.rotation = Math.round(Math.random() * 360);

    if(options){
      if(options.holdingScript){ this.holdingScript = options.holdingScript; };
      if(options.holdingScriptOptions){ this.holdingScriptOptions = options.holdingScriptOptions; };
      if(options.entryScript){ this.entryScript = options.entryScript; };
      if(options.entryScriptOptions){ this.entryScriptOptions = options.entryScriptOptions; };
    };

    this.maxHitPoints = 5;
    this.hitPoints = this.maxHitPoints;

    this.shotFrequency = 30;
    this.shotTimer = this.shotFrequency * Math.random();
    this.shotPrecision = 0.15;

    var enemy = this;
    this.addEventListener("tick", function(){
      enemy.rotation += 1;
      enemy.shotTimer -= 1;

      if(!enemy.positioned && enemy.entryScript){
        enemy.entryScript(enemy, enemy.entryScriptOptions);
      };

      if(enemy.positioned && enemy.holdingScript){
        enemy.holdingScript(enemy, enemy.holdingScriptOptions);
      };

      if(enemy.shotTimer <= 0 && enemy.game.ship){
        enemy.fireMainGun();
        enemy.shotTimer = enemy.shotFrequency;
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
    var angle = RailShooter.Util.variate(
      RailShooter.Util.angle(this, ship),
      this.shotPrecision
      );
    return [RailShooter.Util.angleVector(angle, 5)];
  }

  EnemySmall.prototype.fireMainGun = function(){
    var velocities = this.takeAim(this.game.ship);

    velocities.forEach(function(velocity){
      this.game.addEnemyBullet(this.x, this.y, velocity);
    }.bind(this));
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
    this.rotation -= 3;
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
