(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  var Starfield = RailShooter.StarField = function (options){
    this.stage = options.stage;

    var starField = this;
    this.stage.addEventListener("tick", function(){
      starField.step();
    });
  };

  Starfield.prototype.step = function(){
    var roll = Math.random();
    if(roll > 0.8){
      var newStar = new createjs.Shape();
      newStar.radius = Math.random() * 1.5;
      newStar.x = Math.random() * this.stage.width;
      newStar.y = 1;

      newStar.graphics.beginFill("#fff").drawCircle(0, 0, newStar.radius);
      this.stage.addChildAt(newStar, 0);

      var stage = this.stage;
      newStar.addEventListener("tick", function(){
        newStar.y += newStar.radius * 3;
        if(newStar.y > stage.height){
          stage.removeChild(newStar);
        }
      })
    };
  };

})()
