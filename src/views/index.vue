<template>
  <div class="m-home padding-15" >
    <g-pull-up-down >
      <div v-for="item in page_data" class="box_item">
        <p class="t-title">{{item.title}}</p>
        <img v-for="imgs in item.imgSrc.split(';')" :src="imgs | getImgSrc">
      </div>
    </g-pull-up-down>
  </div>
</template>

<script>
  import {mapActions} from "vuex";
  import GPullUpDown from "../components/g-pull-up-down";

  export default {
    name: "index",
    components: {GPullUpDown},
    data() {
      return {
        page_data: [],//主页数据
      };
    },
    created() {

    },
    mounted() {
      this.fetcHomePage({
        success: (res) => {
          this.page_data = res
        }
      });
    },
    methods: {
      ...mapActions(['fetcHomePage'])
    },
    filters: {
      getImgSrc: (originStr) => {
        return originStr.substring(0, originStr.indexOf("?"));
      }
    }

  }
</script>

