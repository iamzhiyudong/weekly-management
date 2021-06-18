import myBreadCrumb from "../components/BreadCrumb";
import myEditor from "../components/Editor";
import myEditorView from "../components/EditorView";
import myViewDialog from "../components/ViewDialog";
import myAddDialog from "../components/AddDialog";
import myEditDialog from "../components/EditDialog";
// 面包屑
export const BreadCrumb = {
  install: function (Vue) {
    Vue.component('BreadCrumb', myBreadCrumb);
  }
}
// 编辑器
export const Editor = {
  install: function (Vue) {
    Vue.component('Editor', myEditor);
  }
}
// 查看编辑器
export const EditorView = {
  install: function (Vue) {
    Vue.component('EditorView', myEditorView);
  }
}
// 查看弹出框
export const ViewDialog = {
  install: function (Vue) {
    Vue.component('ViewDialog', myViewDialog);
  }
}
// 添加弹出框
export const AddDialog = {
  install: function (Vue) {
    Vue.component('AddDialog', myAddDialog);
  }
}
// 编辑弹出框
export const EditDialog = {
  install: function (Vue) {
    Vue.component('EditDialog', myEditDialog);
  }
}
