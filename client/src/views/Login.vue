<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title"> 在线后台管理系统 </span>
        <el-form
          ref="loginForm"
          :model="loginUser"
          :rules="rules"
          label-width="80px"
          class="loginForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="loginUser.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginUser.password" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="submit_btn"
              @click="submitForm('loginForm')"
              >登录</el-button
            >
          </el-form-item>
          <div class="tiparea">
            <p>
              还没有账号？现在 <router-link to="/register">注册</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "login",
  components: {},
  created() {
    console.log("开始");
  },
  mounted() {
    console.log("渲染");
  },
  data() {
    return {
      loginUser: {
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
        email: [
          {
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 如果传入的参数为空，返回true
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
    submitForm(formName) {
      // console.log('refs:', this.$refs)
      // 通过$refs, 调用实例组件的方法验证表单
      this.$refs[formName].validate((valid) => {
        // 验证通过的结果为true
        if (valid) {
          this.$axios
            .post("/api/users/login", this.loginUser)
            .then((response) => {
              console.log("res", response);
              // 登录成功拿到token
              const { token } = response.data;
              localStorage.setItem("eleToken", token);

              // 解析token
              const decode = jwt_decode(token);
              //   console.log('decode:', decode)

              // TOKEN存储到Vuex中
              this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
              // 用户存储到Vuex中
              this.$store.dispatch("setUser", decode);

              this.$router.push("/index");
            });
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
.login {
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
  top: 20%;
  left: 34%;
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
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>