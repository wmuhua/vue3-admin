<script setup lang="ts">
const props = defineProps({
  collapse: Boolean,
});
</script>

<template>
  <div class="sidebar-logo-container" :class="{ collapse: props.collapse }">
    <transition name="sidebarLogoFade">
      <router-link key="expand" class="sidebar-logo-link" to="/">
        <!-- <img
          class="slidebar-logo"
          src="http://qwr-bbc-dev.uuuqwr.cn/h5/static/logo.png"
        /> -->
        <span class="sidebar-title">生活服务管理</span>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 48px;
  text-align: center;
  overflow: hidden;

  .sidebar-logo-link {
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 5px;

    .slidebar-logo {
      position: relative;
      left: -3px;
      margin-right: 10px;
      height: 38px;
    }

    .sidebar-title {
      color: #fff;
      font-weight: 600;
      font-size: 20px;
      line-height: 38px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    }
  }

  .collapse {
    .sidebar-logo {
      margin-right: 0;
    }
  }
}
</style>
