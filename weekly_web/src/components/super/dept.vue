<template>
  <div class="dept-wrap">
    <BreadCrumb second_path="部门管理" third_path="部门管理" />
    <el-card>
      <!--添加按钮-->
      <!-- <el-button
        class="add-button"
        type="primary"
        icon="el-icon-plus"
        @click="showAddPosDialog = true"
      >添加部门</el-button>-->
      <!-- 树形 -->
      <el-tree :data="deptList" node-key="dept_id" default-expand-all :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ data.dept_name }}</span>
          <span>
            <el-button type="text" size="mini" @click="() => handleShowAddDialog(data)">添加子级</el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => handleShowEditDialog(data)"
              v-show="data.dept_parent_id != null"
            >编辑</el-button>
            <!-- <el-button type="text" size="mini" @click="() => delDept(node, data)">删除</el-button> -->
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="() => delDept(node, data)"
              class="del-popbox"
              v-show="data.dept_parent_id != null"
            >
              <el-button type="text" size="mini" slot="reference">删除</el-button>
            </el-popconfirm>
          </span>
        </span>
      </el-tree>
    </el-card>

    <!-- 编辑部门对话框 -->
    <el-dialog title="编辑职位信息" :visible.sync="showEditDialog" width="50%">
      <!-- 主要内容 -->
      <div class="my-info-edit-box">
        <div>
          <el-tag>部门名：</el-tag>
          <el-input v-model="currentDeptInfo.dept_name" size="small"></el-input>
        </div>
        <div>
          <el-tag>上级部门</el-tag>
          <el-form
            :inline="true"
            :model="currentDeptInfo"
            class="demo-form-inline"
            style="display: inline-block; margin:0;padding:0;vertical-align:top;"
          >
            <el-form-item label size="small">
              <el-select v-model="currentDeptInfo.dept_parent_id" placeholder="部门">
                <!-- <el-option label="男" value="男"></el-option> -->
                <el-option
                  v-for="(item) in deptMenu"
                  :label="item.dept_name"
                  :value="item.dept_id"
                  :key="item.dept_id"
                ></el-option>
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
    <!-- 添加部门对话框 -->
    <el-dialog title="添加部门" :visible.sync="showAddDialog" width="50%">
      <!-- 主要内容 -->
      <div class="my-info-edit-box">
        <div>
          <el-tag>部门名称：</el-tag>
          <el-input :value="addDeptInfo.dept_name" v-model="addDeptInfo.dept_name" size="small"></el-input>
        </div>
      </div>
      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="addDept">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 部门列表
      deptList: [],
      // 编辑对话框
      showEditDialog: false,
      // 当前职位的信息
      currentDeptInfo: {
        dept_id: '',
        dept_name: '',
        dept_parent_id: '',
      },
      // 部门菜单列表
      deptMenu: [],
      // 提示延时时间
      tool_tip_delay: 1000,
      // 添加职位的显示
      showAddDialog: false,
      // 要添加的职位
      addDeptInfo: {
        dept_name: '',
        dept_parent_id: '',
      }
    }
  },
  created() {
    this.getDeptInfo();
  },
  methods: {
    // 获取部门列表
    async getDeptInfo() {
      const Info = await this.$api.getSuperDeptInfo();
      this.deptList = Info.data;
    },
    // 获取部门菜单列表
    async getDeptMenu(data) {
      const Info = await this.$api.getSuperDeptMenu({dept_id: data.dept_id});
      this.deptMenu = Info.data;
    },
    // 显示编辑部门对话框
    async handleShowEditDialog(data) {
      this.showEditDialog = true;
      await this.getDeptMenu(data)
      this.currentDeptInfo.dept_name = data.dept_name;
      this.currentDeptInfo.dept_parent_id = data.dept_parent_id;
      this.currentDeptInfo.dept_id = data.dept_id;
      
    },
    // 显示编辑部门对话框
    handleShowAddDialog(data) {
      // console.log(data);
      this.showAddDialog = true;
      this.addDeptInfo.dept_parent_id = data.dept_id;
    },
    // 提交修改的信息
    async subEdit() {
      // console.log(this.currentDeptInfo);
      const res = await this.$api.updateSuperDept(this.currentDeptInfo);
      if (res.code == '0') {
        this.$message.success(res.msg);
        this.showEditDialog = false;
        this.getDeptInfo();
      } else {
        this.$message.error(res.msg);
      }
    },
    // 删除职位
    async delDept(node, data) {
      // console.log(data);
      const res = await this.$api.delSuperDeptInfo({dept_id: data.dept_id});
      if (res.code == '0') {
        this.$message.success(res.msg);
        this.getDeptInfo();
      } else {
        this.$message.error(res.msg);
      }
    },
    // 添加职位
    async addDept() {
      // console.log(this.addDeptInfo);
      const res = await this.$api.addSuperDeptInfo(this.addDeptInfo);
      if (res.code == '0') {
        this.$message.success(res.msg);
        this.getDeptInfo();
        this.showAddDialog = false;
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.del-popbox {
  margin-left: 10px;
}
</style>