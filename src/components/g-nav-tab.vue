<template>
  <div class="g-nav-bar">
    <g-better-scroll ref="scroll" :data="slider" :scrollX="true" :scrollY="false">
      <ul ref="slider"
          class="nav-bar-list">
        <li ref="name"
            v-for="(item,index) in slider"
            :key="item.id"
            :class="{'active':active_index === index}"
            @click='selectItem(item,index)'>
          {{item.name}}
        </li>
      </ul>
    </g-better-scroll>
  </div>

</template>

<script>
  export default {
    name: "g-nav-tab",
    data() {
      return {
        active_index: 0
      };
    },
    props: {
      slider: {
        type: Array,
        default: {}
      }
    },
    methods:{
      selectItem(item,index){
        this.active_index = index;
        this.$refs.scroll.scrollToElement(this.$refs.name[index - 2], 500);
        this.$emit("changeEvent",this.slider[index]);
      }
    }

  }
</script>

<style scoped>

</style>
