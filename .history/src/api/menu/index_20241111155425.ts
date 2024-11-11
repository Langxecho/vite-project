import http from "@/http";
import { MenuType } from "./MenuModel";

//获取上级菜单
export const getParentApi = () => {
  return http.get("/api/sysMenu/getParent");
};
