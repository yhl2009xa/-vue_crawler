<template>
  <img  v-lazy="computedImgType(type)" :style="mStyle" />

</template>

<script>
  import Vue from 'vue'
  import VueLazyLoad from 'vue-lazyload'
  import loadingImg from "../assets/img_loading.webp";
  import loading_140_88 from "../assets/loading_140_88.png";
  import loading_117_73 from "../assets/loading_117_73.png";
  import errorImg from "../assets/img_loading.webp";
  // 图片懒加载，及配置
  Vue.use(VueLazyLoad);

  export default {
    name: "g-lazy-img",
    props: {
      // 图片地址url
      imgUrl: {
        type: String,
        default: "",
        required:true
      },
      type:{
        type: Number,
        default: 0
      },

    },
    data() {
      return{
        defaultImgObject:{
          src:'',
          error:errorImg,
          loading:loadingImg
        },
        mStyle:{
          type:Object,
          default: function () {
            return {'height':'auto'}
          }
        }
      }
    },
    methods: {
      computedImgType(type) {
        switch (type) {
          case 0:
            this.defaultImgObject.src = this.imgUrl;
            return this.defaultImgObject;
          case 1:
            this.defaultImgObject.src = this.imgUrl;
             this.defaultImgObject.loading = loading_140_88;
            return this.defaultImgObject;
          case 2:
            this.defaultImgObject.src = this.imgUrl;
            this.defaultImgObject.loading = loading_117_73;
            this.mStyle = {'width':'1.17rem','height':'.73rem'};
            return this.defaultImgObject;
          default:
            this.defaultImgObject.src = this.imgUrl;
            return this.defaultImgObject;
        }
      }
    }
  }
</script>

<style scoped>

</style>
