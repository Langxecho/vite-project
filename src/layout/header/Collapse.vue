<template>
  <el-icon @click="setCollapse" style="cursor: pointer" color="#FFF" size="30">
    <component :is="status ? 'Fold' : 'Expand'" />
  </el-icon>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Fold, Expand } from "@element-plus/icons-vue";
import { useMenuStore } from "@/store/menu/index";

// 获取 store
const store = useMenuStore();

// 获取状态
const status = computed(() => !store.getCollapse);

// 切换图标点击事件
const setCollapse = () => {
  store.setCollapse(!store.getCollapse);
};
</script>

<style scoped>
/* 你可以根据需要添加样式 */
</style>
