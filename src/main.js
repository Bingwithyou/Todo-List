import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  // h 代表 hyperscript
  render: (h) => h(App),
  // Myitem 组件通信要跨两个组件，可以用 $bus 全局事件总线改写
  beforeCreate() {
    // 安装 $bus 全局事件总线
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
