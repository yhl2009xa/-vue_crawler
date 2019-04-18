<template>
  <div class="g-scroll" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "better-scroll",
    props:{
      scrollY:{
        type:Boolean,
        default:true
      },
      click: {
        type:Boolean,
        default:true
      }
    },
    data() {
      return {

      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initScroll();
      });
    },
    methods: {
      initScroll(){
        let Scroll = new BScroll(this.$refs.wrapper,{
          scrollY:this.scrollY,
          click:this.click,
        })
      }
    }
  }
</script>

<style scoped>

</style>
