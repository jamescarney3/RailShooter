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

  EnemyMedium = RailShooter.EnemyMedium = function(options){
    this.Sprite_constructor(enemyMediumSpriteSheet);
    this.x = options.x;
    this.y = options.y;
    this.game = options.game;
    this.framerate = 20; //this affects animations, but not tick listener

    this.gotoAndPlay("cycleLights");

    this.hitPoints = 10;
    //test movement stuff
    this.direction = "right";

    var enemy = this;
    this.addEventListener("tick", function(){
      enemy.rotation += 1;
      if(enemy.paused){
        enemy.gotoAndPlay("cycleLights");
        console.log("I'm paused.");
      }

      // test movement stuff
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
    });
  };

  var proto = createjs.extend(EnemyMedium, createjs.Sprite);

  EnemyMedium.prototype.isHitAt = function(x, y){
    if(RailShooter.Util.distance([x,y], [this.x, this.y]) < 23){
      return true;
    }else{
      return false;
    };
  };

  EnemyMedium.prototype.receiveBulletHit = function(){
    this.hitPoints -= 1;
    this.gotoAndStop(4);
    if(this.hitPoints <= 0){
      this.game.removeEnemy(this)
    };
  };

  RailShooter.EnemyMedium = createjs.promote(EnemyMedium, "Sprite");

})()
