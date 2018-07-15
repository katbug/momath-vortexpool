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
import naca from 'naca-four-digit-airfoil';

const NUM_POINTS = 100;
const CHORD_LENGTH = 100;
const pb = new P5Behavior();
/* this == pb.p5 == p */

// for WEBGL: pb.renderer = 'webgl';

pb.preload = function (p) {
}

pb.setup = function (p) {
};

pb.draw = function (floor, p) {
  /* this == pb.p5 == p */

  // console.log('hello', floor, p);
  this.clear();

  let foils = []

  let boxes = floor.users.map(u => ({
    x: u.x,
    y: u.y,
    scale: CHORD_LENGTH}));

  boxes = mergeBoxes(boxes);

  for (let u of boxes) {
    let foil = [];
    foils.push(foil);

    this.fill('red');
    this.stroke('red');
    this.strokeWeight(1);
    this.beginShape();

    var scale = u.scale;
    const airfoil = naca('3418', scale);

    var flip = [];
    let xOffset = u.x - scale/2;
    let yOffset = u.y; 
    for (let i = 0; i < NUM_POINTS; ++i)
    {
      let lookupX = scale*i/NUM_POINTS;
      let points = airfoil.evaluate(lookupX);
      let x = points[0] + xOffset;
      let y = points[1] + yOffset;

      foil.push({x, y});
      this.vertex(x, y);
      flip.push(points);
    }

    flip.reverse();
    for (let i = 0; i < NUM_POINTS; i++)
    {
      let x = flip[i][2] + xOffset;
      let y = flip[i][3] + yOffset
      this.vertex(x, y);
      foil.push({x, y});
    }

    this.endShape(this.CLOSE);
  }


  this.fill(20, 20, 60, 60);
  this.noStroke();
  // pb.drawSensors(floor.sensors);
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
  numGhosts: 3
};

export default behavior;
