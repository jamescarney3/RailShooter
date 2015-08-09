(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  var enemyMediumSpriteSheet = new createjs.SpriteSheet({
    images: ["assets/ship_bullet.png"],
    frames: {width: 5, height: 9, regX: 3, regY: 3},

  });

  ShipBullet = RailShooter.ShipBullet = function(options){
    this.Sprite_constructor(enemyMediumSpriteSheet);
    this.game = options.game;
    this.x = options.x;
    this.y = options.y;
    this.speed = 10;
    this.dmg = 1;

    var bullet = this;
    this.addEventListener("tick", function(){
      bullet.step();
    });
  };

  var proto = createjs.extend(ShipBullet, createjs.Sprite);

  ShipBullet.prototype.step = function(){
    this.y -= this.speed;
    if (this.y < 0){
      this.game.removeShipBullet(this);
    };
  };

  RailShooter.ShipBullet = createjs.promote(ShipBullet, "Sprite");

})()
