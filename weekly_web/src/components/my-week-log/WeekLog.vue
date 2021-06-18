<template>
  <div>
    <BreadCrumb second_path="我的周志" third_path="周志管理" />
    <el-card>
      <!--提示-->
      <el-alert
              title="管理自己已经提交过的周志"
              type="warning"
              style="margin-bottom: 20px;"
      >
      </el-alert>
      <!--添加按钮-->
      <el-button type="primary" icon="el-icon-plus" @click="add_week"
      >新建周志</el-button
      >
      <!--一键生成按钮-->
      <el-button type="success" icon="el-icon-plus" @click="add_week_onekey"
      >根据日志生成</el-button
      >
      <!--表格-->
      <el-table :data="week_log_arr" style="width: 100%" stripe border>
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
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <!--评阅状态-->
        <el-table-column label="评阅状态" width="180">
          <template slot-scope="scope">
            <el-tag
              effect="dark"
              :type="scope.row.week_read_status == 1 ? 'success' : 'warning'"
              size="small"
            >
              {{ scope.row.week_read_status == 1 ? "已阅" : "待阅" }}
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
                @click="view_week(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="编辑"
              placement="top"
              v-show="scope.row.week_read_status == 0"
              :open-delay="tool_tip_delay"
            >
              <el-button
                type="success"
                icon="el-icon-edit"
                size="mini"
                @click="edit_week(scope.row)"
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
                @onConfirm="delWeek(scope.row.week_id)"
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
        // 个人历史周志
        week_log_arr: [],
        // 添加日志富文本
        addForm: {
          week_summery: "",
          week_next_week: "",
          // day_create_time: this.$moment()
          //   .format("YYYY-MM-DD HH:mm:ss")
          //   .toString()
        },
        editForm: {
          week_summery: "",
          week_next_week: "",
          week_id: ""
        },
        // 工具提示延时
        tool_tip_delay: 1000
      };
    },
    methods: {
      // 获取个人历史日志
      getMyWeek() {
        this.$api.getMyWeek().then(res => {
          this.week_log_arr = res.data;
          // console.log(res);
        });
      },
      // 删除日志
      delWeek(id) {
        this.$api.delWeek({ week_id: id }).then(res => {
          if (res.code == 0) {
            this.$message.success(res.msg);
            this.getMyWeek();
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      // 条添加按钮  弹出添加框
      add_week() {
        // 判断是否可以添加
        this.$api.canAddWeek().then(res => {
          if (res.code == 0) {
            this.$refs.add_dialog.show("本周总结", "下周安排", "添加周志");
          } else {
            this.$message.warning(res.msg);
          }
        })
      },
      // 一键生成按钮
      add_week_onekey() {
        // 判断是否可以添加
        this.$api.canAddWeek().then(res => {
          if (res.code == 0) {
            // 获取一键生成数据
            this.$api.addWeekOnekey().then(res => {
              console.log(res)
              if (res.code == 0) {
                this.addForm.week_summery = res.data;
                this.$refs.add_dialog.show("本周总结", "下周安排", "添加周志", this.addForm.week_summery);
                this.$message.success('生成成功');
              } else {
                this.$message.warning('生成失败');
              }
            })
          } else {
            this.$message.warning(res.msg);
          }
        })
      },
      // 查看日志按钮  弹出查看框
      view_week(item) {
        this.$refs.view_dialog.show(
          item.week_summery,
          item.week_next_week,
          "本周总结",
          "下周安排",
          "查看周志"
        );
      },
      // 编辑日志按钮 弹出框
      edit_week(item) {
        this.$refs.edit_dialog.show(
          "本周总结",
          "下周安排",
          "编辑周志",
          item.week_summery,
          item.week_next_week,
          item.week_id
        );
      },
      // 获取数据， 并发送请求
      setAddForm(value) {
        // 保存弹框返回来的数据
        this.addForm.week_summery = value.today;
        this.addForm.week_next_week = value.tomorrow;
        // this.addForm.day_create_time = value.day_create_time;
        // 调用添加日志的接口
        this.$api.addWeek(this.addForm).then(res => {
          if (res.code == 0) {
            this.$message.success(res.msg);
            this.getMyWeek();
            this.$refs.add_dialog.success();
          } else {
            this.$message.success(res.msg);
          }
        });
      },
      // 获取数据， 并发送请求
      setEditForm(value) {
        // 保存弹框返回来的数据
        this.editForm.week_summery = value.today;
        this.editForm.week_next_week = value.tomorrow;
        this.editForm.week_id = value.day_id;
        // 调用更新日志的接口
        this.$api.updateWeek(this.editForm).then(res => {
          if (res.code == 0) {
            this.$message.success(res.msg);
            this.getMyWeek();
            this.$refs.edit_dialog.success();
          } else {
            this.$message.success(res.msg);
          }
        });
      }
    },
    created() {
      // 获取历史日志数据
      this.getMyWeek();
    }
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
