/**
* 基于input的range滑块
*/
<template>
  <div class="g-range-slider ">
    <input type="range"
           @input="changeValue"
           min="1"
           max="100"
           ref="input"
           :style="{background:linearBackGround}"
           :value="currentPercent"
    >
  </div>
</template>


<script>
  import {escapeXmlChars} from '../utils/common'
    export default {
        name: "g-range-slider",
        data(){
            return {
                currentPercent :this.initValue,
            }
        },
        props:{
            changeBackFun:{
                type:Function
            },
            //默认初始滑块的值
            initValue:{
              type:String | Number
            }
        },
        computed:{
            linearBackGround:function(){
                return 'linear-gradient(to right, #F76A2B, #F76A2B ' + this.currentPercent + '%,  #f7c22b '+ this.currentPercent + '%,  #f7c22b)'
            }
        },
        methods:{
            changeValue(evt){
                this.currentPercent = evt.target.value;
                this.changeBackFun(evt.target.value);
            }
        }
    }
</script>

<style scoped>

</style>
