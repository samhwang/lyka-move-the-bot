import type { Coordinates, Crate, FactoryState } from './factory-state';

function isSameCoordinates(a: Coordinates, b: Coordinates): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function findCrateAtPosition(currentPosition: Coordinates, crates: Crate[]): Crate | undefined {
  return crates.find((crate) => isSameCoordinates(crate.position, currentPosition));
}

export function grabCrate(previousState: FactoryState): FactoryState {
  if (previousState.robot.hasCrate) {
    console.error('ALREADY HAVE CRATE, CANNOT GRAB MORE.');
    return previousState;
  }

  const crate = findCrateAtPosition(previousState.robot.position, previousState.crates);
  if (!crate) {
    console.error('NO CRATE TO GRAB.');
    return previousState;
  }

  return {
    robot: {
      hasCrate: true,
      position: previousState.robot.position,
    },
    crates: previousState.crates,
  };
}

function filterCrateAtPosition(currentPosition: Coordinates, crates: Crate[]): Crate[] {
  return crates.filter((crate) => isSameCoordinates(crate.position, currentPosition));
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

  return {
    robot: {
      hasCrate: false,
      position: previousState.robot.position,
    },
    crates: previousState.crates,
  };
}
