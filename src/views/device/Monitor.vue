<template>
  <div class="monitor">
    <el-row type="flex" justify="space-around" class="mrgB-20">
      <el-col :span="11">
        <div class="grid-content bg-purple-light ali-center">
          <el-row type="flex" style="justify-content:center; align-items: flex-start;">
            <el-col :span="24">
              <el-form :inline="true" :model="device" class="demo-form-inline">
                <el-form-item label="设备">
                  <el-select v-model="device.id" placeholder="请选择设备" filterable @change="dispArgs">
                    <el-option v-for="item in devices" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="参数">
                  <el-input v-model="device.argName" placeholder="请输入参数名称"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="devArgs.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe style="width: 100%" :highlight-current-row="true" @row-click="rowClick">
              <el-table-column prop="id" label="参数编号" width="180" align="center"></el-table-column>
              <el-table-column prop="name" label="参数名称" width="180" align="center"></el-table-column>
              <el-table-column prop="desc" label="参数描述" align="center"></el-table-column>
            </el-table>
            <el-pagination class="mrgT-20" v-show="devArgs.length > 5" layout="prev, pager, next, jumper, ->, total" :total="devArgs.length" :background="true" @current-change="pageChange" @size-change="pageSizeChange" :current-page="currentPage" :page-size="pageSize"></el-pagination>
          </el-row>
        </div>
      </el-col>
      <el-col :span="11">
        <el-row type="flex" class="grid-content bg-purple-light" style="justify-content:center; align-items: center;">
          <img :src="currentDevPic" :alt="device.id ? '该设备尚未添加原理图' : '请先选择设备'">
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="11">
        <el-row type="flex" class="grid-content bg-purple-light" style="justify-content:center; align-items: center;">
          <chart :options="monitorArgs"></chart>
        </el-row>
      </el-col>
      <el-col :span="11">
        <el-row type="flex" class="grid-content bg-purple-light" style="justify-content:center; align-items: center;">
          
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDeviceList } from "../../http/device";
import { getDevArgList } from "../../http/devArg";
export default {
  name: "DevMonitor",
  data() {
    function randomData() {
      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
          Math.round(value)
        ]
      };
    }

    var data = [];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 1000; i++) {
      data.push(randomData());
    }
    return {
      devices: [], // 下拉框所有设备
      device: {
        id: "", // 当前选中的设备id
        argName: "", // 搜索框中的设备参数名称
        argId: "", // 当前选中的参数id
        pic: "" // 当前选中设备的pic原理图
      },
      devArgs: [], // table中的所有设备参数
      currentPage: 1, // table分页
      pageSize: 5, // table分页
      monitorArgs: {
        title: {
          text: "测量点实时数据展示"
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            params = params[0];
            var date = new Date(params.name);
            return (
              date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear() +
              " : " +
              params.value[1]
            );
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "模拟数据",
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            data: data
          }
        ]
      }
    };
  },
  computed: {
    currentDevPic() {
      const dev = this.devices.find(item => item.id === this.device.id);
      if (dev) return dev.pic;
      return "";
    }
  },
  methods: {
    fetchDevList() {
      getDeviceList({})
        .then(res => {
          this.devices = res.rows;
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    getchArgByDevId(id) {
      getDevArgList({ deviceId: id })
        .then(argRes => {
          this.devArgs = argRes.rows;
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    dispArgs(val) {
      this.getchArgByDevId(val);
    },
    pageChange(currentPage) {
      this.currentPage = currentPage;
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
    },
    search() {
      if (this.device.argName.trim()) {
        this.devArgs = this.devArgs.filter(
          item => this.device.argName.trim() === item.name
        );
      } else {
        this.getchArgByDevId(this.device.id);
      }
    },
    rowClick(row, event, column) {
      this.device.argId = row.id;
      console.log(this.device);
    }
  },
  mounted() {
    this.fetchDevList();
  }
};
</script>

<style scoped>
.monitor {
  width: 100%;
  height: 100%;
  margin-top: 5px;
}
.mrgB-20 {
  margin-bottom: 20px;
}
.mrgT-20{
  margin-top: 20px;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  height: 420px;
}
.ali-left {
  text-align: left;
}
.ali-center{
  text-align: center;
}
img {
  max-width: 100%;
  max-height: 100%;
}
.el-form-item {
  margin: 10px;
}
.current-row {
  background-color: aqua;
}
.echarts{
  margin: 0 auto;
}
</style>
