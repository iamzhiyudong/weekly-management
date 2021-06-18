<template>
  <div class="home-tip-wrap">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>系统介绍</span>
      </div>
      <div class="tip-detail">
        普通用户可通过系统，对自己的日志周志进行日常管理，部门经理在此基础上还可以对自己的员工日志周志进行评阅等。
        <br />
        用户身份分三种，分别是系统管理员、普通员工、部门经理。
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>普通用户</span>
      </div>
      <div class="tip-detail">
        普通用户，可以被管理员添加至部门下，然后可以查看同部门下的其他人员的提交情况及历史日志周志。
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>管理员</span>
      </div>
      <div class="tip-detail">
        可以对公司的职位、部门、人员进行管理。
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "HomeTip",
  data() {
    return {};
  },
};
</script>

<style scoped lang="less">
.clearfix {
  font-weight: bold;
}
.tip-detail {
  font-size: 14px;
  line-height: 22px;
    color: #666;
}
</style>
