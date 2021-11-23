<script setup lang="ts">
import Hamburger from "./sidebar/hamBurger.vue";
import { useRouter } from "vue-router";
import { storageSession } from "/@/utils/storage";
import Breadcrumb from "./sidebar/breadCrumb.vue";
import { useAppStoreHook } from "/@/store/modules/app";

const pureApp = useAppStoreHook();
const router = useRouter();
let usename = storageSession.getItem("info")?.username;

// 退出登录
const logout = (): void => {
  storageSession.removeItem("info");
  router.push("/login");
};

function toggleSideBar() {
  pureApp.toggleSideBar();
}
</script>

<template>
  <div class="navbar">
    <Hamburger
      :is-active="pureApp.sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <Breadcrumb class="breadcrumb-container" />

    <div class="vertical-header-right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img src="http://qwr-bbc-dev.uuuqwr.cn/h5/static/logo.png" />
          <p class="username">{{ usename }}</p>
          <el-icon><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="logout">
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 48px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 48px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .vertical-header-right {
    display: flex;
    min-width: 280px;
    height: 48px;
    align-items: center;
    color: #000000d9;
    justify-content: flex-end;
    .username {
      margin: 0 5px 0 10px;
    }

    .el-dropdown-link {
      width: 100px;
      height: 48px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      color: #000000d9;

      &:hover {
        background: #f6f6f6;
      }

      p {
        font-size: 14px;
      }

      img {
        width: 22px;
        height: 22px;
        border-radius: 50%;
      }
    }
  }

  .breadcrumb-container {
    float: left;
  }
}

.logout {
  .el-dropdown-menu__item {
    padding: 0 18px !important;
  }
  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    color: #606266;
    background: #f0f0f0;
  }
}
</style>
