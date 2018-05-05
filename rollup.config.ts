import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json');

const libraryName = 'ens-validation';

/**
 * Include all of the dependencies here to exclude all node modules from the build
 * Make sure to also include node libraries you're using e.g. 'crypto'
 */

const external = [...Object.keys(pkg.dependencies || {})];

/**
 * Include all of the dependencies again here to squash rollup warnings
 */
const globals = {};

// tslint:disable-next-line
export default {
  input: `src/index.ts`,

  output: [
    {
      file: pkg.main,
      name: libraryName,
      format: 'umd',
      globals,
      sourcemap: true,
    },
    { file: pkg.module, format: 'es', globals, sourcemap: true },
  ],

  // exclude all node modules
  external,

  watch: {
    include: 'src/**',
  },
  plugins: [
    // Compile TypeScript files
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfig: './tsconfig-build.json',
    }),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
};
