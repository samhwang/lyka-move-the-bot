import { parseInstruction } from './commands';
import { type FactoryState, iterate } from './factory-state';
import { MAX } from './move';

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
