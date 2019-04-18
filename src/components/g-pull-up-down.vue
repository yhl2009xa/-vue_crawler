<template>
    <g-better-scroll class="pull-up-down-wrapper">
      <div class="scroll-content">
        <!-- 列表 -->
        <div class="list-content">
          <slot></slot>
        </div>
      </div>
    </g-better-scroll>
</template>

<script>
    export default {
        name: "g-pull-up-down"
    }
</script>

<style scoped>

</style>
