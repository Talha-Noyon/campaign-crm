module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': ['warn', 'never'],
    'no-unused-vars': ['warn', {caughtErrors: 'all'}],
    'no-prototype-builtins': 0,
    'no-useless-escape': 0,
    'object-curly-spacing': ['warn', 'never'],
    'array-bracket-spacing': ['warn', 'never'],
    'no-async-promise-executor': 0,
    'no-unsafe-optional-chaining': 0,
    'prefer-const': 'warn'
  }
}
