(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  var Wave = RailShooter.Wave = function(options){
    this.game = options.game;
    this.stage = game.stage;
    this.step = 1;
    this.enemies = {
      fast: [
        new RailShooter.EnemyFast({x: 50, y: -50, game: this.game}),
        new RailShooter.EnemyFast({x: 100, y: -55, game: this.game}),
        new RailShooter.EnemyFast({x: 150, y: -60, game: this.game}),
        new RailShooter.EnemyFast({x: 200, y: -65, game: this.game}),
        new RailShooter.EnemyFast({x: 250, y: -70, game: this.game}),
        new RailShooter.EnemyFast({x: 300, y: -75, game: this.game}),
        new RailShooter.EnemyFast({x: 350, y: -80, game: this.game}),
        new RailShooter.EnemyFast({x: 400, y: -85, game: this.game})
      ],
      small: [
        new RailShooter.EnemySmall({x: 50, y: -50, game: this.game}),
        new RailShooter.EnemySmall({x: 100, y: -50, game: this.game}),
        new RailShooter.EnemySmall({x: 400, y: -50, game: this.game}),
        new RailShooter.EnemySmall({x: 450, y: -50, game: this.game}),
      ]
    };
    var wave = this;
  };

})()
