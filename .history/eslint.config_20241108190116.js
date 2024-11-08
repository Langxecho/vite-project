import globals from "globals";
import pluginJs from "@eslint/js"; // 检验 JS 规范的推荐规则
import tseslint from "@typescript-eslint/eslint-plugin"; // 推荐的 TS 规范
import pluginVue from "eslint-plugin-vue"; // 推荐的 Vue 规范
import prettierRecommended from "eslint-plugin-prettier/recommended"; // prettier 配置

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
  {
    ...tseslint.configs.recommended,
    parserOptions: {
      ecmaVersion: 2020, // 支持现代 JS 语法
    },
  },

  // 5. Vue 推荐规则
  {
    ...pluginVue.configs["essential"],
  },

  // 6. 检测 Vue 中的 TS 代码，采用 TSParser
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
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
  {
    rules: {
      "no-unused-vars": "warn", // 未使用的变量会警告
      "vue/multi-word-component-names": "off", // 关闭组件名多个单词命名规则
      "@typescript-eslint/no-explicit-any": "off", // 禁用 explicit any 的规则
      "eol-last": "error", // 文件结尾必须有换行
      "linebreak-style": ["error", "unix"], // 强制使用 Unix 换行符（LF）
    },
  },

  // 9. prettier 配置
  prettierRecommended,
];
