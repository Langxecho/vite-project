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
/
编辑
TypeScript
 export const getListApi = (parm: RoleListParm) => {
 return http.post('/api/role/getList', parm)
 }
 export const editApi = (parm: SysRole) => {
 return http.put('/api/role', parm)
 }