import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入全局样式
import "@/assets/css/global.css";
// 引入全局组件
// 面包屑
import { BreadCrumb, Editor, EditorView, ViewDialog, AddDialog, EditDialog } from "@/plugins/global_components";
// element-ui
import "@/plugins/elementui";
// moment
import moment from "moment";
// 引入api接口
import api from "@/utils/api";
// 引入富文本编辑器
import "@/plugins/vue-quill-editor";

Vue.prototype.$api = api;
Vue.prototype.$moment = moment;
Vue.use(BreadCrumb)
  .use(Editor)
  .use(ViewDialog)
  .use(EditDialog)
  .use(AddDialog)
  .use(EditorView);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
