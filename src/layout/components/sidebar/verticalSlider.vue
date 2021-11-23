<script setup lang="ts">
import Logo from "./logo.vue";
import { emitter } from "/@/utils/mitt";
import SidebarItem from "./sidebarItem.vue";
import { algorithm } from "/@/utils/algorithm";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { useAppStoreHook } from "/@/store/modules/app";
import { usePermissionStoreHook } from "/@/store/modules/permission";

const route = useRoute();
const pureApp = useAppStoreHook();
const router = useRouter().options.routes;
const routeStore = usePermissionStoreHook();
const isCollapse = computed(() => {
  return !pureApp.getSidebarStatus;
});
const activeMenu = computed((): string => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    // @ts-ignore
    return meta.activeMenu;
  }
  return path;
});

const menuSelect = (indexPath: string): void => {
  let parentPath = "";
  let parentPathIndex = indexPath.lastIndexOf("/");
  if (parentPathIndex > 0) {
    parentPath = indexPath.slice(0, parentPathIndex);
  }
  // 找到当前路由的信息
  // eslint-disable-next-line no-inner-declarations
  function findCurrentRoute(routes) {
    return routes.map((item) => {
      if (item.path === indexPath) {
        // 切换左侧菜单 通知标签页
        emitter.emit("changLayoutRoute", {
          indexPath,
          parentPath,
        });
      } else {
        if (item.children) findCurrentRoute(item.children);
      }
    });
  }
  findCurrentRoute(algorithm.increaseIndexes(router));
};
</script>

<template>
  <div class="sidebar-container">
    <!-- <div class="logo">生活服务管理系统</div> -->
    <Logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        unique-opened
        router
        :collapse-transition="false"
        mode="vertical"
        class="outer-most"
        @select="menuSelect"
      >
        <sidebar-item
          v-for="route in routeStore.wholeRoutes"
          :key="route.path"
          :item="route"
          class="outer-most"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 18px;
  color: #fff;
}
</style>
