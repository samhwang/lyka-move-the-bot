import { type Coordinates, type FactoryState, execute } from '../src';

// @TODO: Edit this with the starting position of the Robot.
const COMMAND = '';
const ROBOT_POSITION: Coordinates = [0, 0];
const GRID_STATS: FactoryState = {
  robotPosition: ROBOT_POSITION,
};

function moveTheRobot() {
  // Script Execution step. DO NOT EDIT.
  const finish = execute(GRID_STATS, COMMAND);

  console.log('STARTING POSITION: ', ROBOT_POSITION);
  console.log('FINISHED MOVING.');
  console.log('ROBOT POSITION: ', finish.robotPosition);
}

moveTheRobot();
