<template>
  <div class="router-view">
    <!-- 这里的内容将会被缓存 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

    <!-- 这里的内容将不会被缓存 -->
    　
    <router-view v-if="!$route.meta.keepAlive"></router-view>


    <!--路由动画-->
    <!--<keep-alive>-->
    <!--<transition :name="animateType" >-->
    <!--　　　　　	<router-view v-if="$route.meta.keepAlive"></router-view>-->
    <!--</transition>-->

    <!--</keep-alive>-->

    <!--&lt;!&ndash; 这里的内容将不会被缓存 &ndash;&gt;-->
    <!--<transition :name="animateType" >-->
    <!--　　　　　		<router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <!--</transition>-->


  </div>
</template>

<script>
  export default {
    data() {
      return {
        animateType: 'animate-bounce'
      }
    }

  }
</script>


