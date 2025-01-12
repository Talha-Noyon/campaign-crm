module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        fixStyle: 'inline-type-imports'
      }
    ],
    'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
    'comma-dangle': ['warn', 'never'],
    'no-prototype-builtins': 0,
    'no-useless-escape': 0,
    'object-curly-spacing': ['warn', 'never'],
    'array-bracket-spacing': ['warn', 'never'],
    'no-async-promise-executor': 0,
    'no-unsafe-optional-chaining': 0
  }
}
