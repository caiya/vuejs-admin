<template>
    <div class="main">
        <el-container>
        <el-aside>Aside</el-aside>
        <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
            <el-footer>Footer</el-footer>
        </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  name: "Main"
};
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
}
.el-header,
.el-footer {
  position: fixed;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  width: 100%;
}

.el-header {
  top: 0;
}

.el-footer {
  bottom: 0;
  left: 240px;
}
.el-aside {
  position: fixed;
  top: 60px;
  bottom: 0;
  width: 240px;
  background-color: #d3dce6;
  color: #333;
  line-height: 500px;
}

.el-main {
  position: fixed;
  top: 60px;
  bottom: 60px;
  left: 240px;
  right: 0;
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 500px;
}

</style>

