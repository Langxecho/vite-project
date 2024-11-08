import { defineStore } from "pinia";
import { ref, computed } from "vue";

// 定义选项卡数据类型
export type Tab = {
  title: string;
  path: string;
};

// 定义 state 的数据类型
export type TabState = {
  tabList: Tab[];
};

// 定义 store
export const useTabStore = defineStore("tabStore", {
  state: (): TabState => ({
    tabList: [], // 初始化 tabList
  }),
  getters: {
    getTab: (state) => state.tabList, // 获取选项卡列表
  },
  actions: {
    addTab(tab: Tab) {
      // 判断数据是否已存在选项卡列表中
      if (this.tabList.some((item) => item.path === tab.path)) return;
      this.tabList.push(tab); // 添加选项卡
    },
  },
  persist: {
    enabled: true, // 开启数据持久化
    strategies: [
      {
        key: "tabStore", // 自定义持久化的键名
        storage: localStorage, // 使用 localStorage 存储数据
      },
    ],
  },
});
