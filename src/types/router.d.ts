import 'vue-router';
declare module 'vue-router' {
  interface RouteMeta {
    /**
     * 表示Tabbar是否显示
     */
    isShowNav: boolean;
    /**
     * @description 当前页面标题
     * @default undefined
     */
    til?: string;
  }
}