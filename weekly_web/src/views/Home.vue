<template>
  <el-container class="home-wrap">
    <!--侧边栏-->
    <el-aside width="170px">
      <div class="title">日志 · 周报系统</div>
      <!--侧边栏菜单区-->
      <el-menu
        background-color="#272C33"
        text-color="#fff"
        active-text-color="#409EFF"
        unique-opened
        router
        :default-active="$route.path"
      >
        <!--一级菜单-->
        <el-submenu :index="item.id.toString()" v-for="(item, index) in menuList" :key="item.id">
          <!--一级菜单的模板区-->
          <template slot="title">
            <!--图标-->
            <i :class="`${iconList[index]}  menu-icon`"></i>
            <!--文本-->
            <span>{{ item.name }}</span>
          </template>
          <!--二级菜单-->
          <el-menu-item :index="'/' + el.path" v-for="el in item.children" :key="el.id">
            <!--图标-->
            <i class="el-icon-menu"></i>
            <!--文本-->
            <span>{{ el.name }}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!--右边的区域-->
    <el-container>
      <!--头部区域-->
      <el-header>
        <div v-show="user_info.user_id != '10000'" class="header-tip">{{headerTip.dept}} · {{headerTip.pos}}{{headerTip.admin=='0'?'':' · (经理)'}}</div>
        <div v-show="user_info.user_id == '10000'" class="header-tip">系统管理员</div>
        <!--用户名下拉菜单-->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ user_info.user_name
            }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="pwd">修改密码</el-dropdown-item>
            <el-dropdown-item>
              <el-button size="mini" type="primary" @click="exit">退出</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!--右边内容主体-->
      <el-main>
        <router-view></router-view>
        <div class="copyright">Copyright &copy; 2019-2020 iamzhiyudong版权所有</div>
      </el-main>
      <!--个人信息对话框-->
      <el-dialog title="个人信息" :visible.sync="dialogVisible_userInfo" width="50%">
        <div class="my-info-box">
          <div>
            <el-tag>用户名：</el-tag>
            <span>{{ user_info.user_name }}</span>
          </div>
          <div>
            <el-tag>职 位：</el-tag>
            <span>
              {{
              user_info.pos_name
              }}
            </span>
          </div>
          <div>
            <el-tag>身 份：</el-tag>
            <span>{{user_info.user_is_admin=='0'?'普通员工':'经理'}}</span>
          </div>
          <div>
            <el-tag>性 别：</el-tag>
            <span>{{ user_info.user_sex }}</span>
          </div>
          <div>
            <el-tag>手机号：</el-tag>
            <span>{{ user_info.user_phone }}</span>
          </div>
          <!-- <div>
            <el-tag>管理员：</el-tag
            ><span>{{ user_info.user_read_person }}</span>
          </div>-->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="warning" @click="goEditDialog" size="small">编辑资料</el-button>
          <el-button @click="dialogVisible_userInfo = false" size="small">关 闭</el-button>
        </span>
      </el-dialog>
      <!--编辑资料对话框-->
      <el-dialog title="编辑资料" :visible.sync="dialogVisible_userInfoEdit" width="50%">
        <div class="my-info-edit-box">
          <div>
            <el-tag>用户名：</el-tag>
            <el-input v-model="user_info_form.user_name" size="small"></el-input>
          </div>
          <div>
            <el-tag>职 位：</el-tag>
            <!-- <el-input
              :value="user_info.user_role_id == 0 ? '普通用户' : '管理员'"
              size="small"
              disabled
            ></el-input>-->
            <el-input :value="user_info.pos_name" size="small" disabled></el-input>
          </div>
          <div>
            <el-tag>身 份：</el-tag>
            <el-input :value="user_info.user_is_admin=='0'?'普通员工':'经理'" size="small" disabled></el-input>
          </div>
          <div>
            <el-tag>性 别：</el-tag>
            <!--<el-input v-model="user_info_form.user_sex" size="small"></el-input>-->
            <el-select v-model="user_info_form.user_sex" placeholder="请选择性别" size="small">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </div>
          <div>
            <el-tag>手机号：</el-tag>
            <el-input v-model="user_info_form.user_phone" size="small"></el-input>
          </div>
          <!-- <div>
            <el-tag>管理员：</el-tag>
            <el-input v-model="user_info.user_read_person" size="small" disabled></el-input>
          </div>-->
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click="submitUserInfo" size="small">确认修改</el-button>
          <el-popconfirm title="确认放弃所做更改吗?" @onConfirm="cancelEdit" class="edit-pop">
            <el-button slot="reference" size="small">取 消</el-button>
          </el-popconfirm>
        </span>
      </el-dialog>
      <!--修改密码-->
      <el-dialog title="修改密码" :visible.sync="dialogVisible_pwd" width="50%">
        <el-form
          :model="pwd_form"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="新密码：" prop="pwd1">
            <el-input
              v-model="pwd_form.new_pwd_1"
              size="small"
              class="form-input"
              autocomplete="off"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="再次输入：" prop="pwd2">
            <el-input v-model="pwd_form.new_pwd" size="small" class="form-input" type="password"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click="submitPwd" size="small">确认修改</el-button>
          <el-button slot="reference" size="small" @click="cancelPwd">取 消</el-button>
        </span>
      </el-dialog>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    // 验证密码1
    var validatePwd1 = (rule, value, callback) => {
      if (this.pwd_form.new_pwd_1 == "") {
        callback(new Error("请输入密码"));
      } else if (
        this.pwd_form.new_pwd_1.length < 6 ||
        this.pwd_form.new_pwd_1.length > 30
      ) {
        callback(new Error("长度在6-30个字符"));
      } else {
        if (this.pwd_form.new_pwd != "") {
          this.$refs.ruleForm.validateField("pwd2");
        }
        callback();
      }
    };
    // 验证密码2
    var validatePwd2 = (rule, value, callback) => {
      if (this.pwd_form.new_pwd == "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.pwd_form.new_pwd != this.pwd_form.new_pwd_1) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      }
    };
    return {
      // 左侧菜单数据
      menuList: [],
      // 图标数组
      iconList: [
        "el-icon-pie-chart",
        "el-icon-document-remove",
        "el-icon-document",
        "el-icon-edit",
        "el-icon-edit-outline",
        "el-icon-s-custom",
      ],
      // 用户信息
      user_info: {},
      // 个人信息对话框
      dialogVisible_userInfo: false,
      // 编辑资料对话框
      dialogVisible_userInfoEdit: false,
      // 修改密码对话框
      dialogVisible_pwd: false,
      // 新密码
      pwd_form: {
        new_pwd_1: "",
        new_pwd: "",
      },
      // 个人信息提交对象
      user_info_form: {
        user_name: "",
        user_phone: "",
        user_sex: "",
      },
      rules: {
        pwd1: [{ validator: validatePwd1, trigger: "blur" }],
        pwd2: [{ validator: validatePwd2, trigger: "blur" }],
      },
      // 头部部门信息
      headerTip:{
        dept: '',
        pos: '',
        admin: '',
      },
    };
  },
  methods: {
    // 退出按钮
    exit() {
      window.sessionStorage.removeItem("token");
      this.$router.replace("/index");
    },
    // 获取功能栏数据
    async getMenuList() {
      const res = await this.$api.getHomeList();
      if (res.code !== 0) return this.$message.error("获取菜单失败");
      this.menuList = res.data;
    },
    // 获取个人信息
    async getUserInfo() {
      const info = await this.$api.getUserInfo();
      // 保存信息
      this.user_info = info.data[0];
      // 初始化编辑资料初始值
      this.user_info_form.user_name = this.user_info.user_name;
      this.user_info_form.user_phone = this.user_info.user_phone;
      this.user_info_form.user_sex = this.user_info.user_sex;
      // 设置头部信息
      this.headerTip.dept = this.user_info.dept_name;
      this.headerTip.pos = this.user_info.pos_name;
      this.headerTip.admin = this.user_info.user_is_admin;
    },
    // 编辑资料按钮事件
    goEditDialog() {
      this.dialogVisible_userInfoEdit = true;
      this.dialogVisible_userInfo = false;
    },
    // 提交用户修改的信息
    submitUserInfo() {
      this.$api.updateUserInfo(this.user_info_form).then((res) => {
        if (res.code == 0) {
          // 关闭对话框
          this.dialogVisible_userInfoEdit = false;
          this.$message.success(res.msg);
          this.getUserInfo();
        }
      });
    },
    // 取消编辑资料
    cancelEdit() {
      this.dialogVisible_userInfoEdit = false;
    },
    // 显示资料对话框
    handleCommand(command) {
      if (command == "info") {
        this.dialogVisible_userInfo = true;
      } else if (command == "pwd") {
        this.dialogVisible_pwd = true;
      }
    },
    // 提交修改密码
    submitPwd() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log("通过验证");
          // 修改密码
          this.$api.updatePwd({ pwd: this.pwd_form.new_pwd }).then((res) => {
            if (res.code == 0) {
              this.$message.success(res.msg);
              this.dialogVisible_pwd = false;
            } else {
              this.$message.warning(res.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 隐藏密码修改框
    cancelPwd() {
      this.dialogVisible_pwd = false;
    },
  },
  created() {
    // 获取功能栏数据
    this.getMenuList();
    // 获取个人信息
    this.getUserInfo();
  },
};
</script>
<style lang="less" scoped>
@deep: ~">>>";
.el-header {
  background-color: #fff;
}

.el-aside {
  /*background-color: #409EFF;*/
  background-color: #272c33;
}

.el-main {
  background-color: #f1f2f7;
  padding: 10px;

  .copyright {
    font-size: 13px;
    text-align: center;
    margin: 30px 0 30px 0;
    color: #777;
  }
}

.home-wrap {
  height: 100%;

  .el-aside {
    .el-menu {
      border-right: none;

      .el-menu-item {
        min-width: 170px;
      }
    }

    .title {
      color: white;
      font-weight: bold;
      font-size: 18px;
      text-align: center;
      height: 60px;
      line-height: 60px;
      box-sizing: border-box;
      text-shadow: 0 0 5px #fff;
    }
  }
  /*设置导航栏居中*/
  .el-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-shadow: 5px 0 10px 1px #ccc !important;
    z-index: 100;

    .el-button {
      border: 1px solid #fff;
      height: 30px;
    }
  }
  /*用户名下拉菜单*/
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  /*标签*/
  .el-tag {
    width: 70px;
    margin: 4px 15px 4px 0;
    font-weight: bold;
    font-size: 13px;
  }

  .my-info-box {
    margin-left: 30px;
  }
  /*编辑资料*/
  .my-info-edit-box {
    margin-left: 30px;
    .el-input {
      width: 250px;
    }
    .el-select {
      width: 250px;
    }
  }
  .edit-pop {
    margin-left: 5px;
  }
  /*修改密码*/
  .my-info-pwd-box {
    margin-left: 30px;
    .el-input {
      width: 260px;
    }
    .el-tag {
      width: 80px;
      margin: 4px 15px 4px 0;
      font-weight: bold;
      font-size: 13px;
    }
  }

  /*修改密码*/
  .demo-ruleForm {
    margin-left: 50px;
    .form-input {
      width: 200px;
    }
  }
}

/*设置字体图标*/
.menu-icon {
  margin-right: 10px;
  color: #c8c9ce;
}
.header-tip {
  margin-right: 30px;
  font-size: 14px;
}
</style>
