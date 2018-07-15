import {Vector} from 'p5';

class Simulation {
    constructor(paths) {
        this.vortices = paths;
    }

    velocity(p) {
        var vx = 0;
        var vy = 0;
        for(var vortex of this.vortices) {
            let dx = p.x - vortex.x;
            let dy = p.y - vortex.y;
            let strength = vortex.scale * vortex.dir;
            let distSq = (dx*dx + dy*dy);
		    vx += strength * dy / distSq;
			vy += -strength * dx / distSq;
        }
        return new Vector(vx, vy);
    }
}

export default Simulation;