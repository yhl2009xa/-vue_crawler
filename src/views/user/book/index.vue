<template>
  <div class="m-user-book">
    <g-reader :rendEl="epubEl"
              :url="epubUrl"
              :jumpChapterPercent="jumpChapterProgress"
              ref="reader">
      <div class="content" id="bookContent" >

      </div>

      <div class="mask flex-row-main-space-between" @click="handleMenusShow">
        <div class="left" @click.stop="goPrePage"></div>
        <div class="right" @click.stop="goNextPage"></div>
      </div>

      <!--底部菜单栏-->
      <transition name="slider-down">
        <menus  v-show="$store.state.menusStatus != -1 && $store.state.menusStatus != 1 "></menus>
      </transition>


      <transition name="slider-down">
        <menus-control v-show="$store.state.menusStatus > 1"
                       @getCurrentPercent="getCurrentPercent"
                       @jumpPreChapter="jumpPreChapter"
                       @jumpNextChapter="jumpNextChapter"></menus-control>
      </transition>


      <!--左侧目录栏-->
      <transition name="left-move">
        <catalogue  v-show="$store.state.menusStatus == 1" ></catalogue>
      </transition>

    </g-reader>


  </div>
</template>

<script>

    const epubUrl = "/static/example.epub";
    import GReader from "../../../components/g-reader";
    import Menus from "./menus";
    import Catalogue from "./catalogue";
    import MenusControl from './menus-control'

    export default {
        name: "book",
        data() {
            return {
                //电子书的地址
                epubUrl: epubUrl,
                //用来包裹电子书dom的id
                epubEl: 'bookContent',
                //是否点击了

            }

        },
        methods: {
            goPrePage() {
                this.$refs.reader.$emit("goPrePage");
                this.changeMeunsState(-1);
            },
            jumpPreChapter(){
                this.$refs.reader.$emit("goPreChapter");
            },
            jumpNextChapter(){
                this.$refs.reader.$emit("goNextChapter");
            },
            goNextPage() {
                this.$refs.reader.$emit("goNextPage");
                this.changeMeunsState(-1);
            },
            gotoUrl(url){
                this.$refs.reader.$emit("gotoUrl",url);
                this.changeMeunsState(-1);
            },
            /**
             * 如果当前菜单未弹起，设置成弹起状态
             */
            handleMenusShow() {
               if(this.$store.state.menusStatus == -1){
                   this.$store.commit("setMenusStatus",0);
               }else{
                   this.changeMeunsState(-1);
               }
            },

            changeMeunsState(state){
                this.$store.commit("setMenusStatus",state);
            },
            getCurrentPercent(callBack){
                callBack && callBack(this.$refs.reader.getCurrentPercent());
            }


        },


        computed:{
            //当前菜单的操作状态
            menusStatus(){
                return this.$store.menusStatus;
            },
            jumpChapterProgress(){
                return this.$store.state.currentJumpProgress;
            }
        },


        components: {Menus, GReader,Catalogue,MenusControl}
    }
</script>

<style scoped>

</style>
