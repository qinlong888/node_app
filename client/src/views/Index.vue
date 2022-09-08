<template>
  <div>
    <div class="index">
      <head-nav></head-nav>
      <router-view></router-view>
      <!-- <div class="rightContainer">
      <router-view></router-view>
    </div> -->
    </div>
  </div>
</template>

<script>
import HeadNav from "../components/HeadNav.vue";

export default {
  name: "index",
  components: {
    HeadNav,
  },
  created() {
    // let index = document.querySelectorAll(".index")
    // console.log(index.current);
  },
};
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>