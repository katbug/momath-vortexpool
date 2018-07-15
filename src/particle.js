export default class Particle {
    /* color is a 3 element array representing a HSV value
       position is a 2 element array representing the X and Y coordinates
       velocity is a 2 element array representing the speed in each direction */
    constructor(color, position, velocity) {
        this._color = color;
        this._position = position;
        this._velocity = velocity;
    }

    get color() {
        return this._color;
    }

    get position() {
        return this._position;
    }

    get velocity() {
        return this._velocity;
    }

    set color(value) {
        this._color = value;
    }

    set position(value) {
        this._position = value;
    }

    set velocity(value) {
        this._velocity = value;
    }

    move(newVelocity) {
        const [x, y] = this._position;
        this._position = [x + newVelocity[0], y + newVelocity[1]];
        this._velocity = newVelocity;
        return this._position;
    }
}
