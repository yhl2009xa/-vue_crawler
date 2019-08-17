<template>

  <div>
    <g-pull-up-down class="m-news-content"
                    :isOpenPullDown="true"
                    :isOpenPullUp="true"
                    :data="news_data"
                    :refresh="refreshList"
                    :loadMore="loadMoreList"
                    v-if="!canvasImg"
    >
      <div v-for="(item ,index) in news_data"
           class="new-items flex-row-main-space-between" >
        <div  class="left flex-column-main-space-between">
          <a :href="item.path">{{item.title}}</a>
          <div class="bottom flex-row-main-space-between">
            <p>网易</p>
            <p>{{item.passtime}}</p>
          </div>
        </div>
        <div class="right">
          <g-lazy-img :imgUrl="item.image" :type="1"/>
        </div>
      </div>

    </g-pull-up-down>
    <!--<img :src="canvasImg" alt="" v-else style="position: absolute;left: 0px;top:0px;width: 100%">-->
  </div>


</template>


<script>
  import {mapActions} from "vuex";
  import GPullUpDown from "../../components/g-pull-up-down";
  import GLazyImg from "../../components/g-lazy-img";
  import html2canvas from 'html2canvas';

  export default {
    name: "news-content",
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
      ...mapActions(['fetchNewsHomePage']),
      refreshList(){
        Object.assign(this.$data, this.$options.data(), {news_data: this.news_data});
        this.queryList();
      },
      loadMoreList(){
        this.queryList();
      },
      queryList() {

        this.fetchNewsHomePage({
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
            // this.$nextTick(()=>{
            //   setTimeout(()=>{
            //
            //     html2canvas(document.body, {useCORS: true}).then(function(canvas) { document.body.appendChild(canvas); });
            //
            //     // html2canvas(document.body).then(canvas => {
            //     //
            //     //
            //     //   let dataUrl = canvas.toDataURL("image/jpeg", .9);
            //     //   this.canvasImg = dataUrl;
            //     // });
            //   },5000)
            // })




          }
        });

      },


    },
    watch: {

    }

  }
</script>

<style scoped>

</style>
