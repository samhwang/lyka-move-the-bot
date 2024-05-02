const MOVE_COMMANDS = ['N', 'S', 'E', 'W'] as const;
const GRAB_COMMANDS = ['G', 'D'] as const;
const VALID_COMMANDS = [...MOVE_COMMANDS, ...GRAB_COMMANDS] as const;
type Command = (typeof VALID_COMMANDS)[number];

type Row = number;
type Column = number;
export type Coordinates = [Row, Column];

type Robot = {
  position: Coordinates;
  hasCrate: boolean;
};

type Crate = {
  position: Coordinates;
};

export type FactoryState = {
  robot: Robot;
  crates: Crate[];
};

const ROBOT_STEP: Record<Command, Coordinates> = {
  N: [1, 0],
  S: [-1, 0],
  E: [0, 1],
  W: [0, -1],
  D: [0, 0],
  G: [0, 0],
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

function findCrateAtRobotPosition(currentPosition: Coordinates, crates: Crate[]): Crate | undefined {
  return crates.find((crate) => JSON.stringify(crate.position) === JSON.stringify(currentPosition));
}

function grabCrate(hasCrate: boolean, robotPosition: Coordinates, crates: Crate[]): { hasCrate: boolean; crates: Crate[] } {
  if (hasCrate) {
    console.error('ALREADY HAVE CRATE, CANNOT GRAB MORE.');
    return { hasCrate, crates };
  }

  const crate = findCrateAtRobotPosition(robotPosition, crates);
  if (!crate) {
    console.error('NO CRATE TO GRAB.');
    return { hasCrate, crates };
  }
  return { hasCrate: true, crates };
}

function filterCrateAtRobotPosition(currentPosition: Coordinates, crates: Crate[]): Crate[] {
  return crates.filter((crate) => JSON.stringify(crate.position) === JSON.stringify(currentPosition));
}

function dropCrate(hasCrate: boolean, robotPosition: Coordinates, crates: Crate[]): { hasCrate: boolean; crates: Crate[] } {
  if (!hasCrate) {
    console.error('NO CRATE TO DROP.');
    return { hasCrate, crates };
  }

  const cratesAtPosition = filterCrateAtRobotPosition(robotPosition, crates);
  if (cratesAtPosition.length >= 2) {
    console.error('CANNOT DROP CRATE ON TOP OF ANOTHER CRATE.');
    return { hasCrate, crates };
  }

  return { hasCrate: false, crates };
}

export function execute(initialState: FactoryState, command: string): FactoryState {
  if (command.length === 0) {
    return initialState;
  }

  const steps = command.split(' ') as Command[];
  let currentRobotPosition = initialState.robot.position;
  let hasCrate = initialState.robot.hasCrate;
  let crates = initialState.crates;
  for (const step of steps) {
    if (step === 'G') {
      const result = grabCrate(hasCrate, currentRobotPosition, crates);
      hasCrate = result.hasCrate;
      crates = result.crates;
      continue;
    }
    if (step === 'D') {
      const result = dropCrate(hasCrate, currentRobotPosition, crates);
      hasCrate = result.hasCrate;
      crates = result.crates;
      continue;
    }

    if (hasCrate) {
      // biome-ignore lint/style/noNonNullAssertion: If robot already has crate, then we certainly have one at the same position.
      const crate = findCrateAtRobotPosition(currentRobotPosition, crates)!;
      crate.position = moveRobot(crate.position, step);
    }
    currentRobotPosition = moveRobot(currentRobotPosition, step);
  }

  return {
    robot: {
      position: currentRobotPosition,
      hasCrate,
    },
    crates,
  };
}

export function drawGrid(factoryState: FactoryState) {
  const ROBOT = 'R';
  const CRATE = 'C';
  const EMPTY_SPACE = '.';
  const grid = Array.from({ length: MAX + 1 }, () => Array.from({ length: 10 }, () => EMPTY_SPACE));

  const crates = factoryState.crates;
  for (const crate of crates) {
    grid[MAX - crate.position[1]][crate.position[0]] = CRATE;
  }

  const robotPosition = factoryState.robot.position;
  grid[MAX - robotPosition[1]][robotPosition[0]] = ROBOT;

  const result = grid.reduce((acc, row, rowIndex, thisArg) => {
    return `${acc}${row.join('')}${rowIndex === thisArg.length - 1 ? '' : '\n'}`;
  }, '');
  return result;
}
