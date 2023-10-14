# secure-random-number

Math.random, but slightly more unpredictable!

## What?

Math.random isn't actually random, and is, in-fact, very predictable. This library uses NodeJS's built-in `crypto` module or `crypto.getRandomValues()` on web browsers for "unpredictable" randomness.

## Yeah, but something like this already exists, right?

Right, _however_ they tend to create a random uint32, then divide it by 2 \*\* 32. Which means only (2 \*\* 32 - 1) possible values, at a range from 0 to 0.9999999997671694. Which is GROSS, and DISGUSTING. This library works by filling a 64-bit float's entire 52-bit mantissa with random values! Which allows for 2 \*\* 52 (ish) possible values, at a range from 0 to 0.9999999999999998! Which, while not perfect, is a whole lot better.

Note: I made this package years ago but never published it for some reason.
