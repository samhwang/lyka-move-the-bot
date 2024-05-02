import { drawGrid, execute } from '../src';
import type { Coordinates, FactoryState } from '../src/factory-state';

// @TODO: Edit this with the starting position of the Robot.
const COMMAND = 'N E N E N E N E G';
const ROBOT_POSITION: Coordinates = [0, 0];
const GRID_STATS: FactoryState = {
  robot: {
    position: ROBOT_POSITION,
    hasCrate: false,
  },
  crates: [{ position: [4, 4] }, { position: [9, 9] }],
};

function moveTheRobot() {
  // Script Execution step. DO NOT EDIT.
  const finish = execute(GRID_STATS, COMMAND);

  console.log('STARTING POSITION: ', JSON.stringify(GRID_STATS));
  const startGrid = drawGrid(GRID_STATS);
  console.log(startGrid);
  console.log('COMMAND: ', COMMAND);
  console.log('FINISHED MOVING.');
  console.log('GRID STATE: ', JSON.stringify(finish));
  const finishGrid = drawGrid(finish);
  console.log(finishGrid);
}

moveTheRobot();
