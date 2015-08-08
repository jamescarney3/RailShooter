(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  var GameView = RailShooter.GameView = function(game, stage){
    this.game = game;
    this.stage = stage;
  };

  GameView.prototype.start = function(){
    var game = this.game;
    var stage = this.stage;
    createjs.Ticker.setInterval(17);
    createjs.Ticker.addEventListener("tick", stage);
  };

})()
