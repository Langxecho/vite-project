<template>
  <menu-logo></menu-logo>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
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
import { useMenuStore } from "@/store/menu/index";
import MenuItem from "@/layout/menu/MenuItem.vue";
import MenuLogo from "./MenuLogo.vue";
import { useRoute } from "vue-router";
const store = useMenuStore();
const isCollapse = computed(() => {
  returnstore.getCollapse;
});
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
