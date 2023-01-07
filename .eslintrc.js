module.exports = {
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
  ],
  rules: {
    semi: [ 'error', 'always' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    curly: [ 'error', 'multi-line' ],
    camelcase: [ 'off' ],
    'no-use-before-define': [ 'off' ],
  },
};
