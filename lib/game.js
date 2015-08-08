(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };
  var Game = RailShooter.Game = function(){
    this.stage = new createjs.Stage("canvas");
    this.stage.width = window.$("#canvas").width();
    this.stage.height = window.$("#canvas").height();

    this.enemies = [];

    var sampleEnemy = new RailShooter.EnemyMedium({
      x: 100,
      y: 100
    });

    this.stage.addChild(sampleEnemy);
    this.stage.update();
  };

})()
