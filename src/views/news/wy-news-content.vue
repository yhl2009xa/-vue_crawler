<template>
  <div>
    <g-pull-up-down class="m-news-content"
                    :isOpenPullDown="true"
                    :isOpenPullUp="true"
                    :data="news_data"
                    :refresh="refreshList"
                    :loadMore="loadMoreList" ref="child">
      <div v-for="(item ,index) in news_data"
           class="new-items flex-row-main-space-between" >
        <div  class="left flex-column-main-space-between">
          <a :href=" item.skipURL ||  item.url">{{item.title}}</a>
          <div class="bottom flex-row-main-space-between">
            <p>{{item.source}}</p>
            <p>{{item.ptime}}</p>
          </div>
        </div>
        <div class="right">
          <g-lazy-img :imgUrl="item.imgsrc" :type="2"/>
        </div>
      </div>

    </g-pull-up-down>
  </div>
</template>

<script>
  import {mapActions} from "vuex";
  import GPullUpDown from "../../components/g-pull-up-down";
  import GLazyImg from "../../components/g-lazy-img";

  export default {
    name: "wy-news-content",
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
        pageStart: 0,
        //每页查询的列表数
        pageNumber: 15,
        news_data: [],
        canvasImg:''
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.queryList();
      })
    },
    methods: {
      ...mapActions(['fetchWYNewsHomePage']),
      refreshList(){
        Object.assign(this.$data, this.$options.data(), {news_data: this.news_data});
        this.queryList();
      },
      loadMoreList(){
        this.queryList();
      },
      queryList() {

        this.fetchWYNewsHomePage({
          params:{
            pagestart:this.pageStart,
            pagenum: this.pageNumber,
            type:this.categories
          },
          success: (res) => {

            if(res.length > 0){
              this.pageStart ++;
              this.news_data = (this.pageStart ==1 ?res:this.news_data.concat(res));
            }
          }
        });

      },


    },
    watch: {
      categories:function(){
        Object.assign(this.$data, this.$options.data());
        this.$refs.child.resetPosition();
        this.queryList();
      }
    }

  }
</script>


<style scoped>

</style>
