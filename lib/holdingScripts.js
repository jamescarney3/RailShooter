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

})()
