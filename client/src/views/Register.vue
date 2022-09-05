<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title"> 在线后台管理系统 </span>
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
};
</script>

<style scoped>
.register {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpeg) no-repeat center center;
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
</style>