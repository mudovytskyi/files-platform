const js = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');
const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');
const globals = require('globals');
const path = require('path');

// Функція для визначення шляху до tsconfig.json відносно поточного проекту
const getTsConfigForDir = (dirPath) => {
  return path.join(dirPath, 'tsconfig.json');
};

module.exports = {
  files: ['**/*.{js,ts,tsx,jsx,mjs,cjs}'],
  ignores: ['**/dist/**', '**/build/**', '**/node_modules/**', '.turbo/**', '.next/**'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: tsparser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      project: [
        // Шляхи до можливих tsconfig.json файлів
        getTsConfigForDir(process.cwd()),
        './tsconfig.json',
        '../tsconfig.json',
        '../../tsconfig.json',
      ],
      tsconfigRootDir: process.cwd(),
    },
    globals: {
      ...globals.node,
      ...globals.browser,
    },
  },
  plugins: {
    '@typescript-eslint': tseslint,
    prettier: prettier,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...tseslint.configs.recommended.rules,
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
