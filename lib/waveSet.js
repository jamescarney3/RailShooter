(function(){
  if(typeof window.RailShooter === "undefined"){
    window.RailShooter = {};
  };

  RailShooter.WaveSet = {};

  Wedge = RailShooter.Wedge = function(game, options){
      this.game = game;
      this.mods = {};
      this.group = [];

      if(options){
        if(options.shotRateMod){ this.mods["shotRateMod"] = options.shotRateMod};
        if(options.hitPointMod){this.mods["hitPointMod"] = options.hitPointMod};
        if(options.accuracyMod){ this.mods["accuracyMod"] = options.accuracyMod};
        if(options.shotVelMod){ this.mods["shotVelMod"] = options.shotVelMod};
      };
  };
  RailShooter.Util.inherits(Wedge, RailShooter.Wave);
  RailShooter.WaveSet.wedge = Wedge;

  Wedge.prototype.build = function(){
    var ef1 = new RailShooter.EnemyFast(250, -200, this.game, {
      entryScript: RailShooter.EntryScripts.goToDecel,
      entryScriptOptions: {destination: [250, 250], factor: .015}
      });

    var ef2 = new RailShooter.EnemyFast(100, -200, this.game, {
      entryScript: RailShooter.EntryScripts.goToDecel,
      entryScriptOptions: {destination: [230, 245], factor: .015}
      });

    var ef3 = new RailShooter.EnemyFast(-50, -200, this.game, {
      entryScript: RailShooter.EntryScripts.goToDecel,
      entryScriptOptions: {destination: [210, 240], factor: .015}
      });

    var ef4 = new RailShooter.EnemyFast(400, -200, this.game, {
      entryScript: RailShooter.EntryScripts.goToDecel,
      entryScriptOptions: {destination: [270, 245], factor: .015}
      });

    var ef5 = new RailShooter.EnemyFast(550, -200, this.game, {
      entryScript: RailShooter.EntryScripts.goToDecel,
      entryScriptOptions: {destination: [290, 240], factor: .015}
      });

    this.group = [ef1, ef2, ef3, ef4, ef5];
  };

  SmallCycle = RailShooter.SmallCycle = function(game, options){
    this.game = game;
    this.mods = {};
    this.group = [];

    if(options){
      if(options.shotRateMod){ this.mods["shotRateMod"] = options.shotRateMod};
      if(options.hitPointMod){this.mods["hitPointMod"] = options.hitPointMod};
      if(options.accuracyMod){ this.mods["accuracyMod"] = options.accuracyMod};
      if(options.shotVelMod){ this.mods["shotVelMod"] = options.shotVelMod};
    };
  };
  RailShooter.Util.inherits(SmallCycle, RailShooter.Wave);
  RailShooter.WaveSet.SmallCycle = SmallCycle;

  SmallCycle.prototype.build = function(){
    var es1 = new RailShooter.EnemySmall(250, -300, this.game, {
      entryScript: RailShooter.EntryScripts.goToDirectInSteps,
      entryScriptOptions: {origin: [250, -300], destination: [100, 100], steps: 250},
      holdingScript: RailShooter.HoldingScripts.coordSequence,
      holdingScriptOptions: {steps: 150, coords: [
        [100, 100],
        [400, 100],
        [400, 200],
        [100, 200]
      ]}
    });
    var es2 = new RailShooter.EnemySmall(250, -300, this.game, {
      entryScript: RailShooter.EntryScripts.goToDirectInSteps,
      entryScriptOptions: {origin: [250, -300], destination: [400, 100], steps: 250},
      holdingScript: RailShooter.HoldingScripts.coordSequence,
      holdingScriptOptions: {steps: 150, coords: [
        [400, 100],
        [400, 200],
        [100, 200],
        [100, 100]
      ]}
    });
    var es3 = new RailShooter.EnemySmall(250, -300, this.game, {
      entryScript: RailShooter.EntryScripts.goToDirectInSteps,
      entryScriptOptions: {origin: [250, -300], destination: [400, 200], steps: 250},
      holdingScript: RailShooter.HoldingScripts.coordSequence,
      holdingScriptOptions: {steps: 150, coords: [
        [400, 200],
        [100, 200],
        [100, 100],
        [400, 100]
      ]}
    });
    var es4 = new RailShooter.EnemySmall(250, -300, this.game, {
      entryScript: RailShooter.EntryScripts.goToDirectInSteps,
      entryScriptOptions: {origin: [250, -300], destination: [100, 200], steps: 250},
      holdingScript: RailShooter.HoldingScripts.coordSequence,
      holdingScriptOptions: {steps: 150, coords: [
        [100, 200],
        [100, 100],
        [400, 100],
        [400, 200]
      ]}
    });

    this.group = [es1, es2, es3, es4];
  };

  MediumQuad = RailShooter.MediumQuad = function(game, options){
    this.game = game;
    this.mods = {};
    this.group = [];

    if(options){
      if(options.shotRateMod){ this.mods["shotRateMod"] = options.shotRateMod};
      if(options.hitPointMod){this.mods["hitPointMod"] = options.hitPointMod};
      if(options.accuracyMod){ this.mods["accuracyMod"] = options.accuracyMod};
      if(options.shotVelMod){ this.mods["shotVelMod"] = options.shotVelMod};
    };
  };
  RailShooter.Util.inherits(MediumQuad, RailShooter.Wave);
  RailShooter.WaveSet.mediumQuad = MediumQuad;

  MediumQuad.prototype.build = function(){
    var em1 = new RailShooter.EnemyMedium(-100, 50, this.game, {
      entryScript: RailShooter.EntryScripts.goToDecel,
      entryScriptOptions: {destination: [450, 50], factor: .015}
      });
    var em2 = new RailShooter.EnemyMedium(600, 100, this.game, {
      entryScript: RailShooter.EntryScripts.goToDecel,
      entryScriptOptions: {destination: [50, 100], factor: .015}
      });
    var em3 = new RailShooter.EnemyMedium(-100, 150, this.game, {
      entryScript: RailShooter.EntryScripts.goToDecel,
      entryScriptOptions: {destination: [450, 150], factor: .015}
      });
    var em4 = new RailShooter.EnemyMedium(600, 200, this.game, {
      entryScript: RailShooter.EntryScripts.goToDecel,
      entryScriptOptions: {destination: [50, 200], factor: .015}
      });

    this.group = [em1, em2, em3, em4];
  };

})()
