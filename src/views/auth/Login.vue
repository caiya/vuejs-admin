<template>
  <div class="loginPage">
    <div class="form">
      <el-row>
        <el-col :span="24">
          <el-form label="email" :label-position="labelPosition" label-width="100px">
            <el-form-item label="邮 箱">
              <el-input v-model="email" type="text" id="email"></el-input>
            </el-form-item>
            <el-form-item label="密 码" style="color: #fff;">
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
import {mapMutations} from 'vuex'
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      isPass: false,
      labelPosition: 'right'
    };
  },
  methods: {
    ...mapMutations(['LOGIN']),
    inputBlur() {
      if (!this.email.trim() || !this.password.trim()) {
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
      this.axios.post(
        '/users/login', {
          email: this.email,
          password: this.password
        }).then(res => {
          if (res.status === 200) {       // 登录成功
            this.LOGIN(res.data)
            this.$router.push("/main")
          } else {    // 登陆失败
            this.$message.error(res.error)
          }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    clearForm() {
      this.email = "";
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
  background-image: url("../../assets/bg_login.jpg");
  background-size: auto;
}
.form {
  position: absolute;
  width: 450px;
  height: 350px;
  top: 50%;
  left: 50%;
  margin-left: -225px;
  margin-top: -175px;
}
.el-button {
  margin-top: 20px;
}
.el-form-item__label {
  color: #fff;
}
</style>

