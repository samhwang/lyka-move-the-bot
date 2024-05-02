import type { Command } from './commands';
import type { Coordinates } from './factory-state';

// since the size is 10x10, the max of each line should go from 0 to 9.
// Sheet reference is in the README.
export const MIN = 0;
export const MAX = 9;

const ROBOT_STEP: Record<Command, Coordinates> = {
  N: [1, 0],
  S: [-1, 0],
  E: [0, 1],
  W: [0, -1],
  D: [0, 0],
  G: [0, 0],
};

function isOutOfBounds([row, col]: Coordinates) {
  const outOfEastWest = col > MAX || col < MIN;
  const outOfNorthSouth = row > MAX || row < MIN;
  return outOfNorthSouth || outOfEastWest;
}

export function moveRobot(currentPosition: Coordinates, command: Command) {
  const [currentRow, currentColumn] = currentPosition;
  const [stepRow, stepColumn] = ROBOT_STEP[command];
  const newLocation = [currentRow + stepRow, currentColumn + stepColumn] satisfies Coordinates;
  return isOutOfBounds(newLocation) ? currentPosition : newLocation;
}
