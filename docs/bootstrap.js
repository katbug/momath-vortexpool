var P5Behavior = /** @class */ (function () {
    function P5Behavior(sketch) {
        this.sketch = sketch;
    }
    /* Should be called from/as Behavior.init */
    P5Behavior.prototype.init = function (container) {
        var _this = this;
        this.p5 = window;
        this.setup.call(this.p5, this.p5);
        /*
        this.p5 = new p5(function (p) {
            _this.p5 = p;
            if (_this.preload)
                p.preload = _this.preload.bind(p, p);
            if (_this.sketch)
                _this.sketch(p);
            if (!p.draw) {
                p.draw = function () { };
                p.noLoop();
            }
        }, container, true);
        */
    };
    /* Should be called from/as Behavior.render */
    P5Behavior.prototype.render = function (floor) {
        if (this.draw)
            this.p5.draw = this.draw.bind(this.p5, floor, this.p5);
        this.p5.draw(); // this.p5.redraw();
    };
    return P5Behavior;
}());

