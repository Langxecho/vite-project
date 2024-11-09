import http from '@/http'
 import { SysRole } from './RoleModel'
 //
新增
TypeScript
 export const addApi = (parm: SysRole) => {
 return http.post('/api/role', parm)
 }