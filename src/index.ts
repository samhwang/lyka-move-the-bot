import type { Command } from './commands';
import { dropCrate, findCrateAtRobotPosition, grabCrate } from './crate-interact';
import type { FactoryState } from './factory-state';
import { MAX, moveRobot } from './move';

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
