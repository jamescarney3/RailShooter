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
    this.gameView.resetWave();

    this.enemies = [];
    this.shipBullets = [];
    this.enemyBullets = [];

    this.respawnTime = 200;
    this.respawnTimer = this.respawnTime;

    this.addShip();

    // var enemy1 = new RailShooter.EnemyLarge(200, -100, this, {
    //   entryScript: RailShooter.EntryScripts.goToDirectInSteps,
    //   entryScriptOptions: {origin: [200, -100], destination: [100, 100], steps: 200},
    //   holdingScript: RailShooter.HoldingScripts.hOsc,
    //   holdingScriptOptions: {leftBound: 200, rightBound: 400, speed: 2}
    //   });
    // this.addEnemy(enemy1);
    //
    // var enemy2 = new RailShooter.EnemyFast(-100, -200, this, {
    //   entryScript: RailShooter.EntryScripts.goToDecel,
    //   entryScriptOptions: {destination: [100, 250], factor: .025}
    // });
    // this.addEnemy(enemy2);
    //
    // var enemy3 = new RailShooter.EnemySmall(400, -25, this, {
    //   entryScript: RailShooter.EntryScripts.goToDecel,
    //   entryScriptOptions: {destination: [200, 250], factor: .025},
    //   holdingScript: RailShooter.HoldingScripts.coordSequence,
    //   holdingScriptOptions: {steps: 50, coords: [
    //                                               [200, 250],
    //                                               [300, 250],
    //                                               [400, 200],
    //                                               [400, 100],
    //                                               [400, 200],
    //                                               [300, 250]
    //                                             ]}
    // });
    // this.addEnemy(enemy3);
    this.waveIdx = 1;
    this.waveOptions = {
      shotRateMod: 1,
      hitPointMod: 1,
      accuracyMod: 1,
      shotVelMod: 1,
      pointValMod: 1
    };
    this.currentWave = new RailShooter.WaveList[0](this);
    this.currentWave.build();
    this.currentWave.start();

    var game = this;
    this.stage.addEventListener("tick", function(){
      game.checkHits();
      game.checkWave();
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

  Game.prototype.checkWave = function(){
    if(game.currentWave.isFinished()){
      this.gameView.incrementWave();
      this.currentWave = new RailShooter.WaveList[this.waveIdx](this, this.waveOptions);
      this.currentWave.build();
      this.currentWave.modEnemies();
      this.currentWave.start();
      this.waveIdx = (this.waveIdx + 1 < RailShooter.WaveList.length ? this.waveIdx + 1 : 0);
      if(this.waveIdx == 0){ this.updateWaveOptions(); }
    };
  }

    //MORE TESTING

    if(!game.ship && game.enemyBullets.length == 0){
      // this.respawnTimer -= 1;
      // if(this.respawnTimer == 0 && this.lives > 0){
        game.addShip();
      //   this.respawnTimer = this.respawnTime;
      // };
    };
  };

  Game.prototype.updateWaveOptions = function(){
    this.waveOptions.shotRateMod *= .95;
    this.waveOptions.hitPointMod += this.waveOptions.hitPointMod / 10;
    this.waveOptions.accuracyMod *= .95;
    this.waveOptions.shotVelMod *= 1.05;
    this.waveOptions.pointValMod  += this.waveOptions.pointValMod / 3;
  }

  Game.prototype.addEnemy = function(enemy){
    this.stage.addChild(enemy);
    this.enemies.push(enemy);
  };

  Game.prototype.removeEnemy = function(enemy){
    this.stage.removeChild(enemy);
    if(enemy.dead){
      this.score += enemy.basePoints;
      this.gameView.setScore(this.score);
    };
    this.enemies.splice(this.enemies.indexOf(enemy), 1);
    if(this.currentWave && this.currentWave.group.indexOf(enemy) >= 0){
      this.currentWave.group.splice(this.currentWave.group.indexOf(enemy) ,1);
    };
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
