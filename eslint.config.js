const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const compat = new FlatCompat();

module.exports = [
  js.configs.recommended,
  ...compat.config({
    extends: [
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'prettier/prettier': ['error', {
        'endOfLine': 'auto',
        'singleQuote': true,
        'trailingComma': 'all',
        'printWidth': 100,
        'tabWidth': 2,
        'semi': true
      }],
      'no-console': 'warn',
      'curly': ['error', 'all'],
      'eqeqeq': ['error', 'always'],
    },
  }),
  {
    ignores: ['dist/**', 'node_modules/**', '.eslintrc.js']
  }
];