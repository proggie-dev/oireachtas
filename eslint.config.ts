import { defineConfig, globalIgnores } from 'eslint/config';
import tsPlugin from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: { ...globals.browser, vi: 'readonly' },
    },
    plugins: {
      ts: tsPlugin,
      react: pluginReact,
      'react-hooks': reactHooks,
    },
    rules: {
      'no-unused-vars': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    extends: [tsPlugin.configs.recommended, pluginReact.configs.flat.recommended],
  },
  {
    files: ['src/tests/**/*.ts', 'src/tests/**/*.tsx'],
    languageOptions: {
      globals: { ...globals.browser, vi: 'readonly' },
    },
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
]);
