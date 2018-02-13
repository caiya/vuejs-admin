<template>
  <el-row type="flex" class="row-bg" justify="space-between">
    <el-col :span="6">
      <div class="grid-content"></div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content"></div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    console.log("首次加载了");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
.grid-content {
  border-radius: 4px;
  min-height: 75px;
}
.bg-purple {
  background: coral;
}
</style>
