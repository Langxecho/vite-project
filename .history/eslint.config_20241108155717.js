import globals from "globals";
import pluginJs from "@eslint/js"; // 检验 JS 规范的推荐规则
import tseslint from "typescript-eslint"; // 推荐的 TS 规范
import pluginVue from "eslint-plugin-vue"; // 推荐的 Vue 规范
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  // 1. 检测文件格式
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
  },

  // 2. 定义不同环境的全局变量
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // 3. JS 推荐规则
  pluginJs.configs.recommended,

  // 4. TS 推荐规则
  ...tseslint.configs.recommended,

  // 5. Vue 推荐规则
  ...pluginVue.configs["flat/essential"],

  // 6. 检测 Vue 中的 TS 代码，采用 TSParser
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
    },
  },

  // 7. 忽略配置
  {
    ignores: [
      "node_modules/*",
      "dist/*",
      "*.css",
      "*.jpg",
      "*.jpeg",
      "*.png",
      "*.gif",
      "*.d.ts",
    ],
  },

  // 8. 自定义规则，根据需要增加
  // eslint 主要是校验代码规范，prettier 负责格式化代码
  {
    rules: {
      "no-unused-vars": "warn",
      // '@typescript-eslint/no-unused-vars': 'warn', // 变量未使用规则为警告
      "vue/multi-word-component-names": "off", // 关闭组件名多个单词命名
      "@typescript-eslint/no-explicit-any": ["off"],
      "end-of-line": "off",
    },
  },
  prettierRecommended,
];
