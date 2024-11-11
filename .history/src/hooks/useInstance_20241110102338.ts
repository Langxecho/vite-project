import { getCurrentInstance, ComponentInternalInstance } from "vue";

export default function useInstance() {
  // 使用 `getCurrentInstance()` 获取当前组件实例，并将其断言为 `ComponentInternalInstance` 类型，
  // 以便在后续访问该实例的属性时具有类型支持
  const { appContext, proxy } =
    getCurrentInstance() as ComponentInternalInstance;

  // 从 `appContext.config` 中获取全局属性（`globalProperties`），
  // 这样可以访问整个应用程序范围内定义的全局属性和方法
  const global = appContext.config.globalProperties;

  // 返回一个对象，包含组件实例的 `proxy` 和全局属性 `global`
  // `proxy` 指向当前组件实例的代理对象，可以用于访问组件中的数据、方法等
  // `global` 指向应用的全局属性
  return {
    proxy,
    global,
  };
}
