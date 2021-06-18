<template>
    <div>
        <el-card>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{second_path}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{third_path}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: "BreadCrumb",
    data() {
      return {

      }
    },
    props: {
      second_path: {
        type: String,
        required: true,
      },
      third_path: {
        type: String,
        required: true,
      },
    }
  }
</script>

<style scoped lang="less">
    .el-breadcrumb {
        font-size: 14px;
        width: 100%;
    }
    .el-card {
        width: 100%;
        height: 50px;
    }
</style>
