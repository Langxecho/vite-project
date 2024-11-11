import http from "@/http";
import { SysRole, RoleListParm } from "./RoleModel";
//新增;
export const addApi = (parm: SysRole) => {
  return http.post("/api/role", parm);
};
//⻆⾊列表
export const getListApi = (parm: RoleListParm) => {
  return http.post("/api/role/getList", parm);
};
//编辑
export const editApi = (parm: SysRole) => {
  return http.put("/api/role", parm);
};
import useInstance from "@/hooks/useInstance";

// 获取全局golbal
const { global } = useInstance();

// 删除按钮
const deleteBtn = async (roleId: string) => {
  console.log(roleId);
  console.log(global);
  const confirm = await global.$myConfirm("确定删除该数据吗？");
  console.log(confirm);
  if (confirm) {
    let res = await deleteApi(roleId);
    if (res && res.code === 200) {
      ElMessage.success(res.msg);
      // 刷新列表
      getList();
    }
  }
};
