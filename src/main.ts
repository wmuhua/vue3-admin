import App from "./App.vue";
import router from "./router";
import { setupStore } from "/@/store";
import { createApp, Directive } from "vue";
import { useElementPlus } from "../src/plugins/element-plus";

// import "animate.css"
// 导入公共样式
import "./style/index.scss";
// 导入字体图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";

// 自定义指令
// import * as directives from "/@/directives";
// Object.keys(directives).forEach((key) => {
//   app.directive(key, (directives as { [key: string]: Directive })[key]);
// });
(async () => {
  const app = createApp(App);
  setupStore(app);
  app.use(router).use(useElementPlus);
  await router.isReady();
  app.mount("#app");
})();
