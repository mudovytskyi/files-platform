const baseConfig = require('./packages/config/eslint');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  {
    files: ['**/*.{js,ts,tsx}'],
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'],
    ...baseConfig,
  },
  eslintConfigPrettier,
];
