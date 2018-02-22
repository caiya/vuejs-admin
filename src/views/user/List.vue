<template>
  <div class="search">
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item label="用户名">
        <el-input v-model="formInline.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formInline.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="company" label="单位名称"></el-table-column>
      <el-table-column prop="mobile" label="电话号码"></el-table-column>
      <el-table-column prop="isAdmin" label="是否管理员" :formatter="formatIsAdmin"></el-table-column>
      <el-table-column prop="info" label="备注信息"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    return {
      formInline: {
        name: "",
        email: ""
      },
      tableData: []
    };
  },
  mounted() {
    this.axios
      .get("/users")
      .then(res => {
        console.log(res.data);
        this.tableData = res.data.rows
      })
      .catch(err => {
        this.$message.error(err.message);
      });
  },
  methods: {
    onSubmit() {},
    formatIsAdmin(row, column, cellValue) {
      return cellValue ? '是': '否'
    }
  }
};
</script>

<style scoped>
.search {
  width: 100%;
  height: 100%;
  text-align: left;
}
</style>

