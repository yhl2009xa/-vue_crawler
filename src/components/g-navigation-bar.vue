/*
*
*仿今日头条的tab滑动栏雏形
*/
<template>
  <div class="g-navigation-bar">
    <ul class="nav-bar-list" ref="navList" @touchmove="touchMove($event)" @touchstart="touchStart($event)" @touchend="touchEnd($event)">
      <li v-for="(menu,idx) in tabData" :key="menu.id" :class="{'active':activeIndex == idx}" @click="setActive(idx,$event)" >
        {{menu.name}}
      </li>
    </ul>

  </div>
</template>

<script>
    export default {
        name: "g-navigation-bar",
        data(){
          return{
            //被选中的样式
            activeIndex:0,
            tabData:[{
              id:1,
              name:'关注'
            },{
              id:2,
              name:'推荐'
            },{
              id:3,
              name:'热点'
            },{
              id:4,
              name:'娱乐'
            },{
              id:5,
              name:'科技'
            },{
              id:6,
              name:'军事'
            },{
              id:7,
              name:'体育'
            },
              {
                id:8,
                name:'财经'
              },
              {
                id:9,
                name:'财经2'
              },
              {
                id:10,
                name:'财经3'
              },
              {
                id:11,
                name:'财经4'
              },
              {
                id:12,
                name:'财经5'
              }],
              //当前的偏移量
              currentOffsetX:0,
              //是否正在移动
              isMoving:false
          }

        },
      mounted() {
      },
      methods:{
        touchMove(event){
          if( !this.isMoving){
            return ;
          }
          let currentPosX = event.touches[0].pageX,
          move_x = currentPosX - this.startPosX;

          this.currentOffsetX  = this.currentOffsetX - move_x;

          console.log("currentPosX=" +currentPosX +  "...currentOffsetX=" + this.currentOffsetX +"...move_x=" + move_x);

          this.$refs.navList.style.transform = "translate3d(-" + this.currentOffsetX + "px, 0px, 0px)";
          this.startPosX = currentPosX;
        },
        touchEnd(event){
          this.isMoving = false;
        },

        touchStart(event){
          console.log("touch---" + event.touches[0].pageX);
          this.isMoving = true;
          this.startPosX = event.touches[0].pageX;
        },
        setActive(index,event){
          this.activeIndex = index;
          let target =  event.currentTarget,
              move_left  =  target.offsetLeft;
          this.$refs.navList.style.transform = "translate3d(-" + move_left + "px, 0px, 0px)"
          this.currentOffsetX = move_left;
          console.log("click---" + move_left);
        },

        // 向左向右移动tab
        moveTranslate(){

        }
      },

      watch:{
        // tabData(old,newVal){
        //   if(newVal.le)
        // }
      }
    }
</script>

<style scoped>

</style>
