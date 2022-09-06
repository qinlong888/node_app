<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title"> 在线后台管理系统 </span>
        <el-form
          ref="registerForm"
          :model="registerUser"
          :rules="rules"
          label-width="80px"
          class="registerForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="registerUser.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registerUser.password" type="password" />
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input v-model="registerUser.password2" type="password" />
          </el-form-item>
          <el-form-item label="选择身份">
            <el-select v-model="registerUser.identity" placeholder="请选择身份">
              <el-option label="管理员" value="manager" />
              <el-option label="员工" value="employee" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="submit_btn"
              @click="submitForm('registerForm')"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "register",
  components: {},
  created() {
    console.log("开始");
  },
  mounted() {
    console.log("渲染");
  },
  data() {
    var validatePassword2 = (rules, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: "",
      },
      rules: {
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 30,
            message: "长度6~30之间",
            trigger: "blur",
          },
        ],
        password2: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 30,
            message: "长度6~30之间",
            trigger: "blur",
          },
          {
            validator: validatePassword2,
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
          {
            min: 2,
            max: 30,
            message: "长度2~30之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      // console.log('refs:', this.$refs)
      // 通过$refs, 调用实例组件的方法验证表单
      this.$refs[formName].validate((valid) => {
        // 验证通过的结果为true
        if (valid) {
          this.$axios
            .post("/api/users/register", this.registerUser)
            .then((response) => {
              console.log("res", response);
              // 注册成功
              this.$message({
                message: "账号注册成功！",
                type: "success",
              });
            });
          this.$router.push("/login");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.register {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}

.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 30%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}

.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}

.submit_btn {
  width: 100%;
}

.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
</style>