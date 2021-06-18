<template>
  <div class="submission-wrap">
    <BreadCrumb second_path="部门日志" third_path="部门概览" />

    <el-card>
      <!--提示-->
      <el-alert
        title="概览自己管理的部门下的人员提交情况和评阅情况"
        type="warning"
        style="margin-bottom: 20px;"
      >
      </el-alert>
      <!--放置进度条-->
      <el-row :gutter="20">
        <el-col :span="6">
          <!--日志圆形进度条-->
          <el-progress
            type="circle"
            :percentage="day_log_submission"
            :color="day_color"
          ></el-progress>
          <!--分类名称-->
          <div class="class-name">日志提交情况</div>
          <div class="person-count">共有{{ day_person_count }}人</div>
        </el-col>
        <el-col :span="6">
          <el-progress
            type="circle"
            :percentage="day_log_read"
            :color="day_read_color"
          ></el-progress>
          <div class="class-name">日志评阅情况</div>
          <div class="person-count">共有{{ day_person_count }}人</div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// import BreadCrumb from "../BreadCrumb";
export default {
  data() {
    return {
      // 日志提交情况百分比
      day_log_submission: 0,
      // 同部门日志共几人
      day_person_count: 0,
      // 日志评阅情况百分比
      day_log_read: 0,
      // 同部门周志共几人
      day_read_person_count: 0,
      // 控制进度条的颜色
      day_color: "#1989fa",
      day_read_color: "#1989fa",
    };
  },
  // components: {
  //   BreadCrumb,
  // },
  created() {
    // 获取日志提交、评阅情况
    this.getDay();
    this.getDayRead();
  },
  methods: {
    // 获取日志提交情况
    async getDay() {
      const { data: result } = await this.$api.adminViewDay();
      // 计算百分比
      if (result[0].all_num === 0) {
        return;
      }
      const percent = Number(
        ((result[0].already_num / result[0].all_num) * 100).toFixed(0)
      );
      this.day_person_count = result[0].all_num;
      // 处理进度条的颜色
      this.day_log_submission = percent;
      if (percent >= 0 && percent <= 20) {
        this.day_color = "#f56c6c";
      } else if (percent > 20 && percent <= 40) {
        this.day_color = "#e6a23c";
      } else if (percent > 40 && percent <= 60) {
        this.day_color = "#1989fa";
      } else if (percent > 60 && percent < 100) {
        this.day_color = "#6f7ad3";
      } else if (percent == 100) {
        this.day_color = "#5cb87a";
      }
    },
    // 获取日志评阅情况
    async getDayRead() {
      const { data: result } = await this.$api.adminReadDay();
      // 计算百分比
      if (result[0].all_num === 0) {
        return;
      }
      const percent = Number(
        ((result[0].already_num / result[0].all_num) * 100).toFixed(0)
      );
      this.day_read_person_count = result[0].all_num;
      this.day_log_read = percent;
      // 处理进度条的颜色
      if (percent >= 0 && percent <= 20) {
        this.day_read_color = "#f56c6c";
      } else if (percent > 20 && percent <= 40) {
        this.day_read_color = "#e6a23c";
      } else if (percent > 40 && percent <= 60) {
        this.day_read_color = "#1989fa";
      } else if (percent > 60 && percent < 100) {
        this.day_read_color = "#6f7ad3";
      } else if (percent == 100) {
        this.day_read_color = "#5cb87a";
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
@deep: ~">>>";
.el-card {
  .el-col {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .class-name {
      width: 100%;
      text-align: center;
      margin-top: 10px;
      font-weight: bold;
      font-size: 15px;
    }

    .person-count {
      font-size: 13px;
      margin-top: 3px;
    }
  }
}
</style>
