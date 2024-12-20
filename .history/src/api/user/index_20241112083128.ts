import http from "@/http";
import { User, UserListParm, Login, AssignParm } from "./UserModel";
//新增
export const addApi = (parm: User) => {
  return http.post("/api/sysUser", parm);
};
//列表
export const getListApi = (parm: UserListParm) => {
  return http.post("/api/sysUser/list", parm);
};
// 根据用户id查询角色
export const getRoleListApi = (userId: string) => {
  return http.get("/api/sysUser/getRoleList?userId=" + userId);
};

// 编辑
export const editApi = (parm: User) => {
  return http.put("/api/sysUser", parm);
};
//删除
export const deleteApi = (userId: string) => {
  return http.delete(`/api/sysUser/${userId}`);
};

//重置密码
export const resetPasswordApi = (parm: { userId: string }) => {
  return http.post("/api/sysUser/resetPassword", parm);
};
// 验证码
export const getImgApi = () => {
  return http.post("/api/sysUser/getImage");
};

// 登录
export const loginApi = (parm: Login) => {
  return http.post("/api/sysUser/login", parm);
};
import { User, UserListParm, Login, AssignParm } from './UserModel'

//查询菜单树
export const getAssignTreeApi = (parm: AssignParm) => {
  return http.post('/api/sysUser/tree', parm)
}