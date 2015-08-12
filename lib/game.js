(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };
  var Game = RailShooter.Game = function(gameView, stage){
    this.gameView = gameView;
    this.stage = stage;
  };

  Game.prototype.play = function(){

    this.score = 0;
    this.gameView.setScore(this.score);
    this.lives = 5;
    this.gameView.setLives(this.lives);
    this.wave = 1;
    this.gameView.setWave(this.wave);

    this.enemies = [];
    this.shipBullets = [];
    this.enemyBullets = [];

    this.respawnTime = 200;
    this.respawnTimer = this.respawnTime;

    this.addShip();

    var enemy1 = new RailShooter.EnemyLarge(200, -100, this, {
      entryScript: RailShooter.EntryScripts.goToDirectInSteps,
      entryScriptOptions: {origin: [200, -100], destination: [100, 100], steps: 200},
      holdingScript: RailShooter.HoldingScripts.hOsc,
      holdingScriptOptions: {leftBound: 200, rightBound: 400, speed: 2}
      });
    this.addEnemy(enemy1);

    var enemy2 = new RailShooter.EnemyFast(-100, -200, this, {
      entryScript: RailShooter.EntryScripts.goToDecel,
      entryScriptOptions: {destination: [100, 250], factor: .025}
    });
    this.addEnemy(enemy2);

    var enemy3 = new RailShooter.EnemySmall(400, -25, this, {
      entryScript: RailShooter.EntryScripts.goToDecel,
      entryScriptOptions: {destination: [200, 250], factor: .025},
      holdingScript: RailShooter.HoldingScripts.coordSequence,
      holdingScriptOptions: {steps: 50, coords: [
                                                  [200, 250],
                                                  [300, 250],
                                                  [400, 200],
                                                  [400, 100],
                                                  [400, 200],
                                                  [300, 250]
                                                ]}
    });
    this.addEnemy(enemy3);

    var game = this;
    this.stage.addEventListener("tick", function(){
      game.checkHits();
    });
  },

  Game.prototype.checkHits = function(){
    var game = this;
    game.shipBullets.forEach(function(bullet){
      game.enemies.forEach(function(enemy){
        if(enemy.isHitAt(bullet.x, bullet.y)){
          game.removeShipBullet(bullet);
          game.stage.addChild(new RailShooter.ExplosionBullet({x: bullet.x, y: bullet.y}));
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

    if(!game.ship && game.enemyBullets.length == 0){
      // this.respawnTimer -= 1;
      // if(this.respawnTimer == 0 && this.lives > 0){
        game.addShip();
      //   this.respawnTimer = this.respawnTime;
      // };
    };
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
    this.lives -= 1;
    this.gameView.setLives(this.lives);
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
