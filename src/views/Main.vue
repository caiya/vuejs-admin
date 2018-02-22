<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown @command="clickItem">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">用户信息</el-dropdown-item>
          <el-dropdown-item command="1">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{userInfo.name}}</span>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);height:100%;">
        <el-menu :default-openeds="['1']" :router="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>系统设置</template>
            <el-menu-item index="1-1" route="/main/user">用户管理</el-menu-item>
            <el-menu-item index="1-2" route="/main/user/setting">资料设置</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>文章管理</template>
            <el-menu-item index="2-2" route="/main/article">文章列表</el-menu-item>
            <el-menu-item index="2-1" route="/main/article/add">新增文章</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-mobile-phone"></i>设备管理</template>
            <el-menu-item index="3-2" route="/main/device">设备列表</el-menu-item>
            <el-menu-item index="3-1" route="/main/device/add">新增设备</el-menu-item>
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
            <router-view />
          </el-main>
        </el-container>
      </el-main>
    </el-container>
    <el-container>
      <el-main class="intro">
        © copyright: 2017-2018
        <a href="http://www.cnblogs.com/vipzhou" target="_blank">西安-晁州</a>
      </el-main>
    </el-container>
    <el-dialog title="关于我" :visible.sync="centerDialogVisible" width="30%">
      <el-form :model="userInfo">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.name" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Main",
  data() {
    return {
      userInfo: {},
      centerDialogVisible: false
    };
  },
  methods: {
    ...mapMutations(['LOGOUT']),
    selectOne(row, column, cell, event) {
      // console.log(row.name)
    },
    clickItem(command) {
      command = parseInt(command);
      switch (command) {
        case 0:     // 关于我
          this.centerDialogVisible = true;
          break;
        case 1:     // 退出登录
          this.LOGOUT()
          this.$router.push('/')
          break;
      }
    }
  },
  computed: {
    ...mapState(["user"])
  },
  mounted() {
    this.userInfo = this.user.userInfo;
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.navBar {
  background-color: #fff;
}
.intro {
  position: fixed;
  bottom: 0px;
  text-align: center;
  width: 100%;
}
</style>