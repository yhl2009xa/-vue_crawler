<template>
  <g-better-scroll
    class="pull-up-down-wrapper"
    :pullUpLoad="isOpenPullUp"
    :pullDownRefresh="isOpenPullDown"
    @pullDownEvent="pullDownOver"
    @pullingUpEvent="pullingUpOver"
    @scrollStartEvent="scrollStartHandle"
    :data=data  ref="betterScroll">
    <div class="scroll-content" >

      <!--下拉刷新-->
      <template v-if="isOpenPullDown">
        <div class="top-tip flex-main-cross-center" :class="{'static-position':isLoading}">
          <p class="" v-html="refresh_msg"></p>
          <img class="refresh-icon" src="../assets/loading.gif"/>
        </div>
      </template>

      <!-- 列表 -->
      <div class="list-content">
        <slot></slot>
      </div>

      <!--上拉加载-->
      <template v-if="isOpenPullUp">
        <div class="bottom-tip flex-main-cross-center">
          <font-awesome-icon :icon="['fas','spinner']" size="1x" class="font-icon fa-spin"/>
          <span>正在加载</span>
        </div>
      </template>


    </div>
  </g-better-scroll>
</template>

<script>
  export default {
    name: "g-pull-up-down",
    props: {
      isOpenPullDown: {
        type: Boolean,
        default: false,
      },
      isOpenPullUp: {
        type: Boolean,
        default: false,
      },
      // better-scroll依赖data
      data: {
        type: Array,
        default: null
      },
      // 刷新函数（初始化函数）
      refresh: {
        type: Function,
        default: null
      },
      //加载更多
      loadMore:{
        type: Function,
        default: null
      }
    },
    data() {
      return {
        refresh_msg: '下拉刷新',
        //正在刷新
        isLoading: false,
      }

    },

    mounted(){
      this.$nextTick(()=> {


      })
    },
    updated(){

    },

    methods: {

      //下拉刷新
      pullDownOver() {
        if (this.isOpenPullDown) {
          this.startRefresh();
        }
      },

      //上拉加载更多
      pullingUpOver(){
        if (this.isOpenPullUp) {
          this.loadMoreList();
        }
      },

      loadMoreList(){
        this.loadMore();
      },

      scrollStartHandle(){
        this.refresh_msg = "下拉刷新";
      },


      // 开始刷新
      startRefresh() {
        this.refresh_msg = "加载中";
        this.isLoading = true;
        // 调用刷新
        setTimeout(() => {
          this.refresh && this.refresh();
        }, 400);
      },


      //滚动条重置
      resetPosition(){
        this.$refs.betterScroll.resetPosition();
      },


      //刷新完成
      completeRefresh(){
        setTimeout(()=>{
          this.refresh_msg = "加载完成";
          this.isLoading = false;
        },400)
      }
    },

    watch:{
      "data": {
        handler: function () {
          // 兼容重刷新
          if (this.isOpenPullDown) {
            this.completeRefresh();
          }
        },
        deep: true //深度监听
      }
    },
  }
</script>

<style scoped>

</style>
