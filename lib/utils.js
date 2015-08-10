(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  var Util = RailShooter.Util = {};

  // RailShooter.Util.inherits = function (ChildClass, ParentClass){
  //   var Surrogate = function(){};
  //   Surrogate.prototype = ParentClass.prototype;
  //   ChildClass.prototype = new Surrogate();
  // };

  //Return distance between two points on a cartesian plane
  RailShooter.Util.distance = function(pos1, pos2){
    var xSquared = Math.pow(pos1[0] - pos2[0], 2);
    var ySquared = Math.pow(pos1[1] - pos2[1], 2);
    var distance = Math.pow((xSquared + ySquared), 0.5);
    return distance;
  };

  //Return angle between two objects on the stage
  RailShooter.Util.angle = function(obj1, obj2){
    var xDist = obj2.x - obj1.x;
    var yDist = obj2.y - obj1.y;
    return Math.atan2(yDist, xDist);
  };

  RailShooter.Util.variate = function(value, precision){
    return (1 + (0.5 - Math.random()) * precision) * value;
  };

  RailShooter.Util.angleVector = function(angle, magnitude){
    var compX = magnitude * Math.cos(angle);
    var compY = magnitude * Math.sin(angle);

    return [compX, compY];
  };

  RailShooter.Util.angleDistance = function(coord, angle, distance){
    var compX = distance * Math.cos(angle);
    var compY = distance * Math.sin(angle);

    return [coord[0] + compX, coord[1] + compY];
  };

  RailShooter.Util.findVector = function(obj1, obj2, speed){
    var angle = RailShooter.Util.angle(obj1, obj2);

    var yVel = speed * Math.sin(angle);
    var xVel = speed * Math.cos(angle);

    return [xVel, yVel];
  };

  RailShooter.Util.findRandomizedVector = function(obj1, obj2, speed, rFactor){
    var angle = RailShooter.Util.angle(obj1, obj2) *
      (1 + ((0.5 - Math.random()) * rFactor));

    var yVel = speed * Math.sin(angle);
    var xVel = speed * Math.cos(angle);

    return [xVel, yVel];
  };

})()
