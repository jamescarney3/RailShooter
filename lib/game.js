(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };
  var Game = RailShooter.Game = function(){
    this.stage = new createjs.Stage("canvas");
    this.stage.width = window.$("#canvas").width();
    this.stage.height = window.$("#canvas").height();

    this.enemies = [];
    this.shipBullets = [];

    var game = this;
    this.stage.addEventListener("tick", function(){
      game.checkHits();
    });
  //TESTING PURPOSES HERE
    var sampleEnemy = new RailShooter.EnemyMedium({
      x: 100,
      y: 100,
      game: this
    });
    this.addEnemy(sampleEnemy);

    this.addShip();

    this.stage.update();
  };

  Game.prototype.checkHits = function(){
    var game = this;
    game.shipBullets.forEach(function(bullet){
      game.enemies.forEach(function(enemy){
        if(enemy.isHitAt(bullet.x, bullet.y)){
          game.removeShipBullet(bullet);
          enemy.receiveHit(bullet.dmg);
        };
      });
    });
  };

  Game.prototype.addEnemy = function(enemy){
    this.stage.addChild(enemy);
    this.enemies.push(enemy);
  };

  Game.prototype.removeEnemy = function(enemy){
    this.stage.removeChild(enemy);
    this.enemies.splice(this.enemies.indexOf(enemy), 1);
  };

  Game.prototype.addShip = function(){
    this.ship = new RailShooter.Ship({
      x: 250,
      y: 500,
      game: this
    })
    this.stage.addChild(this.ship);
  };

  Game.prototype.removeShip = function(){
    this.stage.removeChild(this.ship);
    this.ship = undefined;
  };

  Game.prototype.addShipBullet = function(x, y){
    var newBullet = new RailShooter.ShipBullet({
      x: x,
      y: y,
      game: this
    });
    this.shipBullets.push(newBullet);
    this.stage.addChild(newBullet);
  };

  Game.prototype.removeShipBullet = function(shipBullet){
    this.stage.removeChild(shipBullet);
    this.shipBullets.splice(this.shipBullets.indexOf(shipBullet), 1);
  };

})()
