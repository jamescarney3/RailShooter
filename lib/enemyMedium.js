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
    this.framerate = 20; //this affects animations, but not tick listener
    this.gotoAndPlay("cycleLights");

    //test movement stuff
    this.direction = "right";

    var enemy = this;
    this.addEventListener("tick", function(){
      enemy.rotation += 1;

      
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

  RailShooter.EnemyMedium = createjs.promote(EnemyMedium, "Sprite");

})()
