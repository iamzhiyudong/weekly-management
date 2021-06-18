<template>
  <div class="dept-read-wrap">
    <BreadCrumb second_path="部门日志" third_path="周志评阅" />
    <!--卡片-->
    <el-card>
      <!--提示-->
      <el-alert
        title="对相应时间点下的，已经提交的周志进行评阅管理"
        type="warning"
        style="margin-bottom: 20px;"
      >
      </el-alert>
      <!--时间选择-->
      <div class="time-select">
        <span class="demonstration">选择日期</span>
        <el-date-picker
          v-model="time"
          type="date"
          placeholder="选择日期"
          @change="changeTime"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <!--表格-->
      <el-table :data="list_data" stripe border style="width: 100%;">
        <el-table-column type="index" prop="#" label="序号" width="90">
        </el-table-column>
        <el-table-column prop="user_name" label="姓名" width="150">
        </el-table-column>
        <el-table-column prop="create_time" label="提交时间" width="180">
        </el-table-column>
        <el-table-column label="评阅状态" width="90">
          <template slot-scope="scope">
            <el-tag
              effect="dark"
              :type="scope.row.week_read_status == 0 ? 'warning' : 'success'"
              size="mini"
            >
              {{ scope.row.week_read_status == 0 ? "待评阅" : "已阅" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="week_read_status" label="操作">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              content="评阅"
              placement="top-start"
              :open-delay="1000"
            >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-document"
                @click="showDialog(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--评阅对话框-->
    <el-dialog
      title="评阅"
      :visible.sync="dialogVisible"
      width="70%"
      class="my-dialog"
    >
      <!--标签-->
      <div class="my-tab">
        <el-tabs v-model="dialogActiveName">
          <el-tab-pane
            label="本周总结"
            name="today"
            v-html="dialog_content.week_summery"
          ></el-tab-pane>
          <el-tab-pane
            label="下周安排"
            name="tomorrow"
            v-html="dialog_content.week_next_week"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          :type="dialog_content.week_read_status == 0 ? 'success' : 'warning'"
          @click="
            handleRead(dialog_content.week_read_status, dialog_content.week_id)
          "
          >{{
            dialog_content.week_read_status == 0 ? "评阅" : "取消评阅"
          }}</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DeptRead",
  data() {
    return {
      // 初始列表
      list_data: [],
      // 查询时间
      // time: "2020-04-12",
      time: "",
      // 对话框的显示
      dialogVisible: false,
      // 标签页当前选中标签
      dialogActiveName: "today",
      // 对话框显示内容
      dialog_content: [],
    };
  },
  created() {
    // 初始化时间
    this.time = this.$moment().format("YYYY-MM-DD");
    // 获取列表数据
    this.getListData();
  },
  methods: {
    // 获取列表数据
    async getListData() {
      const result = await this.$api.adminWeekReadList({ time: this.time });
      this.list_data = result.data;
    },
    // 显示对话框
    showDialog(data) {
      this.dialogVisible = true;
      this.getWeekDetail(data.week_id);
    },
    // 获取周志详情
    async getWeekDetail(week_id) {
      const result = await this.$api.adminWeekDetail({ week_id });
      console.log(result);
      this.dialog_content = result.data;
    },
    // 处理评阅和取消评阅
    handleRead(status, week_id) {
      // 调用评阅接口
      this.$api.adminWeekReadStatus({ week_id }).then((res) => {
        // 隐藏对话框
        this.dialogVisible = false;
        // 刷新数据
        this.getListData();
        // 提示
        this.$message.success(res.msg);
      });
    },
    // 处理选择时间
    changeTime() {
      // 刷新数据
      this.getListData();
    },
  },
};
</script>

<style scoped lang="less">
@deep: ~">>>";
@{deep}.el-dialog__body {
  padding-top: 0;
}
@{deep}.el-tabs__nav {
  width: 100%;
}
@{deep}.el-tabs__item {
  text-align: center;
  width: 50%;
}
.demonstration {
  display: inline-block;
  margin: 0 10px;
}
</style>
