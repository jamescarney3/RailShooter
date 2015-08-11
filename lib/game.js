(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };
  var Game = RailShooter.Game = function(){
    this.stage = new createjs.Stage("canvas");
    this.stage.width = window.$("#canvas").width();
    this.stage.height = window.$("#canvas").height();

    this.starField = new RailShooter.StarField({
      stage: this.stage
    });

    this.enemies = [];
    this.shipBullets = [];
    this.enemyBullets = [];

    this.addShip();

    var enemy = new RailShooter.EnemyLarge(100, 100, this.game, {script: RailShooter.HoldingScripts.hOsc, scriptOptions: {leftBound: 200, rightBound: 400, speed: 2}});
    this.addEnemy(enemy);

    var game = this;
    this.stage.addEventListener("tick", function(){
      game.checkHits();
  //TESTING PURPOSES HERE
    // var sampleEnemy = new RailShooter.EnemyLarge({
    //   x: 100,
    //   y: 100,
    //   game: this
    // });
    // this.addEnemy(sampleEnemy);
    //
    // this.addShip();
    //
    // this.stage.update();
    });
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
    game.enemyBullets.forEach(function(bullet){
      if(game.ship && !game.ship.disabled && game.ship.isHitAt(bullet.x, bullet.y)){
        game.removeEnemyBullet(bullet);
        game.ship.blowUp();
      }
    });

    //MORE TESTING

    if(!game.ship){
      game.addShip();
    };
    // if(game.enemies.length == 0){
    //   var sampleEnemy = new RailShooter.EnemyMedium({
    //     x: 100,
    //     y: 100,
    //     game: this
    //   });
    //   game.addEnemy(sampleEnemy);
    // }
  };

  Game.prototype.addEnemy = function(enemy){
    this.stage.addChild(enemy);
    this.enemies.push(enemy);
  };

  Game.prototype.removeEnemy = function(enemy){
    this.stage.removeChild(enemy);
    this.enemies.splice(this.enemies.indexOf(enemy), 1);
  };

  Game.prototype.addEnemyBullet = function(x, y, velocity){
    var enemyBullet = new RailShooter.EnemyBullet({
      x: x,
      y: y,
      velocity: velocity,
      game: this
    });
    this.enemyBullets.push(enemyBullet);
    this.stage.addChild(enemyBullet);
  };

  Game.prototype.removeEnemyBullet = function(enemyBullet){
    this.stage.removeChild(enemyBullet);
    this.enemyBullets.splice(this.enemyBullets.indexOf(enemyBullet), 1);
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
