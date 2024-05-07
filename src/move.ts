import type { Command } from './commands';
import type { Coordinates } from './factory-state';

// since the size is 10x10, the max of each line should go from 0 to 9.
// Sheet reference is in the README.
export const MIN = 0;
export const MAX = 9;

const ROBOT_STEP: Record<Command, Coordinates> = {
  // Crate
  D: [0, 0],
  G: [0, 0],

  // Single direction
  N: [1, 0],
  S: [-1, 0],
  E: [0, 1],
  W: [0, -1],

  // Compound direction
  NE: [1, 1],
  EN: [1, 1],
  NW: [1, -1],
  WN: [1, -1],
  SE: [-1, 1],
  ES: [-1, 1],
  SW: [-1, -1],
  WS: [-1, -1],
};

function isOutOfBounds([row, col]: Coordinates) {
  const outOfEastWest = col > MAX || col < MIN;
  const outOfNorthSouth = row > MAX || row < MIN;
  return outOfNorthSouth || outOfEastWest;
}

export function move(currentPosition: Coordinates, command: Command) {
  const [currentRow, currentColumn] = currentPosition;
  const [stepRow, stepColumn] = ROBOT_STEP[command];
  const newLocation = [currentRow + stepRow, currentColumn + stepColumn] satisfies Coordinates;
  return isOutOfBounds(newLocation) ? currentPosition : newLocation;
}
