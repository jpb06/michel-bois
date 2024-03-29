const pathAliases = {
  pattern:
    '{@common/**,@errors,@client/**,@effects,@domains/**,@layers,@layers/types,@data-seeding}',
  regex:
    '^@(client/|@errors|@effects|@domains/|@layers|@layers/types|@common/|@data-seeding)',
};

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  // Base config
  extends: ['eslint:recommended'],
  overrides: [
    // React
    {
      files: ['**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['tsconfig.json'],
      },
      plugins: ['react', '@typescript-eslint', 'import', 'jsx-a11y'],
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
      settings: {
        react: {
          version: 'detect',
        },
        formComponents: ['Form'],
        linkComponents: [
          { name: 'Link', linkAttribute: 'to' },
          { name: 'NavLink', linkAttribute: 'to' },
        ],
      },
      rules: {
        'import/order': [
          'error',
          {
            alphabetize: { caseInsensitive: true, order: 'asc' },
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
            'newlines-between': 'always',
            pathGroups: [
              {
                pattern: pathAliases.pattern,
                group: 'internal',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
          },
        ],
        'react/jsx-no-leaked-render': [
          'warn',
          { validStrategies: ['ternary'] },
        ],
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        eqeqeq: 'error',
        complexity: [
          'error',
          {
            max: 15,
          },
        ],
        curly: 'error',
        'arrow-body-style': ['error', 'as-needed'],
        'no-unneeded-ternary': 'error',
        'prefer-arrow-callback': 'error',
        'no-else-return': 'error',
        'no-useless-return': 'error',
        'no-console': [
          'error',
          {
            allow: ['warn', 'error', 'info'],
          },
        ],
        'array-callback-return': [
          'error',
          {
            allowImplicit: true,
          },
        ],
      },
    },

    // Typescript
    {
      files: ['**/*.ts'],
      plugins: ['@stylistic/js', 'prettier', '@typescript-eslint', 'import'],
      extends: ['plugin:import/typescript'],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/internal-regex': pathAliases.regex,
        'import/resolver': {
          node: {
            extensions: ['.ts', '.tsx'],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic',
        'plugin:import/recommended',
        'plugin:prettier/recommended',
        'plugin:import/typescript',
        'prettier',
      ],
      rules: {
        'import/order': [
          'error',
          {
            alphabetize: { caseInsensitive: true, order: 'asc' },
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
            'newlines-between': 'always',
            pathGroups: [
              {
                pattern: pathAliases.pattern,
                group: 'internal',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
          },
        ],
        '@stylistic/js/semi': 'error',
        'prettier/prettier': 'error',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        eqeqeq: 'error',
        complexity: [
          'error',
          {
            max: 15,
          },
        ],
        curly: 'error',
        'arrow-body-style': ['error', 'as-needed'],
        'no-unneeded-ternary': 'error',
        'prefer-arrow-callback': 'error',
        'no-else-return': 'error',
        'no-useless-return': 'error',
        'no-console': [
          'error',
          {
            allow: ['warn', 'error', 'info'],
          },
        ],
        'array-callback-return': [
          'error',
          {
            allowImplicit: true,
          },
        ],
      },
    },

    // Markdown
    {
      files: ['**/*.md'],
      plugins: ['markdown'],
      extends: ['plugin:markdown/recommended', 'prettier'],
    },

    // Jest/Vitest
    {
      files: ['**/*.test.{js,jsx,ts,tsx}'],
      plugins: ['jest', 'jest-dom', 'testing-library'],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
        'prettier',
      ],
      env: {
        'jest/globals': true,
      },
      settings: {
        jest: {
          // we're using vitest which has a very similar API to jest
          // (so the linting plugins work nicely), but it means we have to explicitly
          // set the jest version.
          version: 28,
        },
      },
    },

    // Cypress
    {
      files: ['cypress/**/*.ts'],
      plugins: ['cypress'],
      extends: ['plugin:cypress/recommended', 'prettier'],
    },

    // Node
    {
      files: [
        '.eslintrc.js',
        'postcss.config.js',
        'remix.config.js',
        'mocks/**/*.js',
      ],
      env: {
        node: true,
      },
    },
  ],
};
