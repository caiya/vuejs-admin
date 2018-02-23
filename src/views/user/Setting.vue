<template>
  <div class="form">
    <el-form :label-position="labelPosition" label-width="80px" :model="userInfo">
      <el-form-item label="名称">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="userInfo.age"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="userInfo.mobile"></el-input>
      </el-form-item>
      <el-form-item label="单位名称">
        <el-input v-model="userInfo.company"></el-input>
      </el-form-item>
      <el-form-item label="上次登录">
        <el-date-picker v-model="userInfo.lastSignInAt" type="datetime" placeholder="选择日期时间" style="display:block;"></el-date-picker>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload class="avatar-uploader" style="display:block;" action="/api/v1/tools/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUserInfo">保存设置</el-button>
        <el-button @click="back">返回上级</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserDetail, updateUserInfo } from "../../http/user";

export default {
  name: "UserSetting",
  mounted() {
    // 加载用户信息
    getUserDetail(this.$route.params.userId)
      .then(res => {
        console.log("用户详情", res);
        this.userInfo = res;
      })
      .catch(err => {
        console.log(err);
        this.$message({
          type: "warning",
          message: err.message
        });
      });
  },
  data() {
    return {
      labelPosition: "right",
      userInfo: {}
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.userInfo.avatar = "/" + res.url;
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    saveUserInfo() {
      updateUserInfo(this.userInfo)
        .then(res => {
          this.$router.back();
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.message);
        });
    }
  }
};
</script>

<style scoped>
.form {
  width: 50%;
  /* margin: 0 auto; */
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
