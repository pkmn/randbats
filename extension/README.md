<p align="center">
  <img alt="extension" src="https://pkmn.cc/chrome.png" />
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

This extension takes advantage of the fact that in practice a Pokémon's abilities and items are
actually limited. The move pool displayed by the extension is guaranteed be a superset of what is
returned by Pokémon Showdown's existing `/randbats mon, gen` command. Stats are slightly fuzzier -
Max `HP` is elided as this stat is adjusted during set generation to hit optimal recovery or chip
numbers and is impossible to infer in most scenarios without knowing the full set. `Atk` can be
adjusted to minimize confusion damage and `Spe` can be adjusted if certain speed-related moves
(Gyro Ball, Trick Room, etc) are included in the set and so are italicized in most cases to indicate
they are not necessarily always exact (though in the cases where they *are* known to be fixed they
are not italicized). Sets with Hidden Power in earlier gens may also have had their IVs adjusted to
account for the move.

## Install

- [Chrome](https://chrome.google.com/webstore/detail/pok%C3%A9mon-showdown-randbats/iboincafmiolbldihenlnpjlgeggpgdp)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/pkmn-randbats-tooltip/)

## Caveats

Due to Pokémon Showdown's release process, the **information in the tooltip can be stale for up to
an hour if changes to the Random Battle team generation logic are hotpatched immediately after being
committed**. This should rarely be consequential in practice, though may explain any discrepancies
that may crop up. Before reporting any bugs related to the possible set options, please confirm that
you are not simply dealing with this stale data scenario.

Furthermore, due to how the set generation logic used by Pokémon Showdown is based off of
battle-only formes, it may not always be possible to disambiguate which forme's set to display in
the tooltip (eg. Darmanitan-Galar vs. Darmanitan-Galar-Zen while the Pokémon is in Darmanitan-Galar
forme) - in these cases, multiple set options will be displayed.

This extension was written to have no impact on tooltips in non-random formats and to gracefully
degrade in scenarios where data is unavailable, however, extensions can be inherently problematic
when it comes to reporting bugs. If you notice any UI inconsistencies anywhere within Pokémon
Showdown, please do the developers a favor and attempt to reproduce the error after disabling all
extensions to rule out the possibility that interaction between extensions is causing issues.
