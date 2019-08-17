<template>
  <g-pull-up-down class="m-joke-content"
                  :isOpenPullDown="true"
                  :isOpenPullUp="true"
                  :data="joke_data"
                  :refresh="refreshList"
                  :loadMore="loadMoreList">
    <div v-for="(item ,index) in joke_data"
         class="new-items " >

      <div class="title" v-html="item.text"></div>

      <div class="intro flex-main-space-between flex-row">
        <p class="author">{{item.name}}</p>
        <p class="time">{{item.passtime}}</p>
      </div>

      <!--<div  class="left ">-->
        <!--<a :href="item.path">{{item.title}}</a>-->
        <!--<div class="bottom flex-row-main-space-between">-->
          <!--<p>网易</p>-->
          <!--<p>{{item.passtime}}</p>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="right">-->
        <!--<g-lazy-img :imgUrl="item.image" :type="1"/>-->
      <!--</div>-->
    </div>

  </g-pull-up-down>

</template>


<script>
  import {mapActions} from "vuex";
  import GPullUpDown from "../../components/g-pull-up-down";
  import GLazyImg from "../../components/g-lazy-img";

  export default {
    name: "joke-content",
    components: {GLazyImg, GPullUpDown},
    props: {
      categories: {
        type: Number,
        default: 1
      },

    },
    data() {
      return {
        //当前页码
        pageStart: 1,
        //每页查询的列表数
        pageNumber: 15,
        joke_data: []
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.queryList();
      })
    },
    methods: {
      ...mapActions(['fetchJokeListPage']),
      refreshList(){
        Object.assign(this.$data, this.$options.data(), {joke_data: this.joke_data});
        this.queryList();
      },
      loadMoreList(){
        this.queryList();
      },
      queryList() {

        this.fetchJokeListPage({
          params:{
            pagestart:this.pageStart,
            pagenum: this.pageNumber
          },
          success: (res) => {

            if(res.length > 0){
              this.pageStart ++;
              this.joke_data = (this.pageStart ==1 ?res:this.joke_data.concat(res));
            }
          }
        });

      }
    },
    watch: {
      // categories:{
      //   handler:function(old, newValue) {
      //     console.log("value is change");
      //     this.queryList();
      //   },
      //   // immediate: true
      // }
    }

  }
</script>

<style scoped>

</style>
