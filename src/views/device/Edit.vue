<template>
  <div class="form">
    <el-form :label-position="labelPosition" label-width="100px" :model="device" :rules="rules" ref="device">
      <el-form-item label="设备名称" prop="name">
        <el-input v-model="device.name"></el-input>
      </el-form-item>
      <el-form-item label="设备编号" prop="code">
        <el-input v-model.number="device.code"></el-input>
      </el-form-item>
      <el-form-item label="设备激活码" prop="key">
        <el-input v-model="device.key"></el-input>
      </el-form-item>
      <el-form-item label="公网地址" prop="pubNetAddr">
        <el-input v-model="device.pubNetAddr"></el-input>
      </el-form-item>
      <el-form-item label="设备类别" prop="type" style="text-align:left;">
        <el-select v-model="device.type" placeholder="请选择">
          <el-option v-for="item in devTypes" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备型号" prop="model">
        <el-input v-model="device.model"></el-input>
      </el-form-item>
      <el-form-item label="设备状态" style="text-align:left;" prop="status">
        <el-radio-group v-model="device.status">
          <el-radio label="online">正常</el-radio>
          <el-radio label="offline">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出厂日期" style="text-align:left;" prop="prodDate">
        <el-date-picker v-model="device.prodDate" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="设备说明" prop="desc">
        <el-input type="textarea" :rows="4" placeholder="请输入描述内容" v-model="device.desc">
        </el-input>
      </el-form-item>
      <el-form-item label="头像" style="text-align:left;" prop="avatar">
        <el-upload class="avatar-uploader" action="/api/v1/tools/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="device.avatar" :src="device.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item style="text-align:left;">
        <el-button type="primary" @click="saveUserInfo('device')">保存设置</el-button>
        <el-button @click="back">返回上级</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserDetail, updateUserInfo, addUser } from "../../http/user";
import { mapState } from "vuex";
export default {
  name: "DeviceEdit",
  mounted() {
    // 加载用户信息
    if (this.$route.params.devId === "add") return;
    // 这里使用this.user获取不到数据，因为mounted先执行
    getUserDetail(this.$route.params.devId || this.$store.state.user.device.id)
      .then(res => {
        console.log("用户详情", res);
        this.device = res;
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
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (value < 10) {
          callback(new Error("必须年满10岁"));
        } else {
          callback();
        }
      }
    };
    return {
      devTypes: [],
      labelPosition: "right",
      device: {
        status: "offline",
        avatar: "" // 如果没有改属性，那么新增页下的头像始终不会显示，因为v-if检测不到空对象中的某个属性
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur,change"
          }
        ],
        age: [
          {
            validator: checkAge,
            trigger: "blur,change"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur,change" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur,change"
          }
        ],
        mobile: [
          {
            required: true,
            message: "联系方式不能为空",
            trigger: "blur,change"
          }
        ]
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
      this.device.avatar = "/" + res.url;
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
    saveUserInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.device.id) {
            // 修改保存
            updateUserInfo(this.device)
              .then(res => {
                this.$router.back();
              })
              .catch(err => {
                console.log(err);
                this.$message.error(err.message);
              });
          } else {
            // 新增保存
            addUser(this.device)
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
