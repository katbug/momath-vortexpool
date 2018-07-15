/* MoMath Math Square Behavior
 *
 *        Title: Wind Tunnel
 *  Description: wind tunnel simulation
 * Scheduler ID:
 *    Framework: P5
 *       Author:
 *       Status: work in progress
 */

import P5Behavior from 'p5beh';
import Sim from './simulate';

import Particle from './particle';
import {getRainbow} from './colors';

const NUM_POINTS = 50;
const CHORD_LENGTH = 50;//200;
const PARTICLE_RADIUS = 5;
const PARTICLE_DENSITY = 20;
const TIMESCALE = 3;
const TRAILSCALE = 4;
const TRAIL_MAX_LEN_SQ = 30*30;
const pb = new P5Behavior();
const particles = new Set();
const rainbow = getRainbow();

let particleCreationCount = 0;
let DIRECTIONS = {};
function getDir(userId) {
  var dir = DIRECTIONS[userId];
  if (dir === undefined) {
    dir = (Math.random() < 0.5) ? -1 : 1;
    DIRECTIONS[userId] = dir;
    //console.log(`userId = ${userId}, dir = ${dir}`)
  }
  return dir;
}

function createNewParticles(height) {
    if (particleCreationCount < PARTICLE_DENSITY) {
        particleCreationCount++;
        return;
    } else {
        particleCreationCount = 0;
    }

    const color = rainbow.next().value;
    for (let i = 0; i < height; i = i + PARTICLE_DENSITY) {
        const position = [0, i];
        const velocity = [1, 0];
        const particle = new Particle(color, position, velocity);
        particles.add(particle);
    }
}

pb.setup = function (p) {
    this.colorMode(this.HSB);
    createNewParticles(p.height);
};

pb.draw = function (floor, p) {
  this.clear();

  let foils = []

  let boxes = floor.users.map(u => ({
    x: u.x,
    y: u.y,
    scale: CHORD_LENGTH,
    dir: getDir(u.id)
  }));

  boxes = mergeBoxes(boxes);


  for (let u of boxes) {
    let color = u.dir > 0 ? 'red': 'blue';
    this.fill(color);
    this.stroke(color);
    this.strokeWeight(1);
    //this.beginShape();
    let rad = u.scale;
    this.ellipse(u.x, u.y, rad, rad);


  }

  let sim = new Sim(boxes);

  this.noStroke();

  createNewParticles(p.height);
  particles.forEach(particle => {
    let p = particle.position;
    const vel = sim.velocity({x:p[0], y: p[1]});
    vel.mult(TIMESCALE);
    //vel.mult(5);
    const [x, y] = particle.move([1+vel.x, vel.y]);

    if (x < 0 || y < 0 || x >= p.width || y >= p.height) {
      particles.delete(particle);
    }
    else {
      this.stroke(...particle.color, 127);
      this.strokeWeight(2);
      
      //compute tail
      let tx = TRAILSCALE * (1 + vel.x);
      let ty = TRAILSCALE * (vel.y);
      let tlen = tx*tx + ty*ty;
      if (tlen > TRAIL_MAX_LEN_SQ) { //limit trail length
        let shrink = Math.sqrt(TRAIL_MAX_LEN_SQ/tlen);
        tx *= shrink;
        ty *= shrink;
      }


      let xstart = p[0] - tx;
      let ystart = p[1] - ty;
      this.line(xstart, ystart, x, y);

      this.noStroke();
      this.fill(particle.color);
      this.ellipse(x, y, PARTICLE_RADIUS, PARTICLE_RADIUS);

    }
  });
};

function collideRectRect(box1, box2) {
  if (box1.x - box1.scale/2 >= box2.x +  box2.scale/2 ||
          box2.x - box2.scale/2 >= box1.x + box1.scale/2) {
      return false;
  }

  if (box1.y - box1.scale/2 >= box2.y + box2.scale/2 ||
         box2.y - box2.scale/2 >= box1.y + box1.scale/2) {
    return false;
  }
  return true;
};

function merge(box1, box2) {
    let boxNew = {
        x: ((box1.x + box2.x) / 2),
        y: ((box1.y + box2.y) / 2),
        scale: box1.scale + box2.scale,
        dir: box1.dir * box2.dir
    }
    return boxNew;
}

function mergeBoxes(boxes) {
  let boxesFinal = [];
  let hasMerged = false;

  //check if boxes intersect and if so, merge
  for (let i = 0; i < boxes.length - 1; ++i) {
    hasMerged = false;

    for (let j = i+1; j < boxes.length; ++j) {
        if (collideRectRect(boxes[i], boxes[j])) {
          let boxNew = merge(boxes[i], boxes[j]);
          boxesFinal.push(boxNew);
          hasMerged = true;
          boxes.splice(j);
          break;
      }
    }
    if (!hasMerged) boxesFinal.push(boxes[i]);
  }
  if (boxes.length > 0) {
      boxesFinal.push(boxes[boxes.length - 1]);
  }
  return boxesFinal;
}

export const behavior = {
  title: 'Wind Tunnel',
  init: pb.init.bind(pb),
  frameRate: 'animate',
  render: pb.render.bind(pb),
  numGhosts: 3
};

export default behavior;
