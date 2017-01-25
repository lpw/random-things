const assert = require( 'assert' )

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

class RandomThingsOnceEach extends RandomThings {
	constructor( ...things ) {
		super( ...things )
	}

	get() {
		const thing = super.get()
		if( thing ) {
			this._things = this._things.filter( t => t != thing )
		}
		return thing
	}
}

class RandomThingsOnceEachAndRepeat extends RandomThings {
	constructor( ...things ) {
		super( ...things )
		this._originalThings = things
	}

	get() {
		const thing = super.get()
		if( thing ) {
			this._things = this._things.filter( t => t != thing )
		} else {
			this._things = this._originalThings
			return this.get()
		}
		return thing
	}
}

class RandomThingsOnceEachAndRepeatSame extends RandomThings {
	constructor( ...things ) {
		super( ...things )
		this._orderedThings = []
		this._index = 0
	}

	get() {
		if( this._things.length > 0 ) {
			const thing = super.get()
			assert( thing )
			this._things = this._things.filter( t => t != thing )
			this._orderedThings.push( thing )
			return thing
		} else {
			return this._orderedThings[ this._index++ % this._orderedThings.length ]
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
