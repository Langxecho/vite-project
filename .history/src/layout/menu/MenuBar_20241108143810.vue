<template>
  <!-- <menu-logo></menu-logo> -->
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    unique-opened
    background-color="#304156"
  >
    <menu-item :menuList="menuList" />
  </el-menu>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import MenuItem from "@/layout/menu/MenuItem.vue";
// import MenuLogo from './MenuLogo.vue'
let menuList = reactive([
  {
    path: "/system",
    component: "Layout",
    name: "system",
    meta: {
      title: "系统管理",
      icon: "Setting",
      roles: ["sys:manage"],
    },
    children: [
      {
        path: "/userList",
        component: "/system/User/UserList",
        name: "userList",
        meta: {
          title: "用户管理",
          icon: "UserFilled",
          roles: ["sys:user"],
        },
      },
      {
        path: "/roleList",
        component: "/system/Role/RoleList",
        name: "roleList",
        meta: {
          title: "角色管理",
          icon: "Wallet",
          roles: ["sys:role"],
        },
      },
      {
        path: "/menuList",
        component: "/system/Menu/MenuList",
        name: "menuList",
        meta: {
          title: "菜单管理",
          icon: "Menu",
          roles: ["sys:menu"],
        },
      },
    ],
  },
  {
    path: "/goodsRoot",
    component: "Layout",
    name: "goodsRoot",
    meta: {
      title: "商品管理",
      icon: "Setting",
      roles: ["sys:goodsRoot"],
    },
    children: [
      {
        path: "/category",
        component: "/goods/Category",
        name: "category",
        meta: {
          title: "物资类型",
          icon: "UserFilled",
          roles: ["sys:category"],
        },
      },
      {
        path: "/goodsList",
        component: "/goods/GoodsList",
        name: "goodsList",
        meta: {
          title: "商品信息",
          icon: "Wallet",
          roles: ["sys:goodsList"],
        },
      },
    ],
  },
]);
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}

.el-menu {
  border-right: none;
}

:deep(.el-sub-menu .el-sub-menu__title) {
  color: #f4f4f5 !important;
}

:deep(.el-menu .el-menu-item) {
  color: #bfcbd9;
}

:deep(.el-menu-item.is-active) {
  color: #409eff !important;
}

:deep(.is-opened .el-menu-item) {
  background-color: #1f2d3d !important;
}

:deep(.el-menu-item:hover) {
  background-color: #001528 !important;
}
</style>
