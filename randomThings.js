const assert = require( 'assert' )

// helper funcs, perhaps more efficient,
// but might be simpler to just use an array as in RandomThingsOnceEachAndRepeatSame
function objectFromArray( array ) {
		// this._marks = things.reduce( ( marks, thing ) => { ...marks, [ thing ]: null }, {} )
		return array.reduce( ( marks, thing ) => Object.assign( marks, { [ thing ]: null } ), {} )
}
function arrayFromMarkedObject( marks ) {
	// const unmarkedThings = Object.keys( this._marks ).filter( mark => !this._marks[ mark ] )
	return Object.keys( marks ).filter( mark => !marks[ mark ] )
}

class RandomThings {
	constructor( ...things ) {
		this._things = things
	}

	get() {
		const things = this._things
		const length = things.length
		const index = Math.floor( Math.random() * length )
		return this._things[ index ]
	}
}

class RandomThingsNoBackToBack extends RandomThings {
	constructor( ...things ) {
		super( ...things )
		assert( things.length > 1 )	// or should it just return back to back anyways? or undefined?
	}

	get() {
		const thing = super.get()
		if( thing === this._lastThing ) {
			return this.get()
		} else {
			this._lastThing = thing
			return thing
		}
	}
}

// although it extends RandomThings, deosn't really use vase class
class RandomThingsOnceEach extends RandomThings {
	constructor( ...things ) {
		super( ...things )
		this._marks = objectFromArray( things )
	}

	get() {
		const unmarkedThings = arrayFromMarkedObject( this._marks )
		const randomThings = new RandomThings( ...unmarkedThings )
		const thing = randomThings.get()
		if( thing ) {
			this._marks[ thing ] = true
		}
		return thing
	}
}

// although it extends RandomThings, deosn't really use vase class
class RandomThingsOnceEachAndRepeat extends RandomThings {
	constructor( ...things ) {
		super( ...things )
		this._marks = objectFromArray( things )
	}

	get() {
		const unmarkedThings = arrayFromMarkedObject( this._marks )
		const randomThings = new RandomThings( ...unmarkedThings )
		const thing = randomThings.get()
		if( thing ) {
			this._marks[ thing ] = true
		} else {
			this._marks = objectFromArray( this._things )
			return this.get()
		}
		return thing
	}
}

// although it extends RandomThings, deosn't really use vase class
class RandomThingsOnceEachAndRepeatSame extends RandomThings {
	constructor( ...things ) {
		super( ...things )
		this._marks = []
		this._index = 0
	}

	get() {
		const unmarkedThings = this._things.filter( thing => this._marks.indexOf( thing ) < 0 )
		if( unmarkedThings.length > 0 ) {
			const randomThings = new RandomThings( ...unmarkedThings )
			const thing = randomThings.get()
			assert( thing )
			this._marks.push( thing )
			return thing
		} else {
			return this._marks[ this._index++ % this._marks.length ]
		}
	}
}

module.exports = {
	RandomThings,
	RandomThingsNoBackToBack,
	RandomThingsOnceEach,
	RandomThingsOnceEachAndRepeat,
	RandomThingsOnceEachAndRepeatSame
}