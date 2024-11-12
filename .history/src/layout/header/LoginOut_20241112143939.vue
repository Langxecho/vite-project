<template>
  <el-dropdown placement="bottom-start">
    <span class="el-dropdown-link">
      <img class="user-img" src="@/assets/user.png" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="updateBtn">修改密码</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 修改密码弹框 -->
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @on-close="onClose"
    @on-confirm="commit"
  >
    <template v-slot:content>
      <el-form
        :model="upModel"
        ref="form"
        :rules="rules"
        label-width="80px"
        :inline="false"
        size="default"
      >
        <el-form-item prop="oldPassword" label="原密码">
          <el-input type="password" v-model="upModel.oldPassword"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="新密码">
          <el-input type="password" v-model="upModel.password"></el-input>
        </el-form-item>
        <el-form-item prop="confirm" label="确定密码">
          <el-input type="password" v-model="upModel.confirm"></el-input>
        </el-form-item>
      </el-form>
    </template>
  </SysDialog>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.el-dropdown-link:focus {
  outline: none;
}
.userimg {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #fff;
}
</style>
