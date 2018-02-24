<template>
  <div class="search">
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item label="设备参数名">
        <el-input v-model="formInline.name" placeholder="参数名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="addDevArg">新增设备参数</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe style="width: 100%;" :highlight-current-row="true">
      <el-table-column prop="id" label="编号" sortable align="center"></el-table-column>
      <el-table-column prop="name" label="设备参数名称" align="center"></el-table-column>
      <el-table-column prop="desc" label="设备参数描述" align="center"></el-table-column>
      <el-table-column prop="device.name" label="所属设备" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="(centerDialogVisible = true) && (currentDevArg = scope.row)" type="text" size="small">
            <i class="iconfont icon-details"></i>查看</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">
            <i class="iconfont icon-delete"></i>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination layout="prev, pager, next, jumper, ->, sizes, total" :total="tableData.length" :background="true" @current-change="pageChange" @size-change="pageSizeChange" :current-page="currentPage" :page-size="pageSize" :page-sizes="[5, 10, 20, 50, 100]"></el-pagination>
    </div>
    <el-dialog title="设备参数详情" :visible.sync="centerDialogVisible" width="30%">
      <el-form :model="currentDevArg" :rules="rules" ref="currentDevArg">
        <el-form-item label="设备参数" prop="name">
          <el-input v-model="currentDevArg.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数描述" prop="desc">
          <el-input v-model="currentDevArg.desc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属设备" >
          <el-select v-model="currentDevArg.device.id" placeholder="请选择" filterable style="display:block;">
            <el-option v-for="item in devices" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
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
  getDevArgList,
  deleteDevArgById,
  addDevArg,
  updateDevArgInfo
} from "../../http/devArg";
import { getDeviceList } from "../../http/device";
export default {
  name: "DevArgList",
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
      currentDevArg: {
        device: {
          name: "",
          id: ""
        }
      },
      devices: [],
      rules: {
        name: [
          {
            required: true,
            message: "参数名称不能为空",
            trigger: "blur, change"
          }
        ],
        desc: [
          {
            required: true,
            message: "参数描述不能为空",
            trigger: "blur, change"
          }
        ]
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getDevArgList()
        .then(res => {
          this.tableData = res.rows;
          const devSet = new Set();
          getDeviceList({})
            .then(res => {
              this.devices = res.rows;
            })
            .catch(err => {
              this.$message.error(err.message);
            });
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    onSubmit() {
      const keys = Object.keys(this.formInline);
      const query = {};
      keys.forEach(key => {
        this.formInline[key] &&
          (query[key] = (this.formInline[key] + "").trim());
      });
      getDevArgList(query)
        .then(res => {
          this.tableData = res.rows;
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    handleDelete(row) {
      // 删除
      this.$confirm("此操作将永久删除该设备参数, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteDevArgById(row.id)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.fetchData();
            })
            .catch(err => {
              this.$message.error(err.message);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    addDevArg() {
      // 添加设备参数
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
      this.currentDevArg = {
        device: {
          id: "",
          name: ""
        }
      };
    },
    addLocalData(newData) {
      this.tableData.push(newData);
    },
    save() {
      this.$refs["currentDevArg"].validate(valid => {
        if (valid) {
          // 保存修改
          if (this.currentDevArg.id) {
            // 修改
            this.currentDevArg.deviceId = this.currentDevArg.device.id;
            updateDevArgInfo(this.currentDevArg)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });
                this.centerDialogVisible = false;
                this.clearForm();
                this.fetchData();
              })
              .catch(err => {
                this.$message.error(err.message);
              });
          } else {
            // 新增
            this.currentDevArg.deviceId = this.currentDevArg.device.id;
            delete this.currentDevArg.device;
            delete this.currentDevArg.id;
            addDevArg(this.currentDevArg)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "新增成功!"
                });
                this.clearForm();
                this.centerDialogVisible = false;
                this.fetchData();
              })
              .catch(err => {
                this.$message.error(err.message);
              });
          }
        }
      });
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
