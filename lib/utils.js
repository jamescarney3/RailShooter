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

  RailShooter.Util.distance = function(pos1, pos2){
    var xSquared = Math.pow(pos1[0] - pos2[0], 2);
    var ySquared = Math.pow(pos1[1] - pos2[1], 2);
    var distance = Math.pow((xSquared + ySquared), 0.5);
    return distance;
  };

})()
