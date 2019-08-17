<template>
  <div class="m-news-home" >
    <g-nav-tab :slider="tabData" @changeEvent="changeComponent">

    </g-nav-tab>




    <component :is="currentTabComponent" :categories="componentId">

    </component>


  </div>


</template>

<script>
    import NewsContent from "./news-content";
    import JokeContent from "./joke-content";
    import WyNewsContent from "./wy-news-content";
    export default {
        name: "home",
      data(){
          return{
            tabData:[{
              id:1,
              name:'推荐',
              component:NewsContent
            },{
              id:2,
              name:'娱乐'
            },{
              id:3,
              name:'体育'
            },{
              id:4,
              name:'财经'
            },{
              id:5,
              name:'笑话',
              component:JokeContent
            },{
              id:6,
              name:'军事'
            },{
              id:7,
              name:'科技'
            },
              {
                id:8,
                name:'手机'
              },
              {
                id:9,
                name:'数码'
              },
              {
                id:10,
                name:'游戏'
              },
              {
                id:11,
                name:'旅游'
              },
              ],
            currentTabComponent:NewsContent,
            componentId:1
          }

        },
        mounted(){

        },
      methods: {
        changeComponent(evt) {
          if(!!evt.component){
            this.currentTabComponent = evt.component;
            this.componentId = evt.id;
          }else{
            this.currentTabComponent = WyNewsContent;
            this.componentId = evt.id;
          }
        },
      }
    }
</script>

<style scoped>

</style>
