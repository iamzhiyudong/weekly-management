<template>
  <div>
    <el-dialog
      :title="dialog_title"
      :visible.sync="dialogVisible_view"
      width="70%"
      class="my-dialog"
    >
      <h3>{{ current_tag == 'today'? btn_name[0]: btn_name[1] }}</h3>
      <EditorView ref="editor_view" />
      <!--底部的按钮-->
      <span slot="footer" class="dialog-footer">
        <!--取消按钮-->
        <el-button @click="dialogVisible_view = false">取 消</el-button>
        <!--明天按钮-->
        <el-button type="primary" @click="showNext" v-show="show_next_btn">{{
          btn_name[1]
        }}</el-button>
        <!--上一级按钮-->
        <el-button type="primary" @click="showLast" v-show="!show_next_btn">{{
          btn_name[0]
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 对话框的显示和隐藏
      dialogVisible_view: false,
      // 弹出框的title
      dialog_title: "查看日志",
      // 当前显示tab  today   tomorrow
      current_tag: "today",
      // 按钮数组
      btn_name: ["当日总结", "明天安排"],
      // 要显示内容
      content_arr: [],
      // 显示明天--下一个按钮的标志
      show_next_btn: true,
    };
  },
  methods: {
    /**
     * 用于初始化组件数据
     * @param content_today 今日或本周数据
     * @param content_tomorrow  明天或下周数据
     * @param title_today  今日总结 或 本周总结
     * @param title_tomorrow 明天安排或 下周安排
     * @param dialog_title 对话框的名字 查看日志  或 查看周志
     */
    show(content_today, content_tomorrow, title_today, title_tomorrow, dialog_title) {

      // 显示
      this.dialogVisible_view = true;
      // 保存按钮数组
      this.btn_name = [title_today, title_tomorrow];
      // 保存要显示的数据
      this.content_arr = [content_today, content_tomorrow];
      // 保存对话框名字
      this.dialog_title = dialog_title;
      this.$nextTick(function() {
        this.$refs.editor_view.updateViewData(content_today);
      });
    },
    // 显示下一个
    showNext() {
      this.current_tag = 'tomorrow';
      this.show_next_btn = false;
      this.$nextTick(function() {
        this.$refs.editor_view.updateViewData(this.content_arr[1]);
      });
    },
    // 显示上一个
    showLast() {
      this.current_tag = 'today';
      this.show_next_btn = true;
      this.$nextTick(function() {
        this.$refs.editor_view.updateViewData(this.content_arr[0]);
      });
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~">>>";
@{deep}.el-dialog__body {
  padding-bottom: 0px !important;
  padding-top: 0px !important;
}
</style>
