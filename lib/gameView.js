(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  var GameView = RailShooter.GameView = function(){
    this.stage = new createjs.Stage("canvas");
    this.stage.width = window.$("#canvas").width();
    this.stage.height = window.$("#canvas").height();

    this.$viewPort = $(document).find("console");

    this.starField = new RailShooter.StarField({
      stage: this.stage
    });

    createjs.Ticker.setInterval(17);
    createjs.Ticker.addEventListener("tick", this.stage);


    this.$viewPort.find("#new-game").on("click", function(){
      this.startGame();
    }.bind(this));
  };

  GameView.prototype.startGame = function(event){
    this.$viewPort.find("overlay").css({"visibility": "hidden", "opacity": "0"});
    var game = new RailShooter.Game(this, this.stage).play();
  };

  GameView.prototype.setLives = function(lives){
    this.$viewPort.find("#lives").html(lives);
  };

  GameView.prototype.setScore = function(points){
    this.$viewPort.find("#score").html(points);
  };

  GameView.prototype.setWave = function(wave){
    this.$viewPort.find("#wave").html(wave);
  };

})()
