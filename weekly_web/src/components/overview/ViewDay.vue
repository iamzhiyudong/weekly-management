<template>
  <div class="view-day-wrap">
    <BreadCrumb second_path="总体概览" third_path="日志查看" />
    <el-card>
      <!--提示-->
      <el-alert
        title="查看同部门其他人员的历史日志"
        type="warning"
        style="margin-bottom: 20px;"
      >
      </el-alert>
      <el-row class="main-el-row">
        <!--左边的人名-->
        <el-col :span="3" class="left-col">
          <!--人名的菜单-->
          <el-menu>
            <!--人名选项-->
            <el-menu-item
              :index="item.user_id.toString()"
              v-for="item in dept_person"
              :key="item.user_id"
              @click="handleSelect(item.user_id)"
              ref="person_item"
              style="padding: 0;"
            >
              <span slot="title">{{ item.user_name }}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <!--右边的记录  时间线-->
        <el-col :span="20" class="right-col">
          <!--时间线-->
          <el-timeline>
            <!--循环-->
            <el-timeline-item
              :timestamp="item.create_time"
              placement="top"
              v-for="item in time_line_data"
              :key="item.day_id"
            >
              <el-card>
                <el-tag>当日总结</el-tag>
                <p v-html="item.day_summery"></p>
                <el-tag>明天安排</el-tag>
                <p v-html="item.day_next_day"></p>
              </el-card>
            </el-timeline-item>
            <!--如果数据为空的时候-->
            <el-card v-if="time_line_data.length === 0">
              <h4>暂时没有数据哦~</h4>
            </el-card>
          </el-timeline>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 部门人员
      dept_person: [],
      // 时间线数据
      time_line_data: [],
    };
  },
  methods: {
    // 获取部门人员列表
    async getDeptPerson() {
      const result = await this.$api.getDeptPerson();
      this.dept_person = result.data;
      // 在数据获取成功以后，模拟点击第一个人名  渲染的异步
      this.$nextTick(function () {
        if (this.dept_person.length > 0) {
          this.$refs.person_item[0].$el.click();
        }
      });
    },
    // 根据ID获取历史日志
    async getHistoryDay(id) {
      const result = await this.$api.getHistoryDay({ id });
      this.time_line_data = result.data;
    },
    // 人名的点击事件
    handleSelect(user_id) {
      // 根据ID获取历史日志
      this.getHistoryDay(user_id);
    },
  },
  created() {
    // 获取部门人员
    this.getDeptPerson();
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
@deep: ~">>>";
.view-day-wrap {
  /*左边人名最小的宽度*/
  .el-menu {
    min-width: 100px;

    .el-menu-item {
      text-align: center;
    }
  }
  /*控制主体部分的行高*/
  @{deep}.main-el-row {
    /*最大的高度*/
    height: 510px !important;
  }
  /*左边的col*/
  .left-col {
    max-height: 100%;
    overflow-y: auto;
  }
  /*右边的col*/
  .right-col {
    max-height: 100%;
    overflow-y: auto;
  }
}
</style>
