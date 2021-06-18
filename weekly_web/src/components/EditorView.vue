<template>
  <div>
    <quill-editor
      class="editor"
      ref="myTextEditor"
      v-model="content"
      :options="editorOption"
      @focus="onEditorFocus($event)"
    >
      <!--@blur="onEditorBlur($event)"-->
      <!--@focus="onEditorFocus($event)"-->
      <!--@ready="onEditorReady($event)"-->
      <!--@change="onEditorChange($event)"-->
    </quill-editor>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 内容
      content: null,
      // 配置
      editorOption: {
        modules: {
          toolbar: false,
        },
        placeholder: "请在这里填写", //提示
        readyOnly: true, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true //语法检测
      }
    };
  },
  methods: {
    // 失去焦点
    onEditorBlur(editor) {
      console.log(editor);
    },
    // 获得焦点
    onEditorFocus(editor) {
      editor.enable(false);
    },
    // 开始
    onEditorReady(editor) {
      console.log(editor);
    },
    // 值发生变化
    onEditorChange(editor) {
      this.content = editor.html;
      this.$emit("editor_change", editor.html);
    },
    // 清空输入的值
    clearContent() {
      this.content = null;
    },
    // 更新内容
    updateViewData(value) {
      this.content = value;
    }
  },
  computed: {
    // editor() {
    //   return this.$refs.myTextEditor.quillEditor;
    // }
  },
};
</script>

<style lang="less" scoped>
.quill-editor {
  height: 300px;
  margin-bottom: 40px;
}
</style>
