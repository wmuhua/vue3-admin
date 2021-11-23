<script setup lang="ts">
import { h, computed, Transition, defineComponent } from "vue";
import { RouterView } from "vue-router";

const transitions = computed(() => {
  return (route) => {
    return route.meta.transition;
  };
});

const transitionMain = defineComponent({
  render() {
    return h(
      Transition,
      {
        name:
          transitions.value(this.route) &&
          this.route.meta.transition.enterTransition
            ? "pure-classes-transition"
            : (transitions.value(this.route) &&
                this.route.meta.transition.name) ||
              "fade-transform",
        enterActiveClass:
          transitions.value(this.route) &&
          `animate__animated ${this.route.meta.transition.enterTransition}`,
        leaveActiveClass:
          transitions.value(this.route) &&
          `animate__animated ${this.route.meta.transition.leaveTransition}`,
        mode: "out-in",
        appear: true,
      },
      {
        default: () => [this.$slots.default()],
      }
    );
  },
  props: {
    route: {
      type: undefined,
      required: true,
    },
  },
});
</script>

<template>
  <section class="app-main">
    <router-view>
      <template #default="{ Component, route }">
        <el-scrollbar>
          <el-backtop title="回到顶部" target=".app-main .el-scrollbar__wrap">
          </el-backtop>
          <transitionMain :route="route">
            <component
              :is="Component"
              :key="route.fullPath"
              class="main-content"
            />
          </transitionMain>
        </el-scrollbar>
      </template>
    </router-view>
  </section>
</template>

<style scoped>
.app-main {
  width: 100%;
  height: 100vh;
  padding-top: 48px;
  position: relative;
  overflow-x: hidden;
}

.app-main-nofixed-header {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

.el-backtop {
  color: #fff;
  background-color: #409eff;
  box-shadow: 0 0 6px rgb(0 0 0 / 28%);
}
.el-backtop:hover {
  color: #fff;
  background-color: #66b1ff;
}

.main-content {
  padding: 20px;
}
</style>
