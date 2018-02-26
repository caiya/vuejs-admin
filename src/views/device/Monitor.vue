<template>
  <div class="monitor">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          设备参数列表
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <img :src="device.pic" alt="设备原理图">
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">测量点实时监控</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">测量点俯视图</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DevMonitor",
  data() {
    return {
      device: {
        pic:
          ""
      }
    };
  }
};
</script>

<style scoped>
.monitor {
  width: 100%;
  height: 100%;
}
.el-row {
  margin-bottom: 20px;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  min-height: 300px;
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-pack: center;
  -webkit-box-align: center;

  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-pack: center;
  -moz-box-align: center;

  display: -o-box;
  -o-box-orient: horizontal;
  -o-box-pack: center;
  -o-box-align: center;

  display: -ms-box;
  -ms-box-orient: horizontal;
  -ms-box-pack: center;
  -ms-box-align: center;

  display: box;
  box-orient: horizontal;
  box-pack: center;
  box-align: center;
}
</style>
