(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  HoldingScripts = RailShooter.HoldingScripts = {};

  HoldingScripts.hOsc = function(enemy, options){
    var leftBound = (options && options.leftBound ? options.leftBound : 0 + enemy.regX);
    var rightBound = (options && options.rightBound ? options.rightBound : enemy.game.stage.width - enemy.regY);
    var speed = (options && options.speed ? options.speed : 1);

    if(!enemy.direction){
      enemy.direction = "left";
    };
    if(!enemy.dead){
      if(enemy.x <= leftBound){
        enemy.x += speed;
        enemy.direction = "right";
      }else if(enemy.x >= rightBound){
        enemy.x -= speed;
        enemy.direction = "left";
      }else if(enemy.direction == "right"){
        enemy.x += speed;
      }else if(enemy.direction == "left"){
        enemy.x -= speed;
      };
    };
  };

  HoldingScripts.coordSequence = function(enemy, options){
    if(options && options.coords && options.steps){

      if(enemy.coordIdx == undefined){
        enemy.x = options.coords[0][0];
        enemy.y = options.coords[0][1];
        enemy.coordIdx = 1;
        enemy.lastCoordIdx = 0;
      };

      var steps = options.steps;
      var coord = options.coords[enemy.coordIdx];
      var lastCoord = options.coords[enemy.lastCoordIdx];
      var xDiff = (coord[0] - lastCoord[0]) / steps;
      var yDiff = (coord[1] - lastCoord[1]) / steps;

      if(Math.abs(coord[0] - enemy.x) <= Math.abs(xDiff) &&
         Math.abs(coord[1] - enemy.y) <= Math.abs(yDiff)){

        enemy.x = coord[0];
        enemy.y = coord[1];

        enemy.coordIdx = (enemy.coordIdx < options.coords.length - 1 ? enemy.coordIdx + 1 : 0);
        enemy.lastCoordIdx = (enemy.lastCoordIdx < options.coords.length - 1 ? enemy.lastCoordIdx + 1 : 0);
      }else{
        enemy.x += (coord[0] - lastCoord[0]) / steps;
        enemy.y += (coord[1] - lastCoord[1]) / steps;
      };
    };
  };

})()
