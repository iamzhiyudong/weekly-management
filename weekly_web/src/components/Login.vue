<template>
  <div id="login-wrap">
    <!-- 表单 -->
    <el-form
      label-width="0px"
      :model="loginForm"
      :rules="loginFormRules"
      class="my-form"
      ref="loginFormRef"
    >
      <!-- 输入账号-->
      <!-- <el-form-item prop="phone_num"> -->
      <el-form-item>
        <el-input clearable placeholder="请输入账号" class="my-input" v-model="loginForm.account"></el-input>
      </el-form-item>
      <!-- 输入密码 -->
      <el-form-item prop="pwd">
        <el-input
          clearable
          placeholder="请输入密码"
          class="my-input"
          v-model="loginForm.pwd"
          type="password"
        ></el-input>
      </el-form-item>
      <!-- 提价按钮 -->
      <el-form-item>
        <!-- 按钮 -->
        <el-button type="primary" class="my-btn" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 表单数据
      loginForm: {
        // account: "2000",
        // pwd: "111111"
        account: "",
        pwd: ""
      },
      // 表单验证规则
      loginFormRules: {
        phone_num: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { pattern: /^1[3456789]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 登录
    login() {
      // 表单预校验
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        console.log(this.loginForm);
        // 登录接口
        const res = await this.$api.login(this.loginForm);
        // 登录成功
        if (res.code === 0) {
          // 保存token
          window.sessionStorage.setItem("token", res.token);
          this.$message.success("登录成功");
          this.$router.push("/home");
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
@deep: ~">>>";
#login-wrap {
  @{deep}.my-form {
    padding: 20px 26px;

    .my-input {
      // margin-bottom: 20px;
    }

    .my-btn {
      width: 100%;
    }
  }
}
</style>
