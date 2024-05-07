import { describe, it, expect, vi } from "vitest";
import type { FactoryState } from "./factory-state";
import { execute } from "./index";
import { move } from "./move";

vi.mock('./move')
const moveMock = vi.mocked(move);

describe('Diagonal tracks', () => {
  it('Should be able to group diagonal moves', () => {
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
});
