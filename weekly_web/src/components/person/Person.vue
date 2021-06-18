<template>
  <div>
    <BreadCrumb second_path="部门人员" third_path="部门人员" />
    <!--主体的卡片-->
    <el-card>
      <!--提示-->
      <el-alert title="查看自己部门下的人员" type="warning" style="margin-bottom: 20px;"></el-alert>
      <!--添加人员按钮-->
      <!-- <el-button type="primary" class="add-btn" icon="el-icon-plus" @click="addBtnClick">添加成员</el-button> -->
      <el-table :data="person_list" style="width: 100%;" stripe border>
        <el-table-column label="序号" width="80" type="index"></el-table-column>
        <el-table-column prop="user_name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="user_is_admin" label="部门经理" width="80">
          <template slot-scope="scope">
            <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
            {{ scope.row.user_is_admin == '0'? '': '是'}}
          </template>
        </el-table-column>
        <el-table-column prop="user_account" label="账号" width="100"></el-table-column>
        <el-table-column prop="user_phone" label="手机号" width="140"></el-table-column>
        <el-table-column prop="user_sex" label="性别" width="60"></el-table-column>
        <el-table-column prop="pos_name" label="职位" width="130"></el-table-column>
        <el-table-column prop="dept_name" label="部门"></el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popconfirm title="确定删除吗？" @onConfirm="delBtnClick(scope.row.user_id)">
              <el-button type="danger" size="mini" icon="el-icon-delete" slot="reference"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>-->
      </el-table>
    </el-card>

    <!--添加按钮的弹出框-->
    <el-dialog title="添加成员" :visible.sync="dialogVisible" width="70%">
      <!--搜索框-->
      <el-row :gutter="10">
        <el-col :span="7">
          <el-input placeholder="请输入用户手机号(账号)" v-model="search_value"></el-input>
        </el-col>
        <el-col :span="5">
          <!--搜索按钮-->
          <el-button icon="el-icon-search" type="primary" @click="search">搜索</el-button>
        </el-col>
      </el-row>

      <!--结果显示区域-->
      <el-table :data="search_result" style="width: 100%;" stripe border class="my-result-table">
        <el-table-column label="序号" width="180" type="index"></el-table-column>
        <el-table-column prop="user_name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="user_phone" label="账号" width="180"></el-table-column>
        <el-table-column prop="user_sex" label="性别"></el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPerson" v-show="search_result.length > 0">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 人员列表
      person_list: [],
      // 添加框的显示和隐藏
      dialogVisible: false,
      // 搜索框中输入的值
      search_value: "",
      // 搜索的结果数组
      search_result: [],
    };
  },
  methods: {
    // 获取人员列表
    getPersonData() {
      this.$api.adminGetDeptPerson().then((res) => {
        console.log(res);
        this.person_list = res.data;
      });
    },
    // 删除按钮事件
    delBtnClick(user_id) {
      this.$api.adminDelPerson({ user_id }).then((res) => {
        if (res.code === 0) {
          this.$message.success(res.msg);
          this.getPersonData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 添加按钮的事件
    addBtnClick() {
      this.dialogVisible = true;
    },
    // 点击搜索按钮事件
    search() {
      this.$api
        .adminSearchPerson({ phone_num: this.search_value })
        .then((res) => {
          this.search_result = res.data;
          if (res.data.length === 0) {
            this.$message.warning("没有此用户！");
          } else {
            this.$message.success("查找成功");
          }
        });
    },
    // 添加人员
    addPerson() {
      this.$api
        .adminAddPerson({ user_id: this.search_result[0].user_id })
        .then((res) => {
          if (res.code === 0) {
            this.$message.success(res.msg);
            this.dialogVisible = false;
            this.getPersonData();
          } else {
            this.$message.error(res.msg);
          }
        });
    },
  },
  created() {
    this.getPersonData();
  },
};
</script>

<style lang="less" scoped>
.add-btn {
  margin-bottom: 15px;
}

.my-result-table {
  margin-top: 15px;
}
</style>
