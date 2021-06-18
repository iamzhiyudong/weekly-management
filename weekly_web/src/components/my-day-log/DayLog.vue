<template>
  <div>
    <BreadCrumb second_path="我的日志" third_path="日志管理" />
    <el-card>
      <!--提示-->
      <el-alert
        title="管理自己已经提交过的日志"
        type="warning"
        style="margin-bottom: 20px;"
      >
      </el-alert>
      <!--添加按钮-->
      <el-button type="primary" icon="el-icon-plus" @click="add_day"
        >新建日志</el-button
      >
      <!--表格-->
      <el-table :data="day_log_arr" style="width: 100%;" stripe border>
        <!--索引-->
        <el-table-column
          class="my-index"
          label="序号"
          width="100"
          type="index"
        ></el-table-column>
        <!--时间-->
        <el-table-column label="时间" width="280">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px;">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <!--评阅状态-->
        <el-table-column label="评阅状态" width="180">
          <template slot-scope="scope">
            <el-tag
              effect="dark"
              :type="scope.row.day_read_status == 1 ? 'success' : 'warning'"
              size="small"
            >
              {{ scope.row.day_read_status == 1 ? "已阅" : "待阅" }}
            </el-tag>
          </template>
        </el-table-column>
        <!--操作-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              content="查看"
              placement="top"
              :open-delay="tool_tip_delay"
            >
              <el-button
                type="primary"
                icon="el-icon-view"
                size="mini"
                @click="view_day(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="编辑"
              placement="top"
              v-show="scope.row.day_read_status == 0"
              :open-delay="tool_tip_delay"
            >
              <el-button
                type="success"
                icon="el-icon-edit"
                size="mini"
                @click="edit_day(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="删除"
              placement="top"
              :open-delay="tool_tip_delay"
            >
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="delDay(scope.row.day_id)"
                class="del-popbox"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--对话框  添加-->
    <AddDialog ref="add_dialog" @setAddForm="setAddForm" />
    <!--对话框  查看日志-->
    <ViewDialog ref="view_dialog" />
    <!--对话框 编辑-->
    <EditDialog ref="edit_dialog" @setEditForm="setEditForm" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 个人历史日志
      day_log_arr: [],
      // 添加日志富文本
      addForm: {
        day_summery: "",
        day_next_day: "",
        day_create_time: this.$moment()
          .format("YYYY-MM-DD HH:mm:ss")
          .toString(),
      },
      editForm: {
        day_summery: "",
        day_next_day: "",
        day_id: "",
      },
      // 工具提示延时
      tool_tip_delay: 1000,
    };
  },
  methods: {
    // 获取个人历史日志
    getMyDay() {
      this.$api.getMyDay().then((res) => {
        this.day_log_arr = res.data;
        console.log(res);
      });
    },
    // 删除日志
    delDay(id) {
      this.$api.delDay({ day_id: id }).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.msg);
          this.getMyDay();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 条添加按钮  弹出添加框
    add_day() {
      // 判断是否可以添加
      this.$api.canAddDay().then((res) => {
        if (res.code == 0) {
          this.$refs.add_dialog.show("当日总结", "明天安排", "添加日志");
        } else {
          this.$message.warning(res.msg);
        }
      });
    },
    // 查看日志按钮  弹出查看框
    view_day(item) {
      this.$refs.view_dialog.show(
        item.day_summery,
        item.day_next_day,
        "当日总结",
        "明天安排",
        "查看日志"
      );
    },
    // 编辑日志按钮 弹出框
    edit_day(item) {
      this.$refs.edit_dialog.show(
        "当日总结",
        "明天安排",
        "编辑日志",
        item.day_summery,
        item.day_next_day,
        item.day_id
      );
    },
    // 获取数据， 并发送请求
    setAddForm(value) {
      // 保存弹框返回来的数据
      this.addForm.day_summery = value.today;
      this.addForm.day_next_day = value.tomorrow;
      this.addForm.day_create_time = value.day_create_time;
      // 调用添加日志的接口
      this.$api.addDay(this.addForm).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.msg);
          this.getMyDay();
          this.$refs.add_dialog.success();
        } else {
          this.$message.success(res.msg);
        }
      });
    },
    // 获取数据， 并发送请求
    setEditForm(value) {
      // 保存弹框返回来的数据
      this.editForm.day_summery = value.today;
      this.editForm.day_next_day = value.tomorrow;
      this.editForm.day_id = value.day_id;
      // 调用更新日志的接口
      this.$api.updateDay(this.editForm).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.msg);
          this.getMyDay();
          this.$refs.edit_dialog.success();
        } else {
          this.$message.success(res.msg);
        }
      });
    },
  },
  created() {
    // 获取历史日志数据
    this.getMyDay();
  },
};
</script>

<style lang="less" scoped>
@deep: ~">>>";
.el-table {
  margin-top: 15px;
}

@{deep}.my-index {
  font-weight: bold !important;
  text-align: center;
}

.el-steps {
  margin-top: -15px !important;
  margin-bottom: 10px !important;
  height: 10px;
}
.del-popbox {
  margin: 10px;
}
</style>
