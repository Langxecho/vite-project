<template>
  <div>
  <h2>
 菜单管理
 </h2>
  <el-button type="primary" size="default" @click="addBtn">
 新增
 </el-butt
  on>
  5
  6
  7
  8
  9
  10
  11
  12
  13
  14
  15
  16
  17
  18
  19
  20
  21
  22
  23
  24
  25
  26
  27
  28
  <sys-dialog
  title="
 菜单管理
 "
  :visible="dialog.visible"
  :width="dialog.width"
  :height="dialog.height"
       @onClose="onClose"
       @onConfirm="onConfirm"
     >
  <template v-slot:content>
  <div>
 我是弹框
 </div>
  </template>
     </sys-dialog>
  </div>
  </template>
  <script setup lang="ts">
  import SysDialog from '@/components/SysDialog.vue'
  import useDialog from '@/hooks/useDialog'
  //解构弹框属性
 const { dialog, onClose, onConfirm } = useDialog()
  const addBtn = () => {
  dialog.visible = true
  }
  </script>