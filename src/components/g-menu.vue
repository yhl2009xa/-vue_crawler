<template>
<div class="g-menu fixed-bottom-compatibility-iphoneX">
  <ul>
  <li v-for="(menu,idx) in menus" class="flex1" :class="{actived:active == idx}">
  {{menu.name}}
</li>
</ul>
</div>
</template>

<script>
export default {
  name: "g-menu",
  data(){
    return{
      menus:[
        {
          id:1,
          name:'主页',
          icon:'',

        },

        {
          id:2,
          name:'新闻',
          icon:'',

        },

        {
          id:2,
          name:'我的',
          icon:'',

        }
      ],
      active:0
    }

  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
