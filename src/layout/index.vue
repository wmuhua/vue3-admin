<script setup lang="ts">
import {
  h,
  ref,
  reactive,
  watchEffect,
  onMounted,
  computed,
  onBeforeMount,
  defineComponent,
  getCurrentInstance,
} from "vue";
import { setType } from "./types";
import { emitter } from "/@/utils/mitt";
import { useEventListener } from "@vueuse/core";
import { useAppStoreHook } from "/@/store/modules/app";

import navbar from "./components/navbar.vue";
import appMain from "./components/appMain.vue";
import verticalSlider from "./components/sidebar/verticalSlider.vue";

const instance = getCurrentInstance().appContext.app.config.globalProperties;
const hiddenSideBar = ref(instance.$config?.HiddenSideBar);
const set: setType = reactive({
  sidebar: computed(() => {
    return useAppStoreHook().sidebar;
  }),

  device: computed(() => {
    return useAppStoreHook().device;
  }),

  classes: computed(() => {
    return {
      hideSidebar: !set.sidebar.opened,
      openSidebar: set.sidebar.opened,
      withoutAnimation: set.sidebar.withoutAnimation,
      mobile: set.device === "mobile",
    };
  }),

  hideTabs: computed(() => {
    return instance.$storage?.sets.hideTabs;
  }),
});

const handleClickOutside = (params: boolean) => {
  useAppStoreHook().closeSideBar({ withoutAnimation: params });
};

function setTheme(layoutModel: string) {
  window.document.body.setAttribute("layout", layoutModel);
  instance.$storage.layout = {
    layout: `${layoutModel}`,
    theme: instance.$storage.layout?.theme,
  };
}

// 监听容器
emitter.on("resize", ({ detail }) => {
  let { width } = detail;
  width <= 670 ? setTheme("vertical") : setTheme(useAppStoreHook().layout);
});

watchEffect(() => {
  if (set.device === "mobile" && !set.sidebar.opened) {
    handleClickOutside(false);
  }
});

const $_isMobile = () => {
  const rect = document.body.getBoundingClientRect();
  return rect.width - 1 < 992;
};

const $_resizeHandler = () => {
  if (!document.hidden) {
    const isMobile = $_isMobile();
    useAppStoreHook().toggleDevice(isMobile ? "mobile" : "desktop");
    if (isMobile) {
      handleClickOutside(true);
    }
  }
};

onMounted(() => {
  const isMobile = $_isMobile();
  if (isMobile) {
    useAppStoreHook().toggleDevice("mobile");
    handleClickOutside(true);
  }
});

onBeforeMount(() => {
  useEventListener("resize", $_resizeHandler);
});

const layoutHeader = defineComponent({
  render() {
    return h(
      "div",
      { class: "fixed-header" },
      { default: () => [!hiddenSideBar.value && h(navbar)] }
    );
  },
});
</script>

<template>
  <div :class="['app-wrapper', set.classes]">
    <div
      v-show="set.device === 'mobile' && set.sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside(false)"
    />
    <vertical-slider v-show="!hiddenSideBar" />
    <div :class="['main-container', hiddenSideBar ? 'main-hidden' : '']">
      <div>
        <layout-header />
        <app-main />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin clearfix {
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}

.app-wrapper {
  @include clearfix;

  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.main-hidden {
  margin-left: 0 !important;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.re-screen {
  margin-top: 12px;
}
</style>
