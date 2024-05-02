import { type Coordinates, type FactoryState, execute } from '../src';

// @TODO: Edit this with the starting position of the Robot.
const COMMAND = '';
const ROBOT_POSITION: Coordinates = [0, 0];
const GRID_STATS: FactoryState = {
  robot: {
    position: ROBOT_POSITION,
    hasCrate: false,
  },
  crates: [],
};

function moveTheRobot() {
  // Script Execution step. DO NOT EDIT.
  const finish = execute(GRID_STATS, COMMAND);

  console.log('STARTING POSITION: ', ROBOT_POSITION);
  console.log('FINISHED MOVING.');
  console.log('GRID STATE: ', finish);
}

moveTheRobot();
