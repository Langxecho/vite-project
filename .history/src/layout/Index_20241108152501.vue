<template>
  <menu-logo></menu-logo>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    unique-opened
    background-color="#304156"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <menu-item :menuList="menuList"></menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import MenuItem from "@/layout/menu/MenuItem.vue";
import MenuLogo from "./MenuLogo.vue";
import { useRoute } from "vue-router";

const route = useRoute();

// 获取激活的菜单
const activeIndex = computed(() => {
  const { path } = route;
  return path;
});

// 在这里，你可以添加更多的响应式数据、方法等
const handleOpen = () => {
  console.log("Menu opened");
};

const handleClose = () => {
  console.log("Menu closed");
};
</script>

<style scoped lang="scss">
/* 这里可以写相关样式 */
</style>
