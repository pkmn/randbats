var TOOLTIPMOVE = undefined;
try { TOOLTIPMOVE = BattleTooltips.prototype.showMoveTooltip; } catch {}

if (TOOLTIP&&TOOLTIPMOVE) {
  BattleTooltips.prototype.showMoveTooltip = function (clientMove, serverMove, clientPokemon, serverPokemon) {
    var original = TOOLTIPMOVE.apply(this, arguments);
    try {
      if(clientMove.basePower == 0 ||clientMove.basePower == null || clientMove.basePower > undefined){
        return original;
      }
      var farSide = this.battle.farSide;
      var mySide = this.battle.mySide;
      var enemy = farSide.active[0];
      var me = mySide.active[0];
      var format = toID(this.battle.tier);
      if (!format || !format.includes('random')) return original;


      var speciesEnemy = Dex.species.get(enemy.speciesForme);
      if (!speciesEnemy) return original;
      var speciesMe = Dex.species.get(me.speciesForme);
      if (!speciesMe) return original;

      var gen = Number(format.charAt(3));
      var letsgo = format.includes('letsgo');
      var champions = format.includes('champions');
      var gameType = this.battle.gameType;

      if (!['singles', 'doubles'].includes(gameType)) {
        format = 'gen' + gen + (champions ? 'champions' : '') + 'randomdoublesbattle';
      } else if (format.includes('monotype') || format.includes('unrated')) {
        format = 'gen' + gen + (champions ? 'champions' : '') + 'randombattle';
      } else if (format.endsWith('blitz')) {
        format = format.slice(0, -5);
      }
      if (!DATA[format]) return original;


      // Enemy Stats
      var dataEnemy = DATA[format][speciesEnemy.name === 'Zoroark' ? 0 : enemy.level];
      if (!dataEnemy) return original;

      var cosmetic = speciesEnemy.cosmeticFormes && speciesEnemy.cosmeticFormes.includes(speciesEnemy.name);
      var idEnemy = toID((speciesEnemy.forme === 'Gmax' || cosmetic)
        ? speciesEnemy.baseSpecies : speciesEnemy.battleOnly || speciesEnemy.name);
      if (idEnemy.startsWith('pikachu')) idEnemy = idEnemy.endsWith('gmax') ? 'pikachugmax' : 'pikachu';
      var forme = cosmetic ? speciesEnemy.baseSpecies : enemy.speciesForme;
      if (forme.startsWith('Pikachu')) forme = forme.endsWith('Gmax') ? 'Pikachu-Gmax' : 'Pikachu';

      dataEnemy = dataEnemy[idEnemy];
      if (!dataEnemy) return original;





      // Me
      //var statsEnemy = getStats(gen, gameType, letsgo, speciesEnemy, dataEnemy[0], null , this.getPokemonTypes(enemy),enemy);

      var dataMe = DATA[format][speciesMe.name === 'Zoroark' ? 0 : me.level];
      if (!dataMe) return original;

      var cosmetic = speciesMe.cosmeticFormes && speciesMe.cosmeticFormes.includes(speciesMe.name);
      var idMe = toID((speciesMe.forme === 'Gmax' || cosmetic)
        ? speciesMe.baseSpecies : speciesMe.battleOnly || speciesMe.name);
      if (idMe.startsWith('pikachu')) idMe = idMe.endsWith('gmax') ? 'pikachugmax' : 'pikachu';
      var forme = cosmetic ? speciesMe.baseSpecies : me.speciesForme;
      if (forme.startsWith('Pikachu')) forme = forme.endsWith('Gmax') ? 'Pikachu-Gmax' : 'Pikachu';
      dataMe = dataMe[idMe];
      if (!dataMe) return original;
      var buf = original;

      const calcGen = calc.Generations.get(gen);

      function getStats(stats, data, pokemonBoosts) {
        var evs = {};
        var ivs = {};
        var boosts = {};
        //todo
        if(Object.keys(pokemonBoosts).length != 0){
          for (var stat in stats) {
            ivs[stat] = 'ivs' in data && stat in data.ivs ? data.ivs[stat] : (gen < 3 ? 30 : 31);
            evs[stat] = 'evs' in data && stat in data.evs ? data.evs[stat] : (gen < 3 ? 255 : letsgo ? 0 : champions ? 11 : 85);
            if (pokemonBoosts[stat]) boosts[stat] = pokemonBoosts[stat];
          }
        } else {
          for (var stat in stats) {
            ivs[stat] = 'ivs' in data && stat in data.ivs ? data.ivs[stat] : (gen < 3 ? 30 : 31);
            evs[stat] = 'evs' in data && stat in data.evs ? data.evs[stat] : (gen < 3 ? 255 : letsgo ? 0 : champions ? 11 : 85);
          }
        }
        return {evs,ivs,boosts}
      }

      const statsMe = getStats(speciesMe.baseStats, dataMe[0], clientPokemon.boosts);
      const statsEnemy = getStats(speciesEnemy.baseStats, dataEnemy[0], enemy.boosts);

      const result = calc.calculate(
        calcGen,
        new calc.Pokemon(calcGen, speciesMe.name, {
          item: BattleItems[serverPokemon.item].name,
          ability: BattleAbilities[serverPokemon.baseAbility].name,
          level: dataMe[0].level,
          evs: statsMe["evs"],
          ivs: statsMe["ivs"],
          boosts: statsMe["boosts"]
        }),
        new calc.Pokemon(calcGen, speciesEnemy.name, {
          item: "mail",
          level: dataEnemy[0].level,
          evs: statsEnemy["evs"],
          ivs: statsEnemy["ivs"],
          boosts: statsEnemy["boosts"]
        }),
        new calc.Move(calcGen, clientMove.name),
        new calc.Field({
          attackerSide: {
            isLightScreen: (mySide.sideConditions.auroraveil || mySide.sideConditions.lightscreen) ? true : false,
            isReflect: (mySide.sideConditions.auroraveil || mySide.sideConditions.reflect) ? true : false
          },
          defenderSide: {
            isLightScreen: (farSide.sideConditions.auroraveil || farSide.sideConditions.lightscreen) ? true : false,
            isReflect: (farSide.sideConditions.auroraveil || farSide.sideConditions.reflect) ? true : false
          },
          weather: this.battle.weather,
          terrain: (this.battle.pseudoWeather.lenght!=0) ? this.battle.pseudoWeather[0] : ""
        })
      );

      const dmg = new Array(2);
      dmg[0] = Math.round(parseInt(result["damage"][0])/parseInt(result["defender"]["stats"]["hp"])*1000)/10;
      dmg[1] = Math.round(parseInt(result["damage"][result["damage"].length-1])/parseInt(result["defender"]["stats"]["hp"])*1000)/10;
      console.debug(result);
      /*
      TODO: dynamax and tera
      var bp = clientMove.basePower;
      if(serverMove === 'maxmove'){
        clientMove.basePower = clientMove.maxMove.basePower;
        buf += getItemModi(statsMe,statsEnemy,dataEnemy, dataMe, serverPokemon, me, enemy, this.getPokemonTypes(me), this.getPokemonTypes(enemy),clientMove,this.battle, true)
        clientMove.basePower = bp;
      }
      else{
        buf += getItemModi(statsMe,statsEnemy,dataEnemy, dataMe, serverPokemon, me, enemy, this.getPokemonTypes(me), this.getPokemonTypes(enemy),clientMove,this.battle, false)
      }
      */
      buf += '<div style="border-top: 1px solid #888; background: #dedede">';
      buf += '<p><small>Damage:</small> ' + dmg[0] + '% - ' + dmg[1] + '% </p>';

      return buf;
    } catch(e) {
      console.debug(e);
      return original;
    };
  };
};
