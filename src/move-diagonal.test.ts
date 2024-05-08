import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FactoryState } from './factory-state';
import { execute } from './index';
import { move } from './move';

vi.mock('./move');
const moveMock = vi.mocked(move);

describe('Diagonal tracks', () => {
  beforeEach(() => {
    moveMock.mockReset();
  });

  it('Should be able to group diagonal moves from 2 moves', () => {
    const original: FactoryState = {
      robot: {
        position: [0, 0],
        hasCrate: false,
      },
      crates: [],
    };

    execute(original, 'N E');

    expect(moveMock).toBeCalledTimes(1);
  });

  it.each<[string, number]>([
    ['N N', 2],
    ['S S', 2],
    ['W W', 2],
    ['E E', 2],
  ])('Should not group duplicate directions %s', (input, steps) => {
    const original: FactoryState = {
      robot: {
        position: [0, 0],
        hasCrate: false,
      },
      crates: [],
    };

    execute(original, input);

    expect(moveMock).toBeCalledTimes(steps);
  });

  it('Should be able to group diagonal moves 2 at a time', () => {
    const original: FactoryState = {
      robot: {
        position: [0, 0],
        hasCrate: false,
      },
      crates: [],
    };

    execute(original, 'N W S W E S E N');

    expect(moveMock).toBeCalledTimes(4);
  });

  it('Should be able to group diagonal moves and skip the grab commands', () => {
    const original: FactoryState = {
      robot: {
        position: [0, 0],
        hasCrate: false,
      },
      crates: [],
    };

    execute(original, 'N W S W G D E E');

    expect(moveMock).toBeCalledTimes(4);
  });
});
