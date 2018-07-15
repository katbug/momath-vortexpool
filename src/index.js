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

import Particle from './particle';
import {getRainbow} from './colors';

const NUM_POINTS = 50;
const CHORD_LENGTH = 200;
const PARTICLE_RADIUS = 4;
const PARTICLE_DENSITY = 10; // lower is more dense
const pb = new P5Behavior();
const particles = new Set();
const rainbow = getRainbow();

let particleCreationCount = 0;

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

  for (const user of floor.users) {
      this.stroke('white');
      this.noFill();
      this.ellipse(user.x, user.y, 30, 30);

      const userMass = 1;
      const particleMass = 0.2;

      particles.forEach(particle => {
          let scale = 0.2;

          let xDistance = Math.abs(particle.position[0] - user.x);
          let xAcceleration = scale * userMass * particleMass / (xDistance);
          if (particle.position[0] > user.x) {
              xAcceleration *= -1;
          }

          let yDistance = Math.abs(particle.position[1] - user.y);
          let yAcceleration = scale * userMass * particleMass / (yDistance);
          if (particle.position[0] > user.y) {
              yAcceleration *= -1;
          }

          particle.accelerate(xAcceleration, yAcceleration);
      });
  }

  this.noStroke();

  createNewParticles(p.height);

  particles.forEach(particle => {
    const [x, y] = particle.move();
    this.fill(particle.color);
    this.ellipse(x, y, PARTICLE_RADIUS, PARTICLE_RADIUS);

    if (x < 0 || y < 0 || x >= p.width || y >= p.height) {
        particles.delete(particle);
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
        scale: box1.scale + box2.scale}
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
  numGhosts: 0
};

export default behavior;
