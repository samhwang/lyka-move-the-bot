import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      enabled: true,
      exclude: ['bin'],
    },
    typecheck: {
      enabled: true,
    },
  },
});
