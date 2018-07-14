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

  // for (let u of floor.users) {
    // pb.drawUser(u);
  // }

  this.fill(20, 20, 60, 60);

  this.noStroke();

  // pb.drawSensors(floor.sensors);
};

export const behavior = {
  title: 'Wind Tunnel',
  init: pb.init.bind(pb),
  frameRate: 'animate',
  render: pb.render.bind(pb),
  numGhosts: 0
};

export default behavior;
