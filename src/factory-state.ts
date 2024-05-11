import { produce } from 'immer';
import type { Command } from './commands';
import { move } from './move';

type Row = number;
type Column = number;
export type Coordinates = [Row, Column];

export type Robot = {
  position: Coordinates;
  hasCrate: boolean;
};

export type Crate = {
  position: Coordinates;
};

export type FactoryState = {
  robot: Robot;
  crates: Crate[];
};

function isSameCoordinates(a: Coordinates, b: Coordinates): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function filterCrateAtPosition(currentPosition: Coordinates, crates: Crate[]): Crate[] {
  return crates.filter((crate) => isSameCoordinates(crate.position, currentPosition));
}

function grabCrate(previousState: FactoryState): FactoryState {
  if (previousState.robot.hasCrate) {
    console.error('ALREADY HAVE CRATE, CANNOT GRAB MORE.');
    return previousState;
  }

  const crate = filterCrateAtPosition(previousState.robot.position, previousState.crates);
  if (crate.length === 0) {
    console.error('NO CRATE TO GRAB.');
    return previousState;
  }

  return produce(previousState, (draft) => {
    draft.robot.hasCrate = true;
  });
}

function dropCrate(previousState: FactoryState): FactoryState {
  if (!previousState.robot.hasCrate) {
    console.error('NO CRATE TO DROP.');
    return previousState;
  }

  const cratesAtPosition = filterCrateAtPosition(previousState.robot.position, previousState.crates);
  if (cratesAtPosition.length >= 2) {
    console.error('CANNOT DROP CRATE ON TOP OF ANOTHER CRATE.');
    return previousState;
  }

  return produce(previousState, (draft) => {
    draft.robot.hasCrate = false;
  });
}

function moveStep(previousState: FactoryState, command: Command): FactoryState {
  return produce(previousState, (draft) => {
    const position = move(draft.robot.position, command);
    if (draft.robot.hasCrate) {
      draft.crates = draft.crates.filter((c) => {
        const a = !isSameCoordinates(c.position, draft.robot.position);
        return a;
      });
      draft.crates.push({ position });
    }
    draft.robot.position = position;
  });
}

export function iterate(previousState: FactoryState, command: Command): FactoryState {
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
      return moveStep(previousState, command);
    }

    default:
      console.error('INVALID COMMAND');
      return previousState;
  }
}
