import minify from 'rollup-plugin-babel-minify';

export default [
  {
    input: 'dist/dag.js',
    output: {
      file: `dist/dag.umd.js`,
      format: 'umd',
      name: 'dag'
    },
    plugins: [minify({ comments: false })]
  },
  {
    input: 'dist/dag.js',
    output: {
      file: `dist/dag.m.js`,
      format: 'es'
    },
    plugins: [minify({ comments: false })]
  }
];