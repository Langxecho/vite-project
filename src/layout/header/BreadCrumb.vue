<template>
  <el-breadcrumb class="bred" separator="/">
    <el-breadcrumb-item v-for="(item, index) in tabs" :key="index">{{
      item.meta.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute, RouteLocationMatched } from "vue-router";

// 获取当前路由
const route = useRoute();

// 定义面包屑导航数据
const tabs = ref<RouteLocationMatched[]>([]);

// 获取面包屑数据
const getBredcrumb = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title);

  // 获取第一个匹配项
  const first = matched[0];

  // 如果不是首页，添加首页作为面包屑的第一个项
  if (first && first.path !== "/dashboard") {
    matched = [
      { path: "/dashboard", meta: { title: "首页" } } as RouteLocationMatched,
    ].concat(matched);
  }

  tabs.value = matched;
};

// 在组件挂载时调用
onMounted(() => {
  getBredcrumb();
});

// 监听当前路由变化，更新面包屑
watch(
  () => route.path,
  () => {
    getBredcrumb();
  },
);
</script>

<style scoped lang="scss">
.bred {
  margin-left: 20px;
}

:deep(.el-breadcrumb__inner) {
  color: #fff !important; /* 修改字体颜色 */
}

:deep(.el-breadcrumb__inner a) {
  color: #fff !important; /* 修改字体颜色 */
}

:deep(.el-breadcrumb__item) {
  font-size: 16px !important; /* 修改字体大小 */
}
</style>
