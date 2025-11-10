import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'tsLunar',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['dayjs'],
      output: {
        globals: {
          dayjs: 'dayjs',
        },
      },
    },
  },
  test: {
    globals: true,
  },
});