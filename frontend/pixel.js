/*  ##############################################
    #####   Only handwritten code allowed.   #####
    ########################################### */

/**
 * 
 */
export default class Pixel {

    constructor(position) {
        this.position = position;   // int array [row, col]
        this.state = false;         // bool

        const cornerSE = new Corner(this, 0);
        const cornerNE = new Corner(this, 1);
        const cornerNW = new Corner(this, 2);
        const cornerSW = new Corner(this, 3);
        this.corners = [cornerSE, cornerNE, cornerNW, cornerSW];
    }

    tS() {return `(${this.position[0]}, ${this.position[1]})`;}

    getPosition() {return this.position;}

    // Position is set at construction.

    getState() {return this.state;}

    _setState(state) {this.state = state;}

    getCorners() {return this.corners;}

    // Corners are set at construction.

    getCorner(orientation) {
        return(this.corners[orientation]);
    }

    toggleState() {this._setState(!this.state);}

    toString() {

        let statesString = "";

        statesString += `"${this.position}": {`;
        statesString += `"state": ${this.getState()},`;
        statesString += `"SE": ${this.getCorner(0).getState()},`;
        statesString += `"NE": ${this.getCorner(1).getState()},`;
        statesString += `"NW": ${this.getCorner(2).getState()},`;
        statesString += `"SW": ${this.getCorner(3).getState()},`;
        statesString += `}`;

        return statesString;
    }
}

class Corner {

    constructor(pixel, orientation) {
        this.pixel = pixel;
        this.orientation = orientation;

        this.state = false;

        this.neighbours = [null, null];
    }

    getPixel() {return this.pixel;}

    // Pixel is only set at construction.

    getOrientation() {return this.orientation;}

    // Orientation is only set at construction.

    getState() {return this.state;}

    _setState(state) {this.state = state;}

    getNeighbours() {return this.neighbours;}

    setNeighbours(neighbourR, neighbourL) {
        const nR = neighbourR ?? this.getNeighbours()[0];
        const nL = neighbourL ?? this.getNeighbours()[1];
        this.neighbours = [nR, nL];
    }

    getNeighboursStates() {

        const o = this.getOrientation();

        //const stateR = this.getNeighbours()[0]?.getState();
        const stateM = this.getNeighbours()[0]?.getCorner((o+1)%4).getNeighbours()[0]?.getState();
        //const stateL = this.getNeighbours()[1]?.getState();

        return stateM;//[stateR, stateM, stateL];
    }

    toggleState() {this._setState(!this.getState());}
}