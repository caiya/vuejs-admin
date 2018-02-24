<template>
  <div class="search">
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item label="设备类型名">
        <el-input v-model="formInline.name" placeholder="设备类型名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="addDevType">新增设备类型</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe style="width: 100%;" :highlight-current-row="true">
      <el-table-column prop="id" label="编号" sortable align="center"></el-table-column>
      <el-table-column prop="name" label="设备类型名称" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="(centerDialogVisible = true) && (currentDevType = scope.row)" type="text" size="small">
            <i class="iconfont icon-details"></i>查看</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">
            <i class="iconfont icon-delete"></i>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination layout="prev, pager, next, jumper, ->, sizes, total" :total="tableData.length" :background="true" @current-change="pageChange" @size-change="pageSizeChange" :current-page="currentPage" :page-size="pageSize" :page-sizes="[5, 10, 20, 50, 100]"></el-pagination>
    </div>
    <el-dialog title="设备类型详情" :visible.sync="centerDialogVisible" width="30%">
      <el-form :model="currentDevType">
        <el-form-item label="设备类型">
          <el-input v-model="currentDevType.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDevTypeList,
  deleteDevTypeById,
  addDevType,
  updateDevTypeInfo
} from "../../http/devType";
export default {
  name: "DevTypeList",
  data() {
    return {
      formInline: {
        name: "",
        email: ""
      },
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      centerDialogVisible: false,
      currentDevType: {}
    };
  },
  mounted() {
    getDevTypeList()
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
      getDevTypeList(query)
        .then(res => {
          this.tableData = res.rows;
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    handleDelete(row) {
      // 删除
      this.$confirm("此操作将永久删除该设备类型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteDevTypeById(row.id)
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
    addDevType() {
      // 添加设备类型
      this.clearForm();
      this.centerDialogVisible = true;
    },
    pageChange(currentPage) {
      console.log("当前页：", currentPage);
      this.currentPage = currentPage;
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
    },
    clearForm() {
      this.currentDevType = {};
    },
    updateLocalData() {
      this.tableData = this.tableData.map(item => {
        if (item.id === this.currentDevType.id) {
          return this.currentDevType;
        }
        return item;
      });
    },
    addLocalData(newData){
      this.tableData.push(newData);
    },
    save() {
      // 保存修改
      console.log(this.currentDevType);
      if (this.currentDevType.id) {
        // 修改
        updateDevTypeInfo(this.currentDevType)
          .then(res => {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.centerDialogVisible = false;
            this.updateLocalData();
            this.clearForm();
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      } else {
        // 新增
        const obj = this.currentDevType;
        delete obj.id;
        addDevType(obj)
          .then(res => {
            this.$message({
              type: "success",
              message: "新增成功!"
            });
            this.clearForm();
            this.centerDialogVisible = false;
            this.addLocalData(res)
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      }
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
