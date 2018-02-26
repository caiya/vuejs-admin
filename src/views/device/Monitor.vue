<template>
  <div class="monitor">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-container>
            <el-header>
              <el-container>
                <el-aside width="50%">Aside</el-aside>
                <el-main>Main</el-main>
              </el-container>
            </el-header>
            <el-main>Main</el-main>
          </el-container>
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
        pic: ""
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
}
</style>
