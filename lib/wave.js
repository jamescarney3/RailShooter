(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  Wave = RailShooter.Wave = function(game, options){
    this.game = game;
    this.mods = {};
    this.group = [];

    if(options){
      if(options.shotRateMod){ this.mods["shotRateMod"] = options.shotRateMod};
      if(options.hitPointMod){this.mods["hitPointMod"] = options.hitPointMod};
      if(options.accuracyMod){ this.mods["accuracyMod"] = options.accuracyMod};
      if(options.shotVelMod){ this.mods["shotVelMod"] = options.shotVelMod};
      if(options.pointValMod){ this.mods["pointValMod"] = options.pointValMod};
    };
  };

  Wave.prototype.build = function(){
    //THIS IS TO BE OVERWRITTEN IN SUBCLASSES//
    //BUT: it will involve building of enemies and setting their ivars//
    //based on the wave's this.mods ivar//
  };

  Wave.prototype.modEnemies = function(){
    Object.keys(this.mods).forEach(function(key){
      this.group.forEach(function(enemy){
        switch(key){
          case "shotRateMod":
            enemy.shotFrequency -= Math.log(this.mods["shotVelMod"])/2;
            break;
          case "hitPointMod":
            enemy.maxHitPoints = Math.floor(enemy.maxHitPoints * this.mods["hitPointMod"]);
            enemy.hitPoints = enemy.maxHitPoints;
            break;
          case "accuracyMod":
            enemy.shotPrecision *= this.mods["accuracyMod"]
            break;
          case "shotVelMod":
            enemy.shotSpeed += Math.log(this.mods["shotVelMod"])/2;
            break;
          case "pointValMod":
            enemy.basePoints = Math.floor(enemy.basePoints * this.mods["pointValMod"]);
            break;
        };
      }.bind(this));
    }.bind(this));

  };

  Wave.prototype.start = function(){
    this.group.forEach(function(enemy){
      this.game.addEnemy(enemy);
    }.bind(this));
  };

  Wave.prototype.isFinished = function(){
    return (this.group.length == 0 ? true : false);
  };

})()
