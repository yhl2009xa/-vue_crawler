<template>
  <!--底部菜单栏上每个菜单的操作区-->
  <div  class="m-user-book-menus-control">
    <div v-show="menusStatus == 2" class="progress flex-row">
      <p class="left" :class="{disabled:currentPercent == 1 }" @click="changeChapterPre">
        上一章
      </p>
      <g-range-slider class="box-item flex1" :changeBackFun="jumpNewChapter" :initValue="currentPercent">

      </g-range-slider>

      <p class="right" :class="{disabled:currentPercent == 100 }" @click="changeChapterNext">
        下一章
      </p>

    </div>


    <!--夜间-->
    <div v-show="menusStatus == 3">
      这是主题
    </div>

    <!--设置-->
    <div v-show="menusStatus == 4" class="box-item set-up">
      <div class="top flex-row">
        <p>A<label>-</label></p>
        <p>A<label>+</label></p>
      </div>

      <div class="box-item themes bottom flex-row">
        <div v-for="item in themes"
             @click="changeTheme(item.id)"
             :class="[item.style,activeThemeIndex == item.id?'active':'']"

        >{{activeThemeIndex == item.id?'':item.name}}</div>
      </div>

    </div>
  </div>
</template>

<script>
     import {mapMutations} from 'vuex';
    import GRangeSlider from "../../../components/g-range-slider";
    export default {
        name: "menusControl",
        components: {GRangeSlider},
        props:{
            changeChapter:{
                type:Function
            }
        },
        data(){
            return {
                //当前设置的主题颜色
                activeThemeIndex:1,
                //当前观看的进度条
                currentPercent:'1',
                //当前状态

                themes:[{
                    id:1,
                    name:'默认',
                    style:'grey'
                },{
                    id:2,
                    name:'绿色',
                    style:'green'
                },{
                    id:3,
                    name:'黄色',
                    style:'yellow'
                },{
                    id:4,
                    name:'粉色',
                    style:'pink'
                }]
            }
        },


        methods:{
            ...mapMutations(["setCurrentProgress"]),
            changeTheme(id){
                this.activeThemeIndex = id;
            },
            jumpNewChapter(percent){
                this.currentPercent = percent;
                this.setCurrentProgress(percent);
            },
            changeChapterPre(){
                this.$emit("jumpPreChapter");
            },
            changeChapterNext(){
                this.$emit("jumpNextChapter");
            },
        },

        watch:{
            menusStatus(newValue,old){
                if (newValue == 2) {
                    this.$emit("getCurrentPercent", (percent) => {
                        this.currentPercent = percent * 100;
                    })
                }
            }

        },
        computed:{
            menusStatus(){
                return   this.$store.state.menusStatus
            }
        }
    }
</script>

<style scoped>

</style>
