<template>
  <div id="register-wrap">
    <!-- 表单 -->
    <el-form
      label-width="0px"
      class="my-form"
      :rules="registerFormRules"
      :model="registerForm"
      ref="registerRef"
    >
      <!-- 姓名 -->
      <el-form-item prop="name">
        <el-input placeholder="请输入姓名" class="my-input" v-model="registerForm.name"></el-input>
      </el-form-item>
      <!-- 性别 -->
      <el-form-item prop="sex">
        <el-select v-model="registerForm.sex" placeholder="请选择性别" class="my-input">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <!-- 角色 -->
      <el-form-item prop="role">
        <el-select v-model="registerForm.role" placeholder="请选择身份" class="my-input">
          <el-option label="管理员" value="管理员"></el-option>
          <el-option label="普通用户" value="普通用户"></el-option>
        </el-select>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item prop="phone_num">
        <el-input placeholder="请输入手机号" class="my-input" v-model="registerForm.phone_num"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="pwd">
        <el-input placeholder="请输入密码" class="my-input" type="password" v-model="registerForm.pwd"></el-input>
      </el-form-item>
      <!-- 再次输入密码 -->
      <el-form-item prop="_pwd">
        <el-input
          placeholder="请再次输入密码"
          class="my-input"
          type="password"
          v-model="registerForm._pwd"
        ></el-input>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" class="my-btn" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    // 验证输入密码
    const checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码！"));
      } else if (value.length > 20 || value.length < 6) {
        callback(new Error("长度在 6 到 20 个字符"));
      } else {
        // 如果再次输入的密码不为空，触发域验证
        if (this.registerForm._pwd !== "") {
          this.$refs.registerRef.validateField("_pwd");
        }
        callback();
      }
    };
    // 用于验证再次输入的密码
    const _checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码！"));
      } else if (value !== this.registerForm.pwd) {
        callback(new Error("两次输入的密码不一致！"));
      } else {
        callback();
      }
    };

    return {
      // 注册表单
      registerForm: {
        name: "",
        sex: "",
        role: "",
        phone_num: "",
        pwd: "",
        _pwd: ""
      },
      // 注册表单规则
      registerFormRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 6, message: "请输入正确的姓名", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        role: [{ required: true, message: "请选择身份", trigger: "change" }],
        phone_num: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { pattern: /^1[3456789]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" }
        ],
        pwd: [{ validator: checkPwd, trigger: "blur" }],
        _pwd: [{ validator: _checkPwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 注册
    register() {
      // 表单预校验
      this.$refs.registerRef.validate(async valid => {
        if (!valid) return false;
        // 注册
        const res = await this.$api.register(this.registerForm);
        // 注册成功
        if (res.code === 0) {
          this.$message.success("注册成功");
          // 自动登录
          const {phone_num, pwd} = this.registerForm;
          const login_res = await this.$api.login({
            phone_num,
            pwd,
          });
          // 如果登录成功 提示  跳转到home
          if (login_res.code === 0) {
            // 保存token
            window.sessionStorage.setItem('token', login_res.token);
            this.$message.success('自动登录成功');
            this.$router.push('/home');
          } else {
            this.$message.error(login_res.msg);
          }
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
#register-wrap {
  .my-form {
    padding: 20px 26px;

    .my-btn {
      width: 100%;
    }

    @{deep}.my-input {
      width: 100%;
    }
  }
}
</style>