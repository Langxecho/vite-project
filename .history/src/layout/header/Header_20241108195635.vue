<template>
  <div class="header-container">
    <Collapse></Collapse>
    <BreadCrumb></BreadCrumb>
  </div>
</template>

<script setup lang="ts">
import Collapse from './Collapse.vue';
import BreadCrumb from './BreadCrumb.vue';
</script>

<style scoped lang="scss">
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 可选：如果你希望 Collapse 和 BreadCrumb 在水平方向上分开 */
  padding: 10px;
}
</style>
