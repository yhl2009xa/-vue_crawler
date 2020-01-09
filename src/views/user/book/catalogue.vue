<template>
    <div class="m-user-book-catalogue" @click="hideCatalogue" >
      <ul>
        <li v-for="item in catalogues" @click="gotoUrl(item.href)">{{item.label}}</li>
      </ul>
    </div>
</template>

<script>
    import { mapMutations,mapGetters } from 'vuex';
    export default {
        name: "catalogue",
        data(){
            return {
                // catalogues:[],
            }
        },
        methods:{
            hideCatalogue(){
                this.$store.commit("setMenusStatus",-1);

            },
            gotoUrl(url){
                this.$parent.gotoUrl(url);
            },
        },
        mounted() {
           // this.init();
        },
        computed:{
            catalogues(){
                return this.$store.state.catalogue;
            }
        }

    }

</script>
<style scoped>

</style>
