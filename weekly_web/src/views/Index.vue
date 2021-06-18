<template>
  <div class="index-wrap">
    <!-- 主体盒子 -->
    <div class="main-box">
      <!-- 标题 -->
      <div class="title-bar">基于vue+node的日志一键生成周报系统</div>
      <!-- tab标签 -->
      <el-tabs v-model="tab_active" @tab-click="tabClick" class="mytabs">
        <el-tab-pane label="登录" name="login">
          <!--登录组件-->
          <Login />
        </el-tab-pane>
        <!-- <el-tab-pane label="注册" name="register"> -->
          <!--注册组件-->
          <!-- <Register /> -->
        <!-- </el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>
<script>
// 登录组件
import Login from "@/components/Login";
// import Register from "@/components/Register";
export default {
  data() {
    return {
      // 默认选择登录标签
      tab_active: "login"
    };
  },
  methods: {
    tabClick() {}
  },
  components: {
    Login,
    // Register
  }
};
</script>
<style lang='less' scoped>
@deep: ~">>>";
.index-wrap {
  width: 100%;
  height: 100%;
  /*background-color: #409EFF;*/
  display: flex;
  align-items: center;
  justify-content: center;

  // 中间的盒子
  .main-box {
    width: 400px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgb(209, 209, 209);

    // 标题
    .title-bar {
      width: 100%;
      height: 40px;
      margin-top: 10px;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      background-color: rgb(255, 254, 254);
      box-sizing: border-box;
    }
  }
}

// 修改tab样式
.mytabs {
  @{deep}.el-tabs__item {
    // width: 100%;
    width: 380px;
    padding: 0 10px !important;
    text-align: center;
    padding: 0;
  }
}
</style>
