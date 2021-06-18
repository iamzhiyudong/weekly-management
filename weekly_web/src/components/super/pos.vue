<template>
  <div class="pos-wrap">
    <BreadCrumb second_path="职位管理" third_path="职位管理" />
    <el-card>
      <!--添加按钮-->
      <el-button
        class="add-button"
        type="primary"
        icon="el-icon-plus"
        @click="showAddPosDialog = true"
      >添加职位</el-button>
      <!-- 表格 -->
      <el-table :data="posList" style="width: 100%;" stripe border>
        <el-table-column label="序号" width="80" type="index"></el-table-column>
        <el-table-column prop="pos_name" label="职位名称"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              content="编辑"
              placement="top"
              v-show="scope.row.pos_id != 8"
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
              v-show="scope.row.pos_id != 8"
            >
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="delPos(scope.row.pos_id)"
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
    <el-dialog title="编辑职位信息" :visible.sync="showEditDialog" width="50%">
      <!-- 主要内容 -->
      <div class="my-info-edit-box">
        <div>
          <el-tag>职位 ID：</el-tag>
          <el-input v-model="currentPosInfo.pos_id" size="small" disabled></el-input>
        </div>
        <div>
          <el-tag>职位名称：</el-tag>
          <el-input :value="currentPosInfo.pos_name" v-model="currentPosInfo.pos_name" size="small"></el-input>
        </div>
      </div>
      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="subEdit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加职位对话框 -->
    <el-dialog title="添加职位" :visible.sync="showAddPosDialog" width="50%">
      <!-- 主要内容 -->
      <div class="my-info-edit-box">
        <div>
          <el-tag>职位名称：</el-tag>
          <el-input :value="addPosInfo.pos_name" v-model="addPosInfo.pos_name" size="small"></el-input>
        </div>
      </div>
      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddPosDialog = false">取 消</el-button>
        <el-button type="primary" @click="addPos">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 职位列表
      posList: [],
      // 编辑对话框
      showEditDialog: false,
      // 当前职位的信息
      currentPosInfo: {
        pos_id: '',
        pos_name: '',
      },
      // 提示延时时间
      tool_tip_delay: 1000,
      // 添加职位的显示
      showAddPosDialog: false,
      // 要添加的职位
      addPosInfo: {
        pos_name: '',
      }
    }
  },
  created() {
    this.getPosInfo();
  },
  methods: {
    // 获取职位列表
    async getPosInfo() {
      const posInfo = await this.$api.getPosInfo();
      this.posList = posInfo.data;
    },
    // 显示编辑职位对话框
    handleShowEditDialog(data) {
      this.showEditDialog = true;
      this.currentPosInfo.pos_id = data.pos_id;
      this.currentPosInfo.pos_name = data.pos_name;
    },
    // 提交修改的信息
    async subEdit() {
      const res = await this.$api.updatePosInfo(this.currentPosInfo);
      if (res.code == '0') {
        this.$message.success(res.msg);
        this.showEditDialog = false;
        this.getPosInfo();
      } else {
        this.$message.error(res.msg);
      }
    },
    // 删除职位
    async delPos(id) {
      const res = await this.$api.delPosInfo({pos_id: id});
      if (res.code == '0') {
        this.$message.success(res.msg);
        this.getPosInfo();
      } else {
        this.$message.error(res.msg);
      }
    },
    // 添加职位
    async addPos() {
      const res = await this.$api.addPosInfo(this.addPosInfo);
      if (res.code == '0') {
        this.$message.success(res.msg);
        this.getPosInfo();
        this.showAddPosDialog = false;
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
</style>