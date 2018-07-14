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
const airfoil = naca('3418', CHORD_LENGTH);
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


  for (let u of floor.users) {
    this.fill('red');
    this.stroke('red');
    this.strokeWeight(1);
    this.beginShape();
    
    var flip = []
    let xOffset = u.x - CHORD_LENGTH/2;
    let yOffset = u.y; 
    for (let i = 0; i < NUM_POINTS; ++i)
    {
      let lookupX = CHORD_LENGTH*i/NUM_POINTS;
      let points = airfoil.evaluate(lookupX);
      let x = points[0];
      let y = points[1];

      this.vertex(xOffset + x, yOffset + y);
      flip.push(points);
    }

    flip.reverse();
    for (let i = 0; i < NUM_POINTS; i++)
    {
      this.vertex(flip[i][2] + xOffset, flip[i][3] + yOffset);
    }

    this.endShape(this.CLOSE);
  }


  this.fill(20, 20, 60, 60);
  this.noStroke();
  // pb.drawSensors(floor.sensors);
};

export const behavior = {
  title: 'Wind Tunnel',
  init: pb.init.bind(pb),
  frameRate: 'animate',
  render: pb.render.bind(pb),
  numGhosts: 3
};

export default behavior;
