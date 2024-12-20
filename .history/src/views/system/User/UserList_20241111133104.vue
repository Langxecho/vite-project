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
        <el-button icon="Search">搜索</el-button>
        <el-button icon="Close" type="danger" plain>重置</el-button>
        <el-button icon="Plus" type="primary" @click="addBtn">新增</el-button>
      </el-form-item>
    </el-form>

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
import { FormInstance } from "element-plus";
import SelectChecked from "@/components/SelectChecked.vue";
import { getSelectApi } from "@/api/role/index";
import { addApi } from "@/api/user/index";
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
        EL
        // 关闭弹框
        onClose();
      }
    }
  });
};

onMounted(() => {
  // getSelect();
});
</script>

<style scoped></style>
