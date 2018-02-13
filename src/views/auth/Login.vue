<template>
  <div class="loginPage">
    <div class="form">
      <el-row>
        <el-col :span="24">
          <el-form label="user" :label-position="labelPosition" label-width="100px">
            <el-form-item label="用户名">
              <el-input v-model="username" type="text" id="user"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="password" type="password" id="pass"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="submitForm()">登录</el-button>
              <el-button type="info" @click="clearForm()">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      isPass: false,
      labelPosition: 'right'
    };
  },
  methods: {
    inputBlur() {
      if (!this.username.trim() || !this.password.trim()) {
        this.isPass = false;
        return this.$message({
          message: "用户名或密码不能为空",
          type: "warning"
        });
      }
      this.isPass = true;
    },
    submitForm() {
      this.inputBlur();
      if (!this.isPass) return;
      this.$router.push("/main");
    },
    clearForm() {
      this.username = "";
      this.password = "";
      this.isPass = false;
    }
  }
};
</script>

<style scoped>
.loginPage {
  width: 100%;
  height: 100%;
  background-image: url(http://img2.imgtn.bdimg.com/it/u=3326912452,3636229800&fm=214&gp=0.jpg);
  background-size: auto; 
}
.form{
  position: absolute;
  width: 450px;
  height: 350px;
  top: 50%;
  left: 50%;
  margin-left: -225px;
  margin-top: -175px;
}
.el-button{
  margin-top: 20px;
}
</style>

