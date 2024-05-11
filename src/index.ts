import { type Command, parseInstruction } from './commands';
import { isSameCoordinates } from './compare-coordinates';
import { dropCrate, grabCrate } from './crate-interact';
import type { FactoryState } from './factory-state';
import { MAX, move } from './move';

function iterate(previousState: FactoryState, command: Command): FactoryState {
  switch (command) {
    case 'G': {
      return grabCrate(previousState);
    }

    case 'D': {
      return dropCrate(previousState);
    }

    case 'N':
    case 'S':
    case 'E':
    case 'W':
    case 'NE':
    case 'SE':
    case 'NW':
    case 'SW':
    case 'EN':
    case 'ES':
    case 'WN':
    case 'WS': {
      let newCrates = previousState.crates;
      const position = move(previousState.robot.position, command);
      if (previousState.robot.hasCrate) {
        newCrates = newCrates.filter((c) => !isSameCoordinates(c.position, previousState.robot.position)).concat({ position });
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
    factoryState = iterate(factoryState, command);
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
