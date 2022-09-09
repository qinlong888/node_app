<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        mode="vertical"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
        class="el-menu-vertical-demo"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <el-icon><MessageBox /></el-icon>
            <span>首页</span>
          </el-menu-item>
        </router-link>

        <el-sub-menu index="1">
          <template #title>
            <el-icon><Operation /></el-icon>
            <span>资金管理</span>
          </template>
          <router-link to="/manage">
            <el-menu-item index="1-1">资金流水</el-menu-item>
          </router-link>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><setting /></el-icon>
            <span>信息管理</span>
          </template>
          <router-link to="/infoshow">
            <el-menu-item index="2-1">个人信息</el-menu-item>
          </router-link>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "leftmenu",
  data() {
    return {};
  },
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-sub-menu .el-menu-item {
  min-width: 180px;
}
.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>