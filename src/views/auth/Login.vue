<template>
    <div class="loginPage">
        <el-row>
            <el-col :span="24">
                <el-form label="user">
                    <el-form-item label="用户名">
                        <el-input v-model="username" type="text" id="user" @blur="inputBlur()"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="password" type="password" id="pass" @blur="inputBlur()"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                    <el-button type="info" @click="clearForm()">重置</el-button>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      isPass: false
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
html,
body {
  margin: 0;
  padding: 0;
}
.loginPage {
  margin-top: 100px;
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-pack: center;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-pack: center;
  display: -o-box;
  -o-box-orient: horizontal;
  -o-box-pack: center;
  display: -ms-box;
  -ms-box-orient: horizontal;
  -ms-box-pack: center;
  display: box;
  min-height: 300px;
}
.el-form {
  width: 350px;
  min-height: 300px;
}
.el-form-item {
  margin-bottom: 0%;
}
.el-button {
  margin-top: 20px;
}
</style>

