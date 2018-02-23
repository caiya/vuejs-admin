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
      <el-form-item>
        <el-button type="info" @click="$router.push('/main/user/setting/add')">新增用户</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe style="width: 100%" :highlight-current-row="true">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="status" label="状态" :formatter="formatStatus"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="company" label="单位名称"></el-table-column>
      <el-table-column prop="mobile" label="电话号码"></el-table-column>
      <el-table-column prop="isAdmin" label="是否管理员" :formatter="formatIsAdmin"></el-table-column>
      <el-table-column prop="info" label="备注信息"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleDetail(scope.row)" type="text" size="small">
            <i class="iconfont icon-details"></i>查看</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">
            <i class="iconfont icon-delete"></i>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination layout="prev, pager, next, jumper, ->, sizes, total" :total="tableData.length" :background="true" @current-change="pageChange" @size-change="pageSizeChange" :current-page="currentPage" :page-size="pageSize" :page-sizes="[5, 10, 20, 50, 100]"></el-pagination>
    </div>
  </div>
</template>

<script>
import { getUserList, deleteUserById } from "../../http/user";
export default {
  name: "UserList",
  data() {
    return {
      formInline: {
        name: "",
        email: ""
      },
      tableData: [],
      currentPage: 1,
      pageSize: 5
    };
  },
  mounted() {
    getUserList()
      .then(res => {
        this.tableData = res.rows;
      })
      .catch(err => {
        this.$message.error(err.message);
      });
  },
  methods: {
    onSubmit() {
      const keys = Object.keys(this.formInline);
      const query = {};
      keys.forEach(key => {
        this.formInline[key] &&
          (query[key] = (this.formInline[key] + "").trim());
      });
      getUserList(query)
        .then(res => {
          this.tableData = res.rows;
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    formatIsAdmin(row, column, cellValue) {
      return cellValue ? "是" : "否";
    },
    formatStatus(row, column, cellValue) {
      return cellValue === "ok" ? "正常" : "已禁用";
    },
    handleDetail(row) {
      // 查看详情
      this.$router.push(`/main/user/setting/${row.id}`);
    }, // 删除
    handleDelete(row) {
      console.log("row:", row);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUserById(row.id)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.tableData = this.tableData.filter(
                item => item.id !== row.id
              );
            })
            .catch(err => {
              this.$message.error(err.message);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    addUser() {
      // 添加用户
      this.$router.push("/main/user/setting");
    },
    pageChange(currentPage) {
      console.log("当前页：", currentPage);
      this.currentPage = currentPage;
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
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
.page {
  text-align: center;
  margin-top: 20px;
}
</style>

