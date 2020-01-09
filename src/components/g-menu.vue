<template>
  <div class="g-menu fixed-bottom-compatibility-iphoneX">

    <router-link v-for="(menu,idx) in menus" class="flex1" :key="menus.id" :to="{name:menu.path}"
                 @click.native="changeMenu(idx)" :exact="menu.path == 'index'? true:false">
      <font-awesome-icon :icon="['fas',menu.icon]" size="2x"/>
      <p>{{menu.name}}</p>

    </router-link>
  </div>
</template>

<script>
    export default {
        name: "g-menu",
        data() {
            return {
                menus: [
                    {
                        id: 1,
                        name: '主页',
                        icon: 'home',
                        path: 'index'

                    },

                    {
                        id: 2,
                        name: '新闻',
                        icon: 'newspaper',
                        path: 'news'
                    },
                    {
                        id: 3,
                        name: '金融',
                        icon: 'hand-holding-usd',
                        path: 'finance'
                    },

                    {
                        id: 4,
                        name: '我的',
                        icon: 'user',
                        path: 'user'
                    }
                ],
                active: 0
            }

        },
        mounted() {
        },
        methods: {
            changeMenu(idx) {
                this.active = idx;
            }
        }

    }
</script>

<style scoped>

</style>
