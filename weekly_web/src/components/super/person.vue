<template>
  <div class="pos-wrap">
    <BreadCrumb second_path="人员管理" third_path="人员管理" />
    <el-card>
      <!--添加按钮-->
      <el-button
        class="add-button"
        type="primary"
        icon="el-icon-plus"
        @click="showAddUserDialog = true"
      >添加人员</el-button>
      <!-- 表格 -->
      <el-table :data="userList" style="width: 100%;" stripe border>
        <el-table-column label="序号" width="80" type="index"></el-table-column>
        <el-table-column prop="user_name" label="姓名"></el-table-column>
        <el-table-column prop="user_account" label="账号"></el-table-column>
        <el-table-column prop="user_phone" label="手机号"></el-table-column>
        <el-table-column prop="user_sex" label="性别"></el-table-column>
        <el-table-column prop="user_pwd" label="密码"></el-table-column>
        <el-table-column prop="pos_name" label="职位"></el-table-column>
        <el-table-column prop="dept_name" label="部门"></el-table-column>
        <el-table-column prop="dept_admin_id" label="是否经理">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-check"
              v-show="scope.row.user_is_admin=='1'"
              size="mini"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-close"
              v-show="scope.row.user_is_admin!='1'"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              content="编辑"
              placement="top"
              v-show="scope.row.user_id != 10000"
              :open-delay="tool_tip_delay"
            >
              <el-button
                type="success"
                icon="el-icon-edit"
                size="mini"
                @click="handleShowEditDialog(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="删除"
              placement="top"
              :open-delay="tool_tip_delay"
              v-show="scope.row.user_id != 10000"
            >
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="delUser(scope.row.user_id)"
                class="del-popbox"
              >
                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑职位对话框 -->
    <el-dialog title="编辑人员信息" :visible.sync="showEditDialog" width="50%">
      <!-- 主要内容 -->
      <div class="my-info-edit-box">
        <div>
          <el-tag>用户名：</el-tag>
          <el-input v-model="currentUserInfo.user_name" size="small"></el-input>
        </div>
        <div>
          <el-tag>用户账号：</el-tag>
          <el-input v-model="currentUserInfo.user_account" size="small"></el-input>
        </div>
        <div>
          <el-tag>手机号</el-tag>
          <el-input v-model="currentUserInfo.user_phone" size="small"></el-input>
        </div>
        <div>
          <el-tag>性别</el-tag>
          <!-- <el-input v-model="currentUserInfo.user_sex" size="small"></el-input> -->
          <el-form
            :inline="true"
            :model="currentUserInfo"
            class="demo-form-inline"
            style="display: inline-block; margin:0;padding:0;vertical-align:top;height:100%"
          >
            <el-form-item label size="small">
              <el-select v-model="currentUserInfo.user_sex" placeholder="性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-tag>用户密码：</el-tag>
          <el-input v-model="currentUserInfo.user_pwd" size="small"></el-input>
        </div>
        <div>
          <el-tag>部门：</el-tag>
          <!-- <el-input v-model="currentUserInfo.dept_name" size="small"></el-input> -->
          <el-form
            :inline="true"
            :model="currentUserInfo"
            class="demo-form-inline"
            style="display: inline-block; margin:0;padding:0;vertical-align:top;"
          >
            <el-form-item label size="small">
              <el-select v-model="currentUserInfo.user_department_id" placeholder="部门">
                <!-- <el-option label="男" value="男"></el-option> -->
                <el-option
                  v-for="(item) in deptInfo"
                  :label="item.dept_name"
                  :value="item.dept_id"
                  :key="item.dept_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-tag>职位：</el-tag>
          <!-- <el-input v-model="currentUserInfo.pos_name" size="small"></el-input> -->
          <el-form
            :inline="true"
            :model="currentUserInfo"
            class="demo-form-inline"
            style="display: inline-block; margin:0;padding:0;vertical-align:top;"
          >
            <el-form-item label size="small">
              <el-select v-model="currentUserInfo.user_position_id" placeholder="职位">
                <el-option
                  v-for="(item) in posInfo"
                  :label="item.pos_name"
                  :value="item.pos_id"
                  :key="item.pos_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-tag>部门经理：</el-tag>
          <!-- <el-input v-model="currentUserInfo.user_is_admin" size="small"></el-input> -->
          <el-form
            :inline="true"
            :model="currentUserInfo"
            class="demo-form-inline"
            style="display: inline-block; margin:0;padding:0;vertical-align:top;"
          >
            <el-form-item label size="small">
              <el-select v-model="currentUserInfo.user_is_admin" placeholder="是否">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="subEdit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加人员对话框 -->
    <el-dialog title="添加人员" :visible.sync="showAddUserDialog" width="50%">
      <!-- 主要内容 -->
      <div class="my-info-edit-box">
        <div>
          <el-tag>用户名：</el-tag>
          <el-input v-model="addUserInfo.user_name" size="small"></el-input>
        </div>
        <div>
          <el-tag>用户账号：</el-tag>
          <el-input v-model="addUserInfo.user_account" size="small"></el-input>
        </div>
        <div>
          <el-tag>手机号</el-tag>
          <el-input v-model="addUserInfo.user_phone" size="small"></el-input>
        </div>
        <div>
          <el-tag>性别</el-tag>
          <!-- <el-input v-model="addUserInfo.user_sex" size="small"></el-input> -->
          <el-form
            :inline="true"
            :model="addUserInfo"
            class="demo-form-inline"
            style="display: inline-block; margin:0;padding:0;vertical-align:top;height:100%"
          >
            <el-form-item label size="small">
              <el-select v-model="addUserInfo.user_sex" placeholder="性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-tag>用户密码：</el-tag>
          <el-input v-model="addUserInfo.user_pwd" size="small"></el-input>
        </div>
        <div>
          <el-tag>部门：</el-tag>
          <!-- <el-input v-model="addUserInfo.dept_name" size="small"></el-input> -->
          <el-form
            :inline="true"
            :model="addUserInfo"
            class="demo-form-inline"
            style="display: inline-block; margin:0;padding:0;vertical-align:top;"
          >
            <el-form-item label size="small">
              <el-select v-model="addUserInfo.user_department_id" placeholder="部门">
                <!-- <el-option label="男" value="男"></el-option> -->
                <el-option
                  v-for="(item) in deptInfo"
                  :label="item.dept_name"
                  :value="item.dept_id"
                  :key="item.dept_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-tag>职位：</el-tag>
          <!-- <el-input v-model="addUserInfo.pos_name" size="small"></el-input> -->
          <el-form
            :inline="true"
            :model="addUserInfo"
            class="demo-form-inline"
            style="display: inline-block; margin:0;padding:0;vertical-align:top;"
          >
            <el-form-item label size="small">
              <el-select v-model="addUserInfo.user_position_id" placeholder="职位">
                <el-option
                  v-for="(item) in posInfo"
                  :label="item.pos_name"
                  :value="item.pos_id"
                  :key="item.pos_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-tag>部门经理：</el-tag>
          <!-- <el-input v-model="addUserInfo.user_is_admin" size="small"></el-input> -->
          <el-form
            :inline="true"
            :model="addUserInfo"
            class="demo-form-inline"
            style="display: inline-block; margin:0;padding:0;vertical-align:top;"
          >
            <el-form-item label size="small">
              <el-select v-model="addUserInfo.user_is_admin" placeholder="是否">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 职位列表
      userList: [],
      // 编辑对话框
      showEditDialog: false,
      // 当前人员的信息
      currentUserInfo: {
        user_name: '',
        user_account: '',
        user_phone: '',
        user_sex: '',
        user_pwd: '',
        dept_name: '',
        pos_name: '',
        user_is_admin: '',
      },
      // 职位信息
      posInfo: [],
      // 部门信息
      deptInfo: [],
      // 提示延时时间
      tool_tip_delay: 1000,
      // 添加职位的显示
      showAddUserDialog: false,
      // 要添加的职位
      addUserInfo:{
        user_name: '',
        user_account: '',
        user_phone: '',
        user_sex: '',
        user_pwd: '',
        dept_name: '',
        pos_name: '',
        user_is_admin: '',
      },
    }
  },
  created() {
    this.getAllUserInfo();
    this.getDeptInfo();
    this.getPosInfo();
  },
  methods: {
    // 获取部门信息
    async getDeptInfo() {
      const Info = await this.$api.getDeptInfo();
      this.deptInfo = Info.data;
    },
    // 获取职位信息
    async getPosInfo() {
      const Info = await this.$api.getPosInfo();
      this.posInfo = Info.data;
    },
    // 获取所有人的列表
    async getAllUserInfo() {
      const userInfo = await this.$api.getAllUserInfo();
      this.userList = userInfo.data;
    },
    // 显示编辑职位对话框
    handleShowEditDialog(data) {
      this.showEditDialog = true;
      this.currentUserInfo = data;
    },
    // 提交修改的信息
    async subEdit() {
      const data = this.currentUserInfo;
      const form = {
        user_name: data.user_name,
        user_account: data.user_account,
        user_phone: data.user_phone,
        user_sex: data.user_sex,
        user_pwd: data.user_pwd,
        user_department_id: data.user_department_id,
        user_position_id: data.user_position_id,
        user_is_admin: data.user_is_admin,
        user_id: data.user_id,
      }
      // 是否设置成管理员
      if (data.user_is_admin != '0') {
        // for(let i = 0; i < this.deptInfo.length; i++) {
        //   if (data.user_department_id == this.deptInfo[i].dept_id) {
        //     form.user_up_department_id = this.deptInfo[i].dept_parent_id;
        //   }
        // }
      } else {
        form.user_up_department_id = null;
      }
      const res = await this.$api.updateSuperUserInfo(form);
      if (res.code == '0') {
        this.$message.success(res.msg);
        this.showEditDialog = false;
        this.getAllUserInfo();
      } else {
        this.$message.error(res.msg);
      }
    },
    // 删除人
    async delUser(id) {
      const res = await this.$api.delSuperUserInfo({user_id: id});
      if (res.code == '0') {
        this.$message.success(res.msg);
        this.getAllUserInfo();
      } else {
        this.$message.error(res.msg);
      }
    },
    // 添加人员
    async addUser() {
      const data = this.addUserInfo;
      const form = {
        user_name: data.user_name,
        user_account: data.user_account,
        user_phone: data.user_phone,
        user_sex: data.user_sex,
        user_pwd: data.user_pwd,
        user_department_id: data.user_department_id,
        user_position_id: data.user_position_id,
        user_is_admin: data.user_is_admin,
      }
      // console.log(form);
      // return;
      // 是否设置成管理员
      if (data.user_is_admin != '0') {
        // for(let i = 0; i < this.deptInfo.length; i++) {
        //   if (data.user_department_id == this.deptInfo[i].dept_id) {
        //     form.user_up_department_id = this.deptInfo[i].dept_parent_id;
        //   }
        // }
      } else {
        form.user_up_department_id = null;
      }
      const res = await this.$api.addSuperUserInfo(form);
      if (res.code == '0') {
        this.$message.success(res.msg);
        this.showAddUserDialog = false;
        this.getAllUserInfo();
      } else {
        this.$message.error(res.msg);
      }
    }
  }
}
</script>

<style lang="less" scoped>
@deep: ~">>>";
/*编辑资料*/
.my-info-edit-box {
  margin-left: 30px;

  & > div {
    margin-bottom: 20px;
    height: 30px;
  }
  .el-tag {
    margin-right: 10px;
    width: 75px;
  }
  .el-input {
    width: 250px;
  }
  .el-select {
    width: 250px;
  }
}
.el-tooltip {
  margin-left: 5px;
}
.add-button {
  margin-bottom: 20px;
}
</style>