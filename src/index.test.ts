import { describe, expect, it } from 'vitest';
import { type Coordinates, execute } from './index';

describe('Move Robot Tests', () => {
  describe('Just the robot', () => {
    it('Should stay still if the command is empty', () => {
      const start: Coordinates = [0, 0];
      const newLocation = execute({ robot: { position: start } }, '');
      expect(newLocation).toEqual({ robot: { position: start } });
    });

    it.each<[string, Coordinates]>([
      ['N', [9, 0]],
      ['S', [0, 0]],
      ['W', [0, 0]],
      ['E', [0, 9]],
    ])('should not move if it will hit the wall', (command, start) => {
      const newLocation = execute({ robot: { position: start } }, command);
      expect(newLocation).toEqual({ robot: { position: start } });
    });

    it.each<[string, string, Coordinates]>([
      ['North', 'N', [6, 5]],
      ['South', 'S', [4, 5]],
      ['West', 'W', [5, 4]],
      ['East', 'E', [5, 6]],
    ])('should move 1 step %s when given %s command', (_direction, command, end) => {
      const start: Coordinates = [5, 5];
      const newLocation = execute({ robot: { position: start } }, command);
      expect(newLocation).toEqual({ robot: { position: end } });
    });

    it.each<[string, Coordinates, Coordinates]>([
      ['N E S W', [0, 0], [0, 0]],
      ['N E N E N E N E', [0, 0], [4, 4]],
      ['N N N N N N N N N E E E E E E E E E S S S S S S S S S W W W W W W W W', [0, 0], [0, 1]],
    ])('should arrive at the correct destination when given a string of commands', (command, start, end) => {
      const newLocation = execute({ robot: { position: start } }, command);
      expect(newLocation).toEqual({ robot: { position: end } });
    });
  });
});
