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
    </el-form>
  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    return {
      formInline: {
        name: '',
        email: ''
      }
    };
  }
};
</script>

<style scoped>
.search {
  width: 100%;
  height: 100%;
  text-align: left;
}
</style>

