<p align="center">
  <img alt="extension" src="https://pkmn.cc/screenshot.png" />
</p>

# Pokémon Showdown Randbats Tooltip

Enhanced tooltip functionality for Pokémon Showdown Random Battle formats. This extension relies on
data from https://pkmn.github.io/randbats/ which is an automatically updating repository of the
latest options for Pokémon Showdown's standard Random Battle formats and is the same source that
provides data to [Pokémon Showdown's Random Battle Damage
Calculator](https://calc.pokemonshowdown.com/randoms.html?mode=randoms).  More precise information
about a Pokémon's possible abilities, items, moves, and stats are presented in addition to the
standard tooltip information provided by Pokémon Showdown. All formats with 'Random' in their name
should be supported (all generations, Singles/Doubles/Free-For-All/Multi, Unrated, Monotype, Let's
Go, etc - but not Challenge Cup, Battle Factory, SSB, etc), and the additional tooltip information
should be present on any Pokémon which would otherwise only have partial data (ie. any player's
Pokémon/revealed team while spectating and your opponent's Pokémon/revealed team while battling).

## Install

- [Chrome](https://chrome.google.com/webstore/category/extensions)
- [Firefox](https://addons.mozilla.org/en-US/firefox/extensions/)

## Caveats

Due to Pokémon Showdown's release process, the **information in the tooltip can be stale for up to
an hour if changes to the Random Battle team generation logic are hotpatched immediately after being
committed**. This should rarely be consequential in practice, though may explain any discrepancies
that may crop up. Before reporting any bugs related to the possible set options, please confirm that
you are not simply dealing with this stale data scenario.

Furthermore, due to how the set generation logic used by Pokémon Showdown is based off of
battle-only formes, it may not always be possible to disambiguate which formes set to display in the
tooltip (eg. Darmanitan-Galar vs. Darmanitan-Galar-Zen while the Pokémon is in Darmanitan-Galar
forme) - in these cases, multiple set options will be displayed.
