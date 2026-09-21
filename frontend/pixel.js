/* ##############################################
 * #####   Only handwritten code allowed.   #####
 * ########################################### */

class Pixel {

    constructor(position, state) {
        this.position = position;
        this.state = state;

        const cornerSE = new Corner(this, "0");
        const cornerNE = new Corner(this, "1");
        const cornerNW = new Corner(this, "2");
        const cornerSW = new Corner(this, "3");
        this.corners = [cornerSE, cornerNE, cornerNW, cornerSW];
    }

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
}

class Corner {

    constructor(pixel, orientation) {
        this.pixel = pixel;
        this.orientation = orientation;

        this.state = false;
    }

    getPixel() {return this.pixel;}

    // Pixel is only set at construction.

    getOrientation() {return this.orientation;}

    // Orientation is only set at construction.

    getState() {return this.state;}

    _setState(state) {this.state = state;}

    getNeighbors() {}

    toggleState() {this._setState(!this.getState());}
}