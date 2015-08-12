
LargeZig = RailShooter.LargeZig = function(game, options){
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
RailShooter.Util.inherits(LargeZig, RailShooter.Wave);
RailShooter.WaveSet.mediumQuad = LargeZig;
RailShooter.WaveList.push(LargeZig);

LargeZig.prototype.build = function(){
  var el1 = new RailShooter.EnemyMedium(250, -250, this.game, {
    entryScript: RailShooter.EntryScripts.goToDecel,
    entryScriptOptions: {destination: [50, 200], factor: .015},
    holdingScript: RailShooter.HoldingScripts.coordSequence,
    holdingScriptOptions: {steps: 150, coords: [
      [50, 200],
      [100, 100],
      [150, 200],
      [200, 100],
      [250, 200],
      [300, 100],
      [350, 200],
      [400, 100],
      [450, 200],
      [500, 100],
      [550, 200],
      [500, 100],
      [450, 200],
      [400, 100],
      [350, 200],
      [300, 100],
      [250, 200],
      [200, 100],
      [150, 200],
      [100, 100]
    ]}
    });
  this.group = [el1];
};
