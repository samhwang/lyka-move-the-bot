import type { Coordinates, Crate } from './factory-state';

export function findCrateAtRobotPosition(currentPosition: Coordinates, crates: Crate[]): Crate | undefined {
  return crates.find((crate) => JSON.stringify(crate.position) === JSON.stringify(currentPosition));
}

export function grabCrate(hasCrate: boolean, robotPosition: Coordinates, crates: Crate[]): { hasCrate: boolean; crates: Crate[] } {
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

export function dropCrate(hasCrate: boolean, robotPosition: Coordinates, crates: Crate[]): { hasCrate: boolean; crates: Crate[] } {
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
