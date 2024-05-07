import { parseInstruction, type Command } from './commands';
import { dropCrate, findCrateAtRobotPosition, grabCrate } from './crate-interact';
import type { FactoryState } from './factory-state';
import { MAX, move } from './move';

function calculateFactoryState(previousState: FactoryState, command: Command): FactoryState {
  switch (command) {
    case 'G': {
      const grabResult = grabCrate(previousState.robot.hasCrate, previousState.robot.position, previousState.crates);
      return {
        robot: {
          position: previousState.robot.position,
          hasCrate: grabResult.hasCrate,
        },
        crates: grabResult.crates,
      };
    }

    case 'D': {
      const dropResult = dropCrate(previousState.robot.hasCrate, previousState.robot.position, previousState.crates);
      return {
        robot: {
          position: previousState.robot.position,
          hasCrate: dropResult.hasCrate,
        },
        crates: dropResult.crates,
      };
    }

    case 'N':
    case 'S':
    case 'E':
    case 'W': {
      let newCrates = previousState.crates;
      const position = move(previousState.robot.position, command);
      if (previousState.robot.hasCrate) {
        // biome-ignore lint/style/noNonNullAssertion: If robot already has crate, then we certainly have one at the same position.
        const crate = findCrateAtRobotPosition(previousState.robot.position, previousState.crates)!;
        newCrates = newCrates.filter((c) => JSON.stringify(c.position) !== JSON.stringify(crate.position)).concat({ position });
      }
      return {
        robot: {
          position,
          hasCrate: previousState.robot.hasCrate,
        },
        crates: newCrates,
      };
    }

    default:
      console.error('INVALID COMMAND');
      return previousState;
  }
}

export function execute(initialState: FactoryState, instruction: string): FactoryState {
  if (instruction.length === 0) {
    return initialState;
  }

  const commands = parseInstruction(instruction);
  let factoryState = initialState;
  for (const command of commands) {
    factoryState = calculateFactoryState(factoryState, command);
  }

  return factoryState;
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
