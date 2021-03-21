import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import { uglify } from 'rollup-plugin-uglify'

const input = 'src/index.ts'
const output = 'dist/index'
const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default [
  {
    input: input,
    output: {
      file: `${output}.js`,
      format: 'cjs'
    },
    plugins: [
      resolve({
        jsnext: true,
        extensions
      }),
      typescript(),
      commonjs(),
      babel({
        include: ['src/**/*'],
        exclude: ['node_modules/**'],
        extensions
      }),
      external(),
      uglify()
    ]
  },
  {
    input: input,
    output: {
      file: `${output}.modern.js`,
      format: 'es'
    },

    plugins: [
      resolve({
        jsnext: true,
        extensions
      }),
      typescript(),
      commonjs({
        include: ['node_modules/**'],
        namedExports: {
          'react-dom': ['createPortal']
        }
      }),
      babel({
        include: ['src/**/*'],
        exclude: ['node_modules/**'],
        extensions
      }),
      external(),
      terser()
    ]
  },
  {
    input: input,
    output: {
      name: 'ReactUi',
      file: `${output}.umd.js`,
      globals: {
        react: 'React',
        'styled-components': 'styled',
        'prop-types': 'PropTypes',
        'prop-types/checkPropTypes': 'checkPropTypes'
      },
      format: 'umd'
    },
    plugins: [
      resolve({
        jsnext: true,
        extensions
      }),
      typescript(),
      commonjs({
        include: ['node_modules/**'],
        namedExports: {
          'react-dom': ['createPortal']
        }
      }),
      external(),
      babel({
        include: ['src/**/*'],
        exclude: ['node_modules/**'],
        extensions
      }),
      terser()
    ]
  }
]
