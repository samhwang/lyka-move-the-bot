import type { Coordinates } from './factory-state';

export function isSameCoordinates(a: Coordinates, b: Coordinates): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
