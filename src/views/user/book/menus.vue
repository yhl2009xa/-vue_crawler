<template>
    <div class="m-user-book-menus flex-row">
      <!--底部菜单列表-->
      <div class="flex1 menu" v-for="obj in menus" @click="openControl(obj.id)">
        <font-awesome-icon :icon="['fas',obj.icon]" />
        <p>{{obj.name}}</p>
      </div>

    </div>

</template>

<script>
    export default {
        name: "menus",
        data(){
            return {
                menus: [
                    {
                        id: 1,
                        name: '目录',
                        icon: 'list',

                    },

                    {
                        id: 2,
                        name: '进度',
                        icon: 'hourglass-half',
                    },
                    {
                        id: 3,
                        name: '夜间',
                        icon: 'sun',
                    },

                    {
                        id: 4,
                        name: '设置',
                        icon: 'font',
                    }
                ],
            }
        },
        methods:{
            openControl(id){
                this.$store.commit("setMenusStatus",id);
            }
        },
        computed:{

        }
    }
</script>


<style scoped>

</style>
