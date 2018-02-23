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
      <el-form-item label="上次登录" style="text-align:left;">
        <el-date-picker v-model="userInfo.lastSignInAt" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="当前状态" style="text-align:left;">
        <el-radio-group v-model="userInfo.status" >
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个人说明">
        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="userInfo.info">
        </el-input>
      </el-form-item>
      <el-form-item label="头像" style="text-align:left;">
        <el-upload class="avatar-uploader" action="/api/v1/tools/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item style="text-align:left;">
        <el-button type="primary" @click="saveUserInfo">保存设置</el-button>
        <el-button @click="back">返回上级</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserDetail, updateUserInfo, addUser } from "../../http/user";
import { mapState } from "vuex";
export default {
  name: "UserSetting",
  mounted() {
    // 加载用户信息
    if (this.$route.params.userId === "add") return;
    // 这里使用this.user获取不到数据，因为mounted先执行
    getUserDetail(
      this.$route.params.userId || this.$store.state.user.userInfo.id
    )
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
      userInfo: {
        status: 1,
        avatar: "" // 如果没有改属性，那么新增页下的头像始终不会显示，因为v-if检测不到空对象中的某个属性
      }
    };
  },
  computed: {
    ...mapState["user"]
  },
  methods: {
    back() {
      this.$router.back();
    },
    handleAvatarSuccess(res, file) {
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
      if (this.userInfo.id) {
        console.log("修改操作");
        // 修改保存
        updateUserInfo(this.userInfo)
          .then(res => {
            this.$router.back();
          })
          .catch(err => {
            console.log(err);
            this.$message.error(err.message);
          });
      } else {
        // 新增保存
        console.log("新增操作");
        addUser(this.userInfo)
          .then(res => {
            this.$message({
              type: "success",
              message: "新增成功!"
            });
            this.$router.back();
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      }
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
