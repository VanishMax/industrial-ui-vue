module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'semi': [2, 'always'],
    'spaced-comment': 0,
    'camelcase': 0,
    'space-before-function-paren': 0,
    'jsx-quotes': 0,
    'no-class-assign': 0,
    'brace-style': 0,
    'object-curly-spacing': 0,
    'no-return-assign': 0,
    'no-trailing-spaces': 0,
    'curly': [0, 'multi'],
    'comma-dangle': ['error', {
      objects: 'always-multiline',
    }],
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: [],
    }],
    'vue/max-attributes-per-line': ['warn', {
      singleline: 3,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    'vue/script-indent': ['error', 2, { baseIndent: 1 }],
    'vue/require-default-prop': 'off',
    'vue/require-v-for-key': ['error'],
    'vue/singleline-html-element-content-newline': 'off',
    'indent': 0,
    'vue/mustache-interpolation-spacing': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/no-v-html': 0,
    'vue/no-unused-components': ['warn'],
    'import/prefer-default-export': 0
  },
};
