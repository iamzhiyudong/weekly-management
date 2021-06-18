<template>
  <div>
    <!--对话框  添加日志-->
    <el-dialog :title="dialog_title" :visible.sync="dialogVisible" width="70%">
      <!--步骤条-->
      <el-steps :active="step_current_active" finish-status="success" simple>
        <el-step :title="`步骤 1 - ${item_title[0]}`"></el-step>
        <el-step :title="`步骤 1 - ${item_title[1]}`"></el-step>
      </el-steps>
      <!--引入富文本编辑器-->
      <Editor
        @editor_change="getEditorValueToday"
        v-show="step_current_active == 0"
        ref="today_editor"
      />
      <Editor
        @editor_change="getEditorValueTomorrow"
        v-show="step_current_active == 1"
        ref="tomorrow_editor"
      />
      <!--底部的按钮-->
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="step_current_active = 0"
          v-show="step_current_active == 1"
        >上一步</el-button
        >
        <el-button @click="dialogCancelBtn">取 消</el-button>
        <el-button
          type="primary"
          @click="step_current_active = 1"
          v-show="!step_current_active"
        >下一步</el-button
        >
        <el-button
          type="primary"
          @click="dialogConfirmBtn"
          v-show="step_current_active"
        >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 对话框名字
        dialog_title: '',
        // 控制对话框的显示
        dialogVisible: false,
        // 步骤条当前激活
        step_current_active: 0,
        // 编辑项目的数组
        item_title: [],
        // 富文本数据
        editForm: {
          today: "",
          tomorrow: "",
          day_id: '',
        },
      };
    },
    methods: {
      // 获取editor的值--今日
      getEditorValueToday(value) {
        this.editForm.today = value;
      },
      // 获取editor的值--明天
      getEditorValueTomorrow(value) {
        this.editForm.tomorrow = value;
      },
      // 对话框取消按钮
      dialogCancelBtn() {
        // 隐藏对话框
        this.dialogVisible = false;
        // 重置显示
        this.step_current_active = 0;
      },
      // 显示方法，初始化数据
      show(title_today, title_tomorrow,dialog_title, today_content, tomorrow_content, day_id) {
        // 显示
        this.dialogVisible = true;
        // 设置对话框名字
        this.dialog_title = dialog_title;
        // 保存项目的名字
        this.item_title = [title_today, title_tomorrow];
        // 初始化数据
        this.$nextTick(function () {
          this.$refs.today_editor.setContent(today_content);
          this.$refs.tomorrow_editor.setContent(tomorrow_content);
        })
        this.editForm.day_id = day_id;
      },
      // 点击确认按钮
      dialogConfirmBtn() {
        this.$emit('setEditForm', this.editForm);
      },
      // 成功以后的方法
      success() {
        // 隐藏
        this.dialogVisible = false;
        // 清空
        this.$refs.today_editor.clearContent();
        this.$refs.tomorrow_editor.clearContent();
        // 重置显示
        this.step_current_active = 0;
      }
    }
  };
</script>

<style lang="less" scoped></style>
