<template>
  <div class="loginPage">
    <div class="form">
      <el-row>
        <el-col :span="24">
          <el-form label="" :label-position="labelPosition" label-width="100px" :model="ruleForm" ref="ruleForm" :rules="rules">
            <el-form-item label="邮 箱" prop="email">
              <el-input v-model="ruleForm.email" type="text" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <el-form-item label="密 码" style="color: #fff;" prop="password">
              <el-input v-model="ruleForm.password" type="password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="submitForm('ruleForm')">登 录</el-button>
              <el-button type="info" @click="clearForm('ruleForm')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        email: "",
        password: ""
      },
      isPass: false,
      labelPosition: "right",
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["LOGIN"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/users/login", {
              email: this.ruleForm.email,
              password: this.ruleForm.password
            })
            .then(res => {
              if (res.status === 200) {
                // 登录成功
                this.LOGIN(res.data);
                this.$router.push("/main");
              } else {
                // 登陆失败
                this.$message.error(res.error);
              }
            })
            .catch(err => {
              this.$message.error(err.message);
            });
        }
      });
    },
    clearForm(formName) {
      this.$refs[formName].resetFields();
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
  margin-top: -100px;
}
.el-button {
  margin-top: 20px;
}
.el-form-item__label {
  color: #fff;
}
</style>

