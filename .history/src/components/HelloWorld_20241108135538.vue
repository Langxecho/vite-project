<template>
  <h1>{{ count }}</h1>
  <h2>{{ msg }}</h2>
  <el-button type="primary" size="default" @click="addBtn">新增</el-button>
  <el-icon><search /></el-icon>
</template>

<script setup lang="ts">
import { useTestStore } from "@/store/test/index";
import { storeToRefs } from "pinia";

const store = useTestStore();
const { count, msg } = storeToRefs(store);

const addBtn = () => {
  // 第一种改变数据的方式
  // store.count++;

  // 第二种改变数据的方式
  // store.setCount(++store.count);

  // 第三种改变数据的方式
  // store.$patch({
  //   count: ++store.count,
  // });

  // 第四种改变数据的方式
  store.$patch((state) => {
    state.count = ++state.count;
  });
};
</script>
