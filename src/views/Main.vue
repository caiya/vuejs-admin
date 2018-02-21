<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);height:100%;">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>系统设置</template>
            <el-menu-item index="1-1" route="/main/user">用户管理</el-menu-item>
            <el-menu-item index="1-2">资料设置</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>文章管理</template>
            <el-menu-item index="1-1">新增文章</el-menu-item>
            <el-menu-item index="1-2">文章列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-container>
          <el-header style="height:10px;" class="navBar">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>欢迎页</el-breadcrumb-item>
            </el-breadcrumb>
          </el-header>
          <el-main>
            这里是主页内容
            <router-view />
          </el-main>
        </el-container>
      </el-main>
    </el-container>
    <el-container>
      <el-main>
        © Copyright: 2018-2022 <a href="http://www.cnblogs.com/vipzhou" target="_blank">西安-晁州.</a>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.navBar{
  background-color: #fff;
}
</style>

<script>
export default {
  name: "Main",
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(10).fill(item)
    };
  },
  methods: {
    selectOne(row, column, cell, event) {
      console.log(row.name);
    }
  }
};
</script>