<template>
    <div >
      <img src="~@/assets/user.png" alt="">
    </div>
</template>

<script>
    export default {
        name: "home",
        data(){
          return {

          }
        },
        mounted() {
            console.log("1");
        }
    }
</script>

<style scoped>
  div{
    height: 100vh;
    overflow-y: scroll;
  }

  div::-webkit-scrollbar{
    background-color:transparent;
  }




</style>
