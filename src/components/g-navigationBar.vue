<template>
  <div class="g-nav_bar">
    <ul>
      <li v-for="menu in menus">
        {{menu.name}}
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "NavigationBar",
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
            ]
          }

        },
      mounted() {
      }
    }
</script>

<style scoped>

</style>
