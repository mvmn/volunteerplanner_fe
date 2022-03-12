const pkg = require('./package.json');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    jest: true
  },
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime'
  ],
  ignorePatterns: ['/node_modules', '/out', '/build', '/.eslintrc.js'],
  plugins: ['prettier', 'react'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'prettier/prettier': ['error', pkg.prettier],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'arrow-parens': ['off', 'always'],
    'brace-style': ['off', 'off'],
    'comma-dangle': ['error', 'never'],
    'semi-style': ['error', 'last'],
    'max-len': 'off',
    'new-parens': 'off',
    'quote-props': 'off',
    'space-in-parens': ['error', 'never'],
    'react/no-unescaped-entities': 'off',
    'import/no-anonymous-default-export': 'off',
    'react/prop-types': 'off'
  }
};
