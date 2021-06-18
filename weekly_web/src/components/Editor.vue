<template>
  <div>
    <quill-editor
      class="editor"
      ref="myTextEditor"
      v-model="content"
      :options="editorOption"
      @change="onEditorChange($event)"
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
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            // [{ font: [] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"] // 清除文本格式
            // ["link", "image", "video"] // 链接、图片、视频
          ] //工具菜单栏配置
        },
        placeholder: "请在这里填写", //提示
        readyOnly: false, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true //语法检测
      }
    };
  },
  methods: {
    // 失去焦点
    // onEditorBlur(editor) {
    //   console.log(editor);
    // },
    // // 获得焦点
    // onEditorFocus(editor) {
    //   console.log(editor);
    // },
    // // 开始
    // onEditorReady(editor) {
    //   console.log(editor);
    // },
    // 失去焦点
    onEditorBlur() {
      // console.log(editor);
    },
    // 获得焦点
    onEditorFocus() {
      // console.log(editor);
    },
    // 开始
    onEditorReady() {
      // console.log(editor);
    },
    // 值发生变化
    onEditorChange(editor) {
      this.content = editor.html;
      this.$emit('editor_change', editor.html);
    },
    // 清空输入的值
    clearContent() {
      this.content = null;
    },
    // 设置文本框的值
    setContent(value) {
      this.content = value;
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
  }
};
</script>

<style lang="less" scoped>
  .quill-editor {
    height: 300px;
    margin-bottom: 40px;
  }
</style>
