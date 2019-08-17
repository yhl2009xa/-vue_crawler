<template>
  <div class="m-home padding-15" >
    <g-pull-up-down  class="m-home-wrapper"
                     :refresh="getPageData"
                    :data="page_data"
                    :isOpenPullDown="true">
      <div v-for="item in page_data" class="box_item" :key="item.id">
        <p class="t-title">{{item.title}}</p>
        <g-lazy-img v-for="(imgs,idx) in item.imgSrc.split(';')"
                    :key="item.id + '-' + idx " :imgUrl="imgs | getImgSrc"
                    :mStyle="imgs | getImgHeightFromSrc" ></g-lazy-img>

        <!--<img v-for="(imgs,idx) in item.imgSrc.split(';')"-->
             <!--:key="item.id + '-' + idx " :src="imgs | getImgSrc"-->
             <!--:style="imgs | getImgHeightFromSrc" />-->

      </div>
    </g-pull-up-down>

    <!--<div style="position: absolute;top:.5rem;bottom: .5rem;">-->
      <!--<g-pull-up-down :refresh="getPageData" :data="page_data">-->
        <!--<div v-for="item in page_data" class="box_item" :key="item.id">-->
          <!--<p class="t-title">{{item.title}}</p>-->
          <!--<g-lazy-img v-for="(imgs,idx) in item.imgSrc.split(';')" :key="item.id + '-' + idx " :imgUrl="imgs | getImgSrc"></g-lazy-img>-->
        <!--</div>-->
      <!--</g-pull-up-down>-->
    <!--</div>-->



    <!--<div class="" style="position: absolute;top:0px;bottom:.5rem;overflow: scroll;">-->
      <!--<div v-for="item in page_data" class="box_item" :key="item.id">-->
        <!--<p class="t-title">{{item.title}}</p>-->
        <!--<g-lazy-img v-for="(imgs,idx) in item.imgSrc.split(';')" :key="item.id + '-' + idx " :imgUrl="imgs | getImgSrc"></g-lazy-img>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import {mapActions} from "vuex";
  import GPullUpDown from "../components/g-pull-up-down";
  import GLazyImg from "../components/g-lazy-img";

  export default {
    name: "index",
    components: {GLazyImg, GPullUpDown},
    data() {
      return {
        page_data: [],//主页数据
      };
    },
    created() {

    },
    mounted() {
      this.getPageData();
    },
    methods: {
      ...mapActions(['fetchHomePage']),
      getPageData(){
        Object.assign(this.$data, this.$options.data(), {page_data: this.page_data});
        this.fetchHomePage({
          success: (res) => {
            this.page_data = res
          }
        });
      },


    },
    filters: {
      getImgSrc: (originStr) => {
        return originStr.substring(0, originStr.indexOf("?"));
      },

      //获取图片宽高
      getImgHeightFromSrc:(originStr)=>{
        let w_h_str = originStr.substring(originStr.indexOf("w_"),originStr.length);
        if(w_h_str === originStr){
          return ""
        }else{
          let w_h_Arr = w_h_str.split("_"),
          w_number = w_h_Arr[1],  h_number = w_h_Arr[3];
          return {'height':h_number/(w_number - 30)*document.body.clientWidth + "px"};
        }

      }
    }

  }
</script>

