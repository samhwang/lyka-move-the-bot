import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Coordinates, type FactoryState, execute } from './index';

const consoleErrorSpy = vi.spyOn(console, 'error');

describe('Move Robot Tests', () => {
  beforeEach(() => {
    consoleErrorSpy.mockReset();
  });

  describe('Just the robot', () => {
    it('Should stay still if the command is empty', () => {
      const original: FactoryState = {
        robot: {
          position: [0, 0],
          hasCrate: false,
        },
        crates: [],
      };
      const newLocation: FactoryState = execute(original, '');
      expect(newLocation).toEqual(original);
    });

    it('Should stay still if given crate commands', () => {
      const original: FactoryState = {
        robot: {
          position: [0, 0],
          hasCrate: false,
        },
        crates: [],
      };
      const newLocation = execute(original, 'G D');
      expect(newLocation).toEqual(original);
    });

    it.each<[string, Coordinates]>([
      ['N', [9, 0]],
      ['S', [0, 0]],
      ['W', [0, 0]],
      ['E', [0, 9]],
    ])('should not move if it will hit the wall', (command, start) => {
      const original: FactoryState = {
        robot: {
          position: start,
          hasCrate: false,
        },
        crates: [],
      };
      const newLocation = execute(original, command);
      expect(newLocation).toEqual(original);
    });

    it.each<[string, string, Coordinates]>([
      ['North', 'N', [6, 5]],
      ['South', 'S', [4, 5]],
      ['West', 'W', [5, 4]],
      ['East', 'E', [5, 6]],
    ])('should move 1 step %s when given %s command', (_direction, command, end) => {
      const start: Coordinates = [5, 5];
      const original: FactoryState = {
        robot: {
          position: start,
          hasCrate: false,
        },
        crates: [],
      };
      const newLocation = execute(original, command);
      const expected: FactoryState = {
        robot: {
          position: end,
          hasCrate: false,
        },
        crates: [],
      };
      expect(newLocation).toEqual(expected);
    });

    it.each<[string, Coordinates, Coordinates]>([
      ['N E S W', [0, 0], [0, 0]],
      ['N E N E N E N E', [0, 0], [4, 4]],
      ['N N N N N N N N N E E E E E E E E E S S S S S S S S S W W W W W W W W', [0, 0], [0, 1]],
    ])('should arrive at the correct destination when given a string of commands', (command, start, end) => {
      const original: FactoryState = {
        robot: {
          position: start,
          hasCrate: false,
        },
        crates: [],
      };
      const newLocation = execute(original, command);
      const expected: FactoryState = {
        robot: {
          position: end,
          hasCrate: false,
        },
        crates: [],
      };
      expect(newLocation).toEqual(expected);
    });
  });

  describe('With crates', () => {
    it('should grab crate if it does not have one', () => {
      const original: FactoryState = {
        robot: {
          position: [0, 0],
          hasCrate: false,
        },
        crates: [{ position: [0, 0] }],
      };
      const newLocation = execute(original, 'G');
      const expected: FactoryState = {
        robot: {
          position: [0, 0],
          hasCrate: true,
        },
        crates: [{ position: [0, 0] }],
      };
      expect(newLocation).toEqual(expected);
    });

    it('should not grab crate if it already has one', () => {
      const original: FactoryState = {
        robot: {
          position: [0, 0],
          hasCrate: true,
        },
        crates: [{ position: [0, 0] }, { position: [1, 0] }],
      };
      const newLocation = execute(original, 'N G');
      const expected: FactoryState = {
        robot: {
          position: [1, 0],
          hasCrate: true,
        },
        crates: [{ position: [1, 0] }, { position: [1, 0] }],
      };
      expect(newLocation).toEqual(expected);
      expect(consoleErrorSpy).toBeCalledWith('ALREADY HAVE CRATE, CANNOT GRAB MORE.');
    });

    it('should not grab crate if there is no crate at the location', () => {
      const original: FactoryState = {
        robot: {
          position: [0, 0],
          hasCrate: false,
        },
        crates: [],
      };
      const newLocation = execute(original, 'G');
      expect(newLocation).toEqual(original);
      expect(consoleErrorSpy).toBeCalledWith('NO CRATE TO GRAB.');
    });

    it('should not drop a crate on top of another crate', () => {
      const original: FactoryState = {
        robot: {
          position: [0, 0],
          hasCrate: true,
        },
        crates: [{ position: [0, 0] }, { position: [0, 1] }],
      };
      const newLocation = execute(original, 'E D');
      const expected: FactoryState = {
        robot: {
          position: [0, 1],
          hasCrate: true,
        },
        crates: [{ position: [0, 1] }, { position: [0, 1] }],
      };
      expect(newLocation).toEqual(expected);
      expect(consoleErrorSpy).toBeCalledWith('CANNOT DROP CRATE ON TOP OF ANOTHER CRATE.');
    });
  });
});
