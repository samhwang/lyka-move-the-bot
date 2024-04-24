const VALID_COMMANDS = ['N', 'S', 'E', 'W'] as const;
type Command = (typeof VALID_COMMANDS)[number];

type Row = number;
type Column = number;
export type Coordinates = [Row, Column];

export type FactoryState = {
  robotPosition: Coordinates;
}

const ROBOT_STEP: Record<Command, Coordinates> = {
  N: [1, 0],
  S: [-1, 0],
  E: [0, 1],
  W: [0, -1],
};

// since the size is 10x10, the max of each line should go from 0 to 9.
// Sheet reference is in the README.
const MIN = 0;
const MAX = 9;

function isOutOfBounds([row, col]: Coordinates) {
  const outOfEastWest = col > MAX || col < MIN;
  const outOfNorthSouth = row > MAX || row < MIN;
  return outOfNorthSouth || outOfEastWest;
}

function moveRobot(currentPosition: Coordinates, command: Command) {
  const [currentRow, currentColumn] = currentPosition;
  const [stepRow, stepColumn] = ROBOT_STEP[command];
  const newLocation = [currentRow + stepRow, currentColumn + stepColumn] satisfies Coordinates;
  return isOutOfBounds(newLocation) ? currentPosition : newLocation;
}

export function execute(initialState: FactoryState, command: string): FactoryState {
  if (command.length === 0) {
    return initialState;
  }

  const steps = command.split(' ') as Command[];
  let currentRobotPosition = initialState.robotPosition;
  for (const step of steps) {
    currentRobotPosition = moveRobot(currentRobotPosition, step);
  }

  return {
    robotPosition: currentRobotPosition,
  };
}
