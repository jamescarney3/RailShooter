(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  var enemyLargeSpriteSheet = new createjs.SpriteSheet({
    images: ["assets/enemy_large.png"],
    frames: {width: 96, height: 96, regX: 48, regY: 48},
    animations: {
      idle: [0],
      cycleLights: {
        frames: [0, 3, 2, 1, 2, 3]
      },
      grow: {
        frames: [0, 0, 4, 4, 5, 5, 6, 6]
      },
      cycleLightsBig: {
        frames: [6, 9, 8, 7, 8, 9]
      }
    }
  });

  EnemyLarge = RailShooter.EnemyLarge = function(x, y, game, options){
    this.Sprite_constructor(enemyLargeSpriteSheet);
    this.x = x;
    this.y = y;
    this.game = game;

    this.framerate = 20;
    this.gotoAndPlay("cycleLights");
    this.rotation = Math.round(Math.random() * 360);
    this.size = "normal";

    if(options){
      if(options.holdingScript){ this.holdingScript = options.holdingScript; };
      if(options.holdingScriptOptions){ this.holdingScriptOptions = options.holdingScriptOptions; };
      if(options.entryScript){ this.entryScript = options.entryScript; };
      if(options.entryScriptOptions){ this.entryScriptOptions = options.entryScriptOptions; };
    };

    this.maxHitPoints = 50
    this.hitPoints = this.maxHitPoints;

    this.shotFrequency = 50;
    this.shotTimer = this.shotFrequency * Math.random();
    this.shotPrecision = 0.15;
    this.shotSpeed = 5;

    this.basePoints = 50;

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

      if(enemy.shotTimer <= 0 && enemy.game.ship && !enemy.dead){
        enemy.fireMainGun();
        enemy.shotTimer = (enemy.size == "large" ? enemy.shotFrequency * .66 : enemy.shotFrequency);
      };

      if(enemy.hitPoints < enemy.maxHitPoints / 1.33 && enemy.size == "normal"){
        enemy.size = "intermediate";
        enemy.gotoAndPlay("grow");
      }else if(enemy.size == "intermediate" && enemy.currentFrame == 6 || enemy.currentFrame == 16 ){
        enemy.size = "large";
        enemy.gotoAndStop(6);
      }

      if(enemy.paused){
        if(enemy.size == "normal"){
          enemy.gotoAndPlay("cycleLights");
        }else if(enemy.size == "large"){
          enemy.gotoAndPlay("cycleLightsBig")
        };
      };

      if(enemy.hitPoints <= 0 && !enemy.dead){
        enemy.dead = true;
        enemy.blowUp();
      };
    });
  };

  var proto = createjs.extend(EnemyLarge, createjs.Sprite);

  EnemyLarge.prototype.takeAim = function(ship){
    var angle = RailShooter.Util.variate(
      RailShooter.Util.angle(this, ship),
      this.shotPrecision
      );
    var spread = 0.05;
    if(this.hitPoints <= 15){
      return [
        RailShooter.Util.angleVector(Math.PI * 1/8, this.shotSpeed),
        RailShooter.Util.angleVector(Math.PI * 2/8, this.shotSpeed),
        RailShooter.Util.angleVector(Math.PI * 3/8, this.shotSpeed),
        RailShooter.Util.angleVector(Math.PI * 4/8, this.shotSpeed),
        RailShooter.Util.angleVector(Math.PI * 5/8, this.shotSpeed),
        RailShooter.Util.angleVector(Math.PI * 6/8, this.shotSpeed),
        RailShooter.Util.angleVector(Math.PI * 7/8, this.shotSpeed)
        ]
    }else if(this.hitPoints <= this.maxHitPoints / 1.33){
      return [
        RailShooter.Util.angleVector(angle, this.shotSpeed),
        RailShooter.Util.angleVector(angle * (1 + spread), this.shotSpeed),
        RailShooter.Util.angleVector(angle * (1 - spread), this.shotSpeed)
        ];
    }else{
      return [RailShooter.Util.angleVector(angle, this.shotSpeed)];
    };
  };

  EnemyLarge.prototype.fireMainGun = function(){
    var velocities = this.takeAim(this.game.ship);

    velocities.forEach(function(velocity){
      this.game.addEnemyBullet(this.x, this.y, velocity);
    }.bind(this));
  };

  EnemyLarge.prototype.isHitAt = function(x, y){
    if(this.size == "normal"){
      if(RailShooter.Util.distance([x,y], [this.x, this.y]) < 36){
        return true;
      }else{
        return false;
      };
    }else if(this.size == "large"){
      if(RailShooter.Util.distance([x,y], [this.x, this.y]) < 48){
        return true;
      }else{
        return false;
      };
    };
  };

  EnemyLarge.prototype.receiveHit = function(dmg){
    this.hitPoints -= dmg;
    this.rotation -= 3;
    this.gotoAndStop(this.currentFrame + 10);
  };

  EnemyLarge.prototype.blowUp = function(){
    var enemy = this;
    var stage = this.getStage();

    var explosion = new RailShooter.ExplosionLarge({
      x: this.x,
      y: this.y,
      wreck: this
    });

    if(this.size == "normal"){
      stage.addChild(explosion);
    }else{

      this.explosionTimer = 30;

      var subExplosions = [
        new RailShooter.ExplosionMedium({x: this.x - 25, y: this.y + 10}),
        new RailShooter.ExplosionSmall({x: this.x + 25, y: this.y - 25}),
        new RailShooter.ExplosionSmall({x: this.x + 20, y: this.y + 20})
      ];

      this.addEventListener("tick", function(){
        enemy.explosionTimer -= 1;
        if(enemy.explosionTimer == 30){
          stage.addChild(subExplosions[2]);
        }else if(enemy.explosionTimer == 15){
          stage.addChild(subExplosions[1]);
        }else if(enemy.explosionTimer == 5){
          stage.addChild(subExplosions[0]);
        }else if(enemy.explosionTimer == 0){
          stage.addChild(explosion);
        }
      });
    };
  };

  EnemyLarge.prototype.remove = function(){
    this.game.removeEnemy(this);
  };

  RailShooter.EnemyLarge = createjs.promote(EnemyLarge, "Sprite");

})()
