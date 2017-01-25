# random-things

## Quick example
after
```
npm i random-things
```
then
```
const {RandomThings} = require( 'random-things' )

const randomColors = new RandomThings( 'red', 'green', 'blue', 'yellow' )

const randomColor1 = randomColors.get()  // will be one of 'red', 'green', 'blue', 'yellow'
const randomColor2 = randomColors.get()  // will be one of 'red', 'green', 'blue', 'yellow'
```
## More usages
This module exports these classes:
```
module.exports = {
	RandomThings,
	RandomThingsNoBackToBack,
	RandomThingsOnceEach,
	RandomThingsOnceEachAndRepeat,
	RandomThingsOnceEachAndRepeatSame
}
```
where a ```get()``` call on an instance of an object from any of these classes will return one of the things passed into its constructor, with various behaviors for each class.

### RandomThings
Simply returns one of the things at random form those things passed into the constructor.

### RandomThingsNoBackToBack
Returns one of the things with the guarantee it will not be the same as the previous get.

### RandomThingsOnceEach
Returns one of the things with the guarantee that each thing will be returned.  Once each of the things have been returned, upon the next get, undefined will be returned.

### RandomThingsOnceEachAndRepeat
Returns one of the things with the guarantee that each thing will be returned.  Once each of the things have been returned, one of those same things will be returned from a new random sequence of those same things.

### RandomThingsOnceEachAndRepeatSame
Returns one of the things with the guarantee that each thing will be returned.  Once each of the things have been returned, one of those same things will be returned from a the same sequence of those previosly returned things.

## Misc
This module is isomorphic.

This module uses ES6 features like spread operator and destructuring assignment.

If your things are already in an array and you want to keep them that way, spread them into the constructor with the spread operator like:
```
const randomColors = new RandomThings( ...[ 'red', 'green', 'blue', 'yellow' ] )
```

## Module devs: install, lint, and test of random-things
```
npm install
```
```
npm run lint
```
```
npm run test
```
