<template>
    <div class="loginPage">
        <!-- <h1>登录</h1> -->
        <el-form label="user">
            <el-form-item label="用户名">
                <el-input v-model="form.username" type="text" id="user" @blur="inputBlur('user', form.username)"></el-input>
                <p>{{form.userError}}</p>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" type="password" id="pass" @blur="inputBlur('pass', form.password)"></el-input>
                <p>{{form.passError}}</p>
            </el-form-item>
            <el-button type="primary" @click="submitForm()">登录</el-button>
            <el-button type="info" @click="clearForm()">重置</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      form: {
        username: "",
        password: "",
        userError: "",
        passError: ""
      }
    };
  },
  methods: {
    inputBlur() {
      console.log("blur");
    },
    submitForm() {
      console.log("当前提交：", this.form.username, this.form.password);
    },
    clearForm() {
      this.form = {
        username: "",
        password: "",
        userError: "",
        passError: ""
      };
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
  box-orient: horizontal;
  box-pack: center;
  min-height: 300px;
}
.el-form {
  width: 350px;
  min-height: 300px;
}
.el-form-item {
  margin-bottom: 0%;
}
</style>

