(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  var enemyMediumSpriteSheet = new createjs.SpriteSheet({
    images: ["assets/enemy_medium.png"],
    frames: {width: 48, height: 48, regX: 24, regY: 24},
    animations: {
      idle: [0],
      cycleLights: {
        frames: [0, 3, 2, 1, 2, 3]
      }
    }
  });

  EnemyMedium = RailShooter.EnemyMedium = function(x, y, game, options){
    this.Sprite_constructor(enemyMediumSpriteSheet);
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

    this.maxHitPoints = 15;
    this.hitPoints = this.maxHitPoints;

    this.shotFrequency = 50;
    this.shotTimer = this.shotFrequency * Math.random();
    this.shotPrecision = 0.15;
    this.shotSpeed = 5;

    this.basePoints = 15

    var enemy = this;
    this.addEventListener("tick", function(){
      enemy.rotation += 1;
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
        enemy.gotoAndPlay("cycleLights");
      };

      if(enemy.hitPoints <= 0 && !enemy.dead){
        enemy.dead = true;
        enemy.blowUp();
      };
    });
  };

  var proto = createjs.extend(EnemyMedium, createjs.Sprite);

  EnemyMedium.prototype.takeAim = function(ship){
    var angle = RailShooter.Util.variate(
      RailShooter.Util.angle(this, ship),
      this.shotPrecision
      );
    return [RailShooter.Util.angleVector(angle, this.shotSpeed)];
  }

  EnemyMedium.prototype.fireMainGun = function(){
    var velocities = this.takeAim(this.game.ship);

    velocities.forEach(function(velocity){
      this.game.addEnemyBullet(this.x, this.y, velocity);
    }.bind(this));
  };

  EnemyMedium.prototype.isHitAt = function(x, y){
    if(RailShooter.Util.distance([x,y], [this.x, this.y]) < 25){
      return true;
    }else{
      return false;
    };
  };

  EnemyMedium.prototype.receiveHit = function(dmg){
    this.hitPoints -= dmg;
    this.rotation -= 3;
    this.gotoAndStop(4);
  };

  EnemyMedium.prototype.blowUp = function(){
    var explosion = new RailShooter.ExplosionMedium({
      x: this.x,
      y: this.y,
      wreck: this
    });
    this.getStage().addChild(explosion);
  };

  EnemyMedium.prototype.remove = function(){
    this.game.removeEnemy(this);
  };

  RailShooter.EnemyMedium = createjs.promote(EnemyMedium, "Sprite");

})()
