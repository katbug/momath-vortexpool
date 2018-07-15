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

    move() {
        const [x, y] = this._position;
        this._position = [x + this._velocity[0], y + this._velocity[1]];
        return this._position;
    }

    accelerate(xDelta, yDelta) {
        const [xSpeed, ySpeed] = this._velocity;
        this._velocity = [xSpeed + xDelta, ySpeed + yDelta];
    }
}
