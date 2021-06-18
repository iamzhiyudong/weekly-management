<template>
  <div class="submission-wrap">
    <BreadCrumb second_path="总体概览" third_path="提交情况" />

    <el-card>
      <!--提示-->
      <el-alert
        title="查看同部门其他人员的日志、周志提交情况"
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
            :percentage="week_log_submission"
            :color="week_color"
          ></el-progress>
          <div class="class-name">周志提交情况</div>
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
      // 周志提交情况百分比
      week_log_submission: 0,
      // 同部门周志共几人
      week_person_count: 0,
      // 控制进度条的颜色
      day_color: "#1989fa",
      week_color: "#1989fa",
    };
  },
  // components: {
  //   BreadCrumb,
  // },
  created() {
    // 获取日志、周志提交情况
    this.getDay();
    this.getWeek();
  },
  methods: {
    // 获取日志提交情况
    async getDay() {
      const { data: result } = await this.$api.getDayOverview();
      console.log(result);
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
    // 获取周志提交情况
    async getWeek() {
      const { data: result } = await this.$api.getWeekOverview();
      // 计算百分比
      if (result[0].all_num === 0) {
        return;
      }
      const percent = Number(
        ((result[0].already_num / result[0].all_num) * 100).toFixed(0)
      );
      this.week_person_count = result[0].all_num;
      this.week_log_submission = percent;
      // 处理进度条的颜色
      if (percent >= 0 && percent <= 20) {
        this.week_color = "#f56c6c";
      } else if (percent > 20 && percent <= 40) {
        this.week_color = "#e6a23c";
      } else if (percent > 40 && percent <= 60) {
        this.week_color = "#1989fa";
      } else if (percent > 60 && percent < 100) {
        this.week_color = "#6f7ad3";
      } else if (percent == 100) {
        this.week_color = "#5cb87a";
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
