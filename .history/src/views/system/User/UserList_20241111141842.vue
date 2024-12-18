<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="searchParm" :inline="true" size="default">
      <el-form-item>
        <el-input
          placeholder="请输入姓名"
          v-model="searchParm.nickName"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="请输入电话"
          v-model="searchParm.phone"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="Search" @click="searchBtn">搜索</el-button>
        <el-button icon="Close" type="danger" plain @click="resetBtn">
          重置
        </el-button>
        <el-button icon="Plus" type="primary" @click="addBtn">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :height="tableHeight" :data="tableList" border stripe>
      <el-table-column prop="nickName" label="姓名"></el-table-column>
      <el-table-column prop="gender" label="性别">
        <template #default="scope">
          <el-tag
            v-if="scope.row.gender == '0'"
            type="primary"
            size="default"
            effect="dark"
            >男</el-tag
          >
          <el-tag
            v-if="scope.row.gender == '1'"
            type="danger"
            size="default"
            effect="dark"
            >女</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column align="center" width="220" label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            icon="Edit"
            size="default"
            @click="editBtn(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="Delete"
            size="default"
            @click="deleteBtn(scope.row.userId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      v-model:current-page="searchParm.currentPage"
      :page-sizes="[10, 20, 40, 80, 100]"
      :page-size="searchParm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="searchParm.total"
      background
    >
    </el-pagination>
    <!-- 新增编辑 -->
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
          :model="addModel"
          ref="addForm"
          :rules="rules"
          label-width="80px"
          :inline="false"
          size="default"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item prop="nickName" label="姓名：">
                <el-input v-model="addModel.nickName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="sex" label="性别：">
                <el-radio-group v-model="addModel.gender">
                  <el-radio :label="'0'">男</el-radio>
                  <el-radio :label="'1'">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="phone" label="电话：">
                <el-input v-model="addModel.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="email" label="邮箱：">
                <el-input v-model="addModel.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12" :offset="0">
              <el-form-item prop="roleId" label="角色：">
                <SelectChecked
                  ref="selectRef"
                  :options="options"
                  @selected="selected"
                ></SelectChecked>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item prop="username" label="账户：">
                <el-input v-model="addModel.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="password" label="密码：">
                <el-input v-model="addModel.password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </SysDialog>
  </el-main>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, nextTick } from "vue";
import SysDialog from "@/components/SysDialog.vue";
import useDialog from "@/hooks/useDialog";
import { ElMessage, FormInstance } from "element-plus";
import SelectChecked from "@/components/SelectChecked.vue";
import { getSelectApi } from "@/api/role/index";
import { User } from "@/api/user/UserModel";
import { addApi, getListApi, getRoleListApi, editApi } from "@/api/user/index";
// 表单 ref 属性
const addForm = ref<FormInstance>();

// 弹框属性
const { dialog, onClose, onShow } = useDialog();

// 搜索栏绑定对象
const searchParm = reactive({
  phone: "",
  nickName: "",
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

// 新增绑定对象
const addModel = reactive({
  userId: "",
  username: "",
  password: "",
  phone: "",
  email: "",
  gender: "0",
  nickName: "",
  roleId: "",
});

// 表单验证规则
const rules = reactive({
  nickName: [
    {
      required: true,
      trigger: ["blur", "change"],
      message: "请输入姓名",
    },
  ],
  gender: [
    {
      required: true,
      trigger: ["blur", "change"],
      message: "请选择性别",
    },
  ],
  phone: [
    {
      required: true,
      trigger: ["blur", "change"],
      message: "请输入电话",
    },
  ],
  username: [
    {
      required: true,
      trigger: ["blur", "change"],
      message: "请输入账户",
    },
  ],
  password: [
    {
      required: true,
      trigger: ["blur", "change"],
      message: "请输入密码",
    },
  ],
});

const addBtn = () => {
  // 清空下拉数据
  options.value = [];

  // 获取下拉数据
  getSelect();

  // 设置弹框的标题和高度
  dialog.title = "新增";
  dialog.height = 260;

  // 显示弹框
  onShow();

  // 等待下一次 DOM 更新，然后清空下拉选择内容
  nextTick(() => {
    selectRef.value.clear();
  });

  // 清空表单
  addForm.value?.resetFields();
};
// 编辑按钮
const editBtn = (row: User) => {
  // 清空下拉数据
  options.value = [];

  // 获取下拉数据
  getSelect();

  // 设置弹框标题和高度
  dialog.title = "编辑";
  dialog.height = 230;

  // 显示弹框
  onShow();

  // 数据回显
  nextTick(() => {
    Object.assign(addModel, row);
  });

  // 清空表单
  addForm.value?.resetFields();
};

// 删除按钮
const deleteBtn = (userId: string) => {
  console.log(userId);
};
const selectRef = ref(null);

let options = ref([]);
// 勾选的值
const selected = (value: Array<string | number>) => {
  console.log(value);
  addModel.roleId = value.join(",");
  console.log(addModel);
};

// 查询角色下拉数据
const getSelect = async () => {
  let res = await getSelectApi();
  if (res && res.code === 200) {
    // 清空旧的 options 数据
    options.value = [];
    // 更新 options 数据
    options.value = res.data;
  }
};

// 提交表单
const commit = () => {
  // 验证表单
  addForm.value?.validate(async (valid) => {
    if (valid) {
      console.log("验证通过");
      // 提交数据到 API
      let res = await addApi(addModel);
      if (res && res.code === 200) {
        ElMessage.success(res.msg);
        // 关闭弹框
        onClose();
      }
    }
  });
};

// 表格数据
const tableList = ref([]);

// 查询表格数据
const getList = async () => {
  let res = await getListApi(searchParm);
  if (res && res.code === 200) {
    tableList.value = res.data.records;
    searchParm.total = res.data.total;
  }
};

// 页容量改变时触发
const sizeChange = (size: number) => {
  searchParm.pageSize = size;
  getList();
};

// 页数改变时触发
const currentChange = (page: number) => {
  searchParm.currentPage = page;
  getList();
};

// 表格高度
const tableHeight = ref(0);

// 搜索按钮点击事件
const searchBtn = () => {
  getList();
};

// 重置按钮点击事件
const resetBtn = () => {
  searchParm.nickName = "";
  searchParm.phone = "";
  // 重置其他搜索参数...
  searchParm.currentPage = 1;
  getList();
};

onMounted(() => {
  getList();
  nextTick(() => {
    tableHeight.value = window.innerHeight - 240;
  });
});
</script>

<style scoped></style>
