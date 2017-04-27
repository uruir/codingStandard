module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    'browser': true,
    'node': true,
    'commonjs': true,
    'amd': true,
    'es6': true,
    'mocha': true,
  },
  extends: 'airbnb-base',
  'parserOptions': {
    'ecmaVersion': 6,
    'ecmaFeatures': {
      'globalReturn': true,
      'impliedStrict': true,
      'jsx': true,
    },
  },
  plugins: [
    'html',
  ],
  'rules': {
    "comma-dangle": [2, "never"],
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': 0,
  },
};
