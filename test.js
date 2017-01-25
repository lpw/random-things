const expect = require('chai').expect

const {
	RandomThings,
	RandomThingsNoBackToBack,
	RandomThingsOnceEach,
	RandomThingsOnceEachAndRepeat,
	RandomThingsOnceEachAndRepeatSame
} = require( './' )

describe( 'RandomThings', function() {

	it( 'RandomThings returns one of the things', function() {
		const randomThings = new RandomThings( 'red', 'green', 'blue', 'yellow' )
		const thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
	})

	it( 'RandomThingsNoBackToBack never returns the same thing twice in a row', function() {
		const randomThings = new RandomThingsNoBackToBack( 'red', 'green', 'blue', 'yellow' )
		let lastThing = randomThings.get()
		for( let i = 0 ; i < 100 ; i++ ) {
			const nextThing = randomThings.get()
			expect( lastThing ).to.not.equal( nextThing )
			lastThing = nextThing
		}
	})

	it( 'RandomThingsNoBackToBack should crash with only one thing', function() {
		expect( () => new RandomThingsNoBackToBack( 'red' ) ).to.throw()
	})

	it( 'RandomThingsOnceEach returns one of each of the things then undefined', function() {
		const randomThings = new RandomThingsOnceEach( 'red', 'green', 'blue', 'yellow' )
		const set = new Set()
		let thing

		// for each item, get should return one of them, and accumulate in set
		thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		expect( thing ).to.not.be.oneOf( Array.from( set ) )
		set.add( thing )

		thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		expect( thing ).to.not.be.oneOf( Array.from( set ) )
		set.add( thing )

		thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		expect( thing ).to.not.be.oneOf( Array.from( set ) )
		set.add( thing )

		thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		expect( thing ).to.not.be.oneOf( Array.from( set ) )
		set.add( thing )

		// last one should be undefined, and account for all items to be in set
		thing = randomThings.get()
		expect( thing ).to.be.undefined
		expect( set.size ).to.equal( 4 )
		for( t in set ) {
			expect( t ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		}
	})

	it( 'RandomThingsOnceEachAndRepeat returns one of each of the things then cycles', function() {
		const randomThings = new RandomThingsOnceEachAndRepeat( 'red', 'green', 'blue', 'yellow' )
		const set = new Set()
		let thing

		// for each item, get should return one of them, and accumulate in set
		thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		expect( thing ).to.not.be.oneOf( Array.from( set ) )
		set.add( thing )

		thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		expect( thing ).to.not.be.oneOf( Array.from( set ) )
		set.add( thing )

		thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		expect( thing ).to.not.be.oneOf( Array.from( set ) )
		set.add( thing )

		thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		expect( thing ).to.not.be.oneOf( Array.from( set ) )
		set.add( thing )

		// after all items have been gotten, should get anotgher one that'll already be in set
		thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		expect( thing ).to.be.oneOf( Array.from( set ) )
	})

	it( 'RandomThingsOnceEachAndRepeatSame returns one of each of the things then cycles the same again', function() {
		const randomThings = new RandomThingsOnceEachAndRepeatSame( 'red', 'green', 'blue', 'yellow' )
		const array = []
		let index = 0
		let thing

		// for each item, get should return one of them, and accumulate in set
		thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		expect( thing ).to.not.be.oneOf( array )
		array[ index++ ] = thing

		thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		expect( thing ).to.not.be.oneOf( array )
		array[ index++ ] = thing

		thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		expect( thing ).to.not.be.oneOf( array )
		array[ index++ ] = thing

		thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		expect( thing ).to.not.be.oneOf( array )
		array[ index++ ] = thing

		// for each item, get should return one of them, in the same order as before
		index = 0
		thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		expect( thing ).to.be.oneOf( array )
		expect( array[ index++ ] ).to.be.equal( thing )

		thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		expect( thing ).to.be.oneOf( array )
		expect( array[ index++ ] ).to.be.equal( thing )

		thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		expect( thing ).to.be.oneOf( array )
		expect( array[ index++ ] ).to.be.equal( thing )

		thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
		expect( thing ).to.be.oneOf( array )
		expect( array[ index++ ] ).to.be.equal( thing )
	})

	// just test bullet-proofing of edge cases in all types
	context( 'does not crash with no things and returns undefined', function() {
		for( type of [
				RandomThings,
				RandomThingsNoBackToBack,
				RandomThingsOnceEach,
				RandomThingsOnceEachAndRepeat,
				RandomThingsOnceEachAndRepeatSame
		 ] ) {
			it( `${type.name}`, function() {
				const randomThings = new type()
				const thing = randomThings.get()
				expect( thing ).to.be.undefined
			})
		}
	})

	// just test bullet-proofing of edge cases in all types
	context( 'does not crash with one thing and returns that thing', function() {
		for( type of [
				RandomThings,
				RandomThingsNoBackToBack,
				RandomThingsOnceEach,
				RandomThingsOnceEachAndRepeat,
				RandomThingsOnceEachAndRepeatSame
		 ] ) {
			it( `${type.name}`, function() {
				const randomThings = new type( 'red' )
				const thing = randomThings.get()
				expect( thing ).to.be.oneOf([ 'red' ])
			})
		}
	})

	it( 'RandomThings returns one of the things when things are passed as an array into the constructor', function() {
		const randomThings = new RandomThings( ...[ 'red', 'green', 'blue', 'yellow' ] )
		const thing = randomThings.get()
		expect( thing ).to.be.oneOf([ 'red', 'green', 'blue', 'yellow' ])
	})

})