import { produce } from 'immer';
import { isSameCoordinates } from './compare-coordinates';
import type { Coordinates, Crate, FactoryState } from './factory-state';

function filterCrateAtPosition(currentPosition: Coordinates, crates: Crate[]): Crate[] {
  return crates.filter((crate) => isSameCoordinates(crate.position, currentPosition));
}

export function grabCrate(previousState: FactoryState): FactoryState {
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

export function dropCrate(previousState: FactoryState): FactoryState {
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
