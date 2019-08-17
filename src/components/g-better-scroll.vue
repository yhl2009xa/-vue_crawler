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
      scrollX:{
        type:Boolean,
        default:false
      },
      scrollY:{
        type:Boolean,
        default:true
      },
      //是否将开启上拉加载
      pullUpLoad:{
        type:Boolean,
        default:false
      },
      //开启下拉刷新
      pullDownRefresh:{
        type:Boolean,
        default:true
      },

      click: {
        type:Boolean,
        default:true
      },
      //回弹动画
      bounce: {
        type: Boolean,
        default: true
      },
      /**
       * 列表的数据
       */
      data: {
        type: Array,
        default: []
      },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
      refreshDelay: {
        type: Number,
        default: 1000
      },
      probeType: {
        type: Number,
        default: 2
      },
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
        this.scroll = new BScroll(this.$refs.wrapper,{
          scrollY:this.scrollY,
          scrollX:this.scrollX,
          click:this.click,
          bounce:this.bounce,
          startX: 0 ,
          startY: 0,

          pullDownRefresh:this.pullDownRefresh?{
            threshold: 20,
            stop: 44
          }:false,
          probeType:this.probeType
        })

         var self = this;

        //下拉结束派发下拉刷新事件
        this.pullDownRefresh && this.scroll.on('pullingDown', () => {
          // 下拉动作
          this.$emit('pullDownEvent')
        })

        //下拉结束派发下拉刷新事件
       this.scroll.on('scrollStart', () => {
          // 下拉动作
          this.$emit('scrollStartEvent')
        })

        //上拉加载
        this.pullUpLoad && this.scroll.on('scrollEnd', (pos) => {
          if(pos.y < this.scroll.maxScrollY + 50){
            this.$emit('pullingUpEvent');
          }
        })
      },
      refresh() {
        // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh()
      },
      scrollToElement() {
        // 代理better-scroll的scrollToElement方法
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },

      //滚动条重置
      resetPosition(){
        this.scroll.scrollTo(0,0);
      }
    },
    watch: {
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data(oldVal,newVal) {

        setTimeout(() => {
          this.scroll.finishPullDown();
          this.scroll.finishPullUp();

          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style scoped>

</style>
