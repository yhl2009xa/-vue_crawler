<template>
  <div id="root" style="width: 100%;height: 100%">
    <div class="ok" style="height: 100%">
      这是测试
    </div>
  </div>


</template>

<script>
    export default {
        name: "test",
        data(){
            return {
                selectItem:1,
                test1Val:''
            }
        },
        mounted(){
            alert(document.querySelector("#root").clientHeight + "....." + document.querySelector(".ok").clientHeight);

        },
        methods:{
            changeFocus(evt){
                setTimeout( ()=> {
                    this.test1Val = document.body.scrollTop || document.documentElement.scrollTop;
                },2000)


            }
        },

    }
</script>

<style scoped>

</style>
