<template>
  <div id="app">
    <router-view>

    </router-view>

    <!-- 菜单栏 -->
    <g-menu v-if="$route.meta.menu"></g-menu>

  </div>
</template>
<script>
export default {
  name: 'App',
    mounted() {
        // 解决button active失效问题
        document.addEventListener("touchstart", () => {
        }, true);
    },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
