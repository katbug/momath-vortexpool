# MoMath Hackathon 2018: Vortex Pool

* Project category: Math Square
* Team members:
    * Azeem Bande-Ali
    * Steven Gomez
    * Kathryn Grunewald
    * Danny Guo

<img src="https://en.wikipedia.org/wiki/Vortex#/media/File:Airplane_vortex_edit.jpg">

## The Math

> In fluid dynamics, a [vortex](https://en.wikipedia.org/wiki/Vortex) is a
> region in a fluid in which the flow revolves around an axis line, which may
> be straight or curved. Vortices form in stirred fluids, and may be observed
> in smoke rings, whirlpools in the wake of boats, or the winds surrounding a
> tornado or dust devil.

## The Submission

Our math square behavior visually simulates the effects of multiple vortexes
on a moving field of particles (which could represent water, wind, etc.).

Vortexes can merge when they get close enough, creating an extra-large vortex
that produces a noticeably stronger force.

Vortexes can spin in either a clockwise or counterclockwise direction.

Each particle has a trailing line behind it, and the length of the line
represents the velocity of the particle. This makes it particularly clear when
a particle speeds up when it gets close to the vortex.

We also added rainbow colors to the particles to make the visual effects more
obvious.

We think kids will enjoy this behavior because they can stand in the middle of
the field, creating their own vortex and allowing them to experiment with how
they can affect the flow of particles.

## Development

Run `$ npm install` to install dependencies.

Run `$ npm run build` to build `vortex-pool.js`.

You can also run `$ npm run build:watch` to automatically rebuild when you
change source files.

Create a symlink to `vortex-pool.js` in the `behs` directory in the [Math
Square](https://github.com/momath/math-square) directory.

## License

MIT
