(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  EntryScripts = RailShooter.EntryScripts = {};

  // Options hash mandatory for this one
  EntryScripts.goToDirectInSteps = function(enemy, options){
    origin = options.origin;
    destination = options.destination;
    steps = options.steps;

    if(Math.abs(enemy.x) - Math.abs(destination[0]) < 1 &&
       Math.abs(enemy.y) - Math.abs(destination[1]) < 1){
      enemy.x = destination[0];
      enemy.y = destination[1];
      enemy.positioned = true;
    }else{
      enemy.x += (destination[0] - origin[0]) / steps;
      enemy.y += (destination[1] - origin[1]) / steps;
    };
  };

  EntryScripts.goToDecel = function(enemy, options){
    destination = (options && options.destination ? options.destination : [enemy.game.stage.width / 2, enemy.game.stage.height / 2])
    factor = (options && options.factor ? options.factor : 0.05);

    var xDiff = (destination[0] - enemy.x) * factor;
    var yDiff = (destination[1] - enemy.y) * factor;

    if(Math.abs(enemy.x - destination[0]) < 1 &&
       Math.abs(enemy.y - destination[1]) < 1){
      enemy.x = destination[0];
      enemy.y = destination[1];
      enemy.positioned = true;
    }else{
      enemy.x += xDiff;
      enemy.y += yDiff;
    };
  };

  EntryScripts.decel = function(enemy, options){
    plane = (options && options.plane ? options.plane : "y");
    factor = (options && options.factor ? options.factor : 0.05);
    bound = (options && options.bound ? options.bound : 300);

    if(plane == "x"){
      enemy.x += (bound - enemy.x) * factor;
      if(Math.abs(enemy.x - bound) < 1){
        enemy.x = bound;
        enemy.positioned = true;
      };
    }else{
      enemy.y += (bound - enemy.y) * factor;
      if(Math.abs(enemy.y - bound) < 1){
        enemy.y = bound;
        enemy.positioned = true;
      };
    };

  }

})()
