(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  var enemyBulletSpriteSheet = new createjs.SpriteSheet({
    images: ["assets/enemy_bullet.png"],
    frames: {width: 9, height: 9, regX: 5, regY: 5}, // fix when made

  });

  EnemyBullet = RailShooter.EnemyBullet = function(options){
    this.Sprite_constructor(enemyBulletSpriteSheet);
    this.x = options.x;
    this.y = options.y;
    this.velocity = options.velocity;
    this.game = options.game;

    this.framerate = 17;
    this.play();

    var enemyBullet = this;
    this.addEventListener("tick", function(){
      enemyBullet.x += enemyBullet.velocity[0];
      enemyBullet.y += enemyBullet.velocity[1];

      if(enemyBullet.y < 0 || enemyBullet.x < 0 || enemyBullet.x > enemyBullet.game.stage.width){
        enemyBullet.game.removeEnemyBullet(enemyBullet);
      };
    });
  }

  var proto = createjs.extend(EnemyBullet, createjs.Sprite);

  RailShooter.EnemyBullet = createjs.promote(EnemyBullet, "Sprite");
})()
