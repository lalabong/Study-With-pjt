import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        require: 'readonly',
        module: 'writable',
        exports: 'writable',
      },
    },
    files: ['**/*.js'],
    plugins: {
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
    },
    rules: {
      'no-console': 'warn',
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      camelcase: ['error', { properties: 'never' }],
      'max-len': [
        'error',
        {
          code: 100,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'no-param-reassign': 'error',
      'no-return-await': 'error',
      'prefer-template': 'error',
      'require-await': 'error',
      'no-await-in-loop': 'warn',
      'no-return-assign': 'error',
      'no-self-compare': 'error',
      'no-unused-expressions': 'error',
      'no-useless-catch': 'error',
      'no-useless-return': 'error',
      'no-void': 'error',
      'no-warning-comments': 'warn',
      'prefer-promise-reject-errors': 'error',
      'require-atomic-updates': 'error',

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-unresolved': 'off',
    },
  },
  prettier,
];
