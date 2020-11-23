[Automatically updating repository](https://simonwillison.net/2020/Oct/9/git-scraping/) containing
the latest options for Pokémon Showdown's standard Random Battle formats. Every
[hour](https://github.com/pkmn/randbats/tree/main/.github/workflows/update.yml) the submodule of
[smogon/pokemon-showdown](https://github.com/smogon/pokemon-showdown) in
[`vendor/`](https://github.com/pkmn/randbats/tree/main/vendor) is synced and the
[`update`](https://github.com/pkmn/randbats/tree/main/update) script generates 100,000 teams for
each of the supported Random Battles formats, outputting the aggregated results to
[`data/`](https://github.com/pkmn/randbats/tree/main/data). These can be accessed via
`https://pkmn.github.io/randbats/data/`, e.g.
[https://pkmn.github.io/randbats/data/gen8randombattle.json](https://pkmn.github.io/randbats/data/gen8randombattle.json).
