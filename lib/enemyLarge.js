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

  EnemyLarge = RailShooter.EnemyLarge = function(options){
    this.Sprite_constructor(enemyLargeSpriteSheet);
    this.x = options.x;
    this.y = options.y;
    this.game = options.game;
    this.framerate = 20; //this affects animations, but not tick listener

    this.gotoAndPlay("cycleLights");

    this.hitPoints = 25;
    this.gunTimer = 30;
    this.size = "normal";

    //test movement stuff
    this.direction = "right";

    var enemy = this;
    this.addEventListener("tick", function(){
      enemy.rotation += 1;
      enemy.gunTimer -= 1;

      if(enemy.gunTimer <= 0 && enemy.game.ship){
        enemy.fireMainGun();
        enemy.gunTimer = 30;
      };

      if(enemy.hitPoints < 25 / 2 && enemy.size == "normal"){
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

      //test movement stuff
      if(!enemy.dead){
        if(enemy.direction == "right"){
          enemy.x += 1;
          if(enemy.x > 400){
            enemy.direction = "left";
          };
        }else{
          enemy.x -= 1;
          if(enemy.x < 100){
            enemy.direction = "right";
          };
        };
      };
    });
  };

  var proto = createjs.extend(EnemyLarge, createjs.Sprite);

  EnemyLarge.prototype.takeAim = function(ship){
    var velocity = RailShooter.Util.findRandomizedVector(this, ship, 6, .2);
    return velocity;
  }

  EnemyLarge.prototype.fireMainGun = function(){
    var velocity = this.takeAim(this.game.ship);
    this.game.addEnemyBullet(this.x, this.y, velocity);
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
