// commitlint.config.js

module.exports = [
  // 直接包含 @commitlint/config-conventional 的配置对象
  {
    rules: {
      'type-enum': [2, 'always', [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'build',
        'ci',
        'revert',
      ]],
      'subject-case': [2, 'never', ['pascal-case', 'upper-case']],
    },
  },
];

