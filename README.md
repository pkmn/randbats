[Automatically updating repository](https://simonwillison.net/2020/Oct/9/git-scraping/) containing
the latest options for Pokémon Showdown's standard Random Battle formats. Every
[hour](https://github.com/pkmn/randbats/tree/main/.github/workflows/update.yml) the submodule of
[smogon/pokemon-showdown](https://github.com/smogon/pokemon-showdown) in
[`vendor/`](https://github.com/pkmn/randbats/tree/main/vendor) is synced and the
[`update`](https://github.com/pkmn/randbats/tree/main/update) script generates 100,000 teams for
each of the supported Random Battles formats, outputting the set options from the aggregated results
to [`data/`](https://github.com/pkmn/randbats/tree/main/data). These can be accessed via
`https://data.pkmn.cc/randbats/`, e.g.
[https://data.pkmn.cc/randbats/gen8randombattle.json](https://data.pkmn.cc/randbats/gen8randombattle.json).
[`data/stats/`](https://github.com/pkmn/randbats/tree/main/data/stats) which can be accessed via
`https://data.pkmn.cc/randbats/stats`, also exists and provides further details on the how often the
various options occured during the simulation.

The data provided here is used by various popular applications such as [Pokémon Showdown's Damage
Calculator](https://calc.pokemonshowdown.com/) and the
[Showdex](https://github.com/doshidak/showdex) and [Pokémon Showdown Randbats
Tooltip](https://github.com/pkmn/randbats/tree/main/extension) browser extensions.
[https://data.pkmn.cc](https://data.pkmn.cc) also serves [Smogon](https://smogon.com) data, see
[https://github.com/pkmn/smogon](https://github.com/pkmn/smogon) for more details.
