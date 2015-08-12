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

    this.$viewPort.find("#controls").on("click", function(){
      this.toggleControls();
    }.bind(this));

    this.$viewPort.find("#about").on("click", function(){
      this.toggleAbout();
    }.bind(this));
  };

  GameView.prototype.startGame = function(){
    this.$viewPort.find("overlay").css({"visibility": "hidden", "opacity": "0"});
    this.game = new RailShooter.Game(this, this.stage);
    this.game.play();
  };

  GameView.prototype.toggleControls = function(){
    var $controlsP = this.$viewPort.find("#controls > p");
    if($controlsP.css("display") == "none"){
      this.$viewPort.find("#about > p").css({"visibility": "hidden",
                      "display": "none",
                      "opacity": "0"});
      $controlsP.css({"visibility": "visible",
                      "display": "block",
                      "opacity": "1"});
    }else{
      $controlsP.css({"visibility": "hidden",
                      "display": "none",
                      "opacity": "0"});
    };
  };

  GameView.prototype.toggleAbout = function(){
    var $controlsP = this.$viewPort.find("#about > p");
    if($controlsP.css("display") == "none"){
      $controlsP.css({"visibility": "visible",
                      "display": "block",
                      "opacity": "1"});
      this.$viewPort.find("#controls > p").css({"visibility": "hidden",
                      "display": "none",
                      "opacity": "0"});
    }else{
      $controlsP.css({"visibility": "hidden",
                      "display": "none",
                      "opacity": "0"});
    };
  };

  GameView.prototype.setLives = function(lives){
    this.$viewPort.find("#lives").html(lives);
  };

  GameView.prototype.setScore = function(points){
    this.$viewPort.find("#score").html(points);
  };

  GameView.prototype.incrementWave = function(){
    this.$viewPort.find("#wave").html(parseInt(this.$viewPort.find("#wave").html()) + 1);
  };

  GameView.prototype.resetWave = function(){
    this.$viewPort.find("#wave").html(0);
  };

})()
