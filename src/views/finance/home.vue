<template>
    <div class="m-cp-home">
      <div class="box hx" >
        <ul>
          <li v-for="item in hx_data">{{item}}</li>
        </ul>
      </div>

      <div class="box ly" >
        <ul>
          <li v-for="item in ly_data">{{item}}</li>
        </ul>
      </div>

      <div class="box qk" >
        <ul>
          <li v-for="item in qk_data">{{item}}</li>
        </ul>
      </div>


      <div class="tips" :class="{fadeIn:showTips}">
        数据已刷新
      </div>


      <div class="timeOut" v-if="timeOut">
        数据八点开放，请八点后再来~~
      </div>

    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import {
        replaceAllLineBreakWithBr,
        removeBr
    } from "../../utils/common";
    export default {
        name: "home",
        data(){
            return {
                hx_str:"",
                hx_data:null,
                ly_data:null,
                qk_data:null,
                timeTask:null,
                exe_time_1:60000*1,
                exe_time_10:60000*18,
                //是否显示数据刷新
                showTips:false,
                //是否已经到八点
                timeOut:false
            }
        },
        mounted(){
            if(new Date().getHours() < 8){
                this.timeOut = true;
                return ;
            }
           this.$nextTick(()=>{
              this.setTimeTask(this.exe_time_1);
           })
            this.getCpList();
        },
        methods:{
            ...mapActions(['fetchCpQk','fetchCpHx','fetchCpLy']),

            getCpList(){
              this.getCpHx();
              this.getCpLy();
              this.getCpQk();

            },

            getCpHx(){
                this.fetchCpHx({
                    success:(data)=>{
                        this.hx_str = data;
                        this.hx_data = this.removeCharToArray(data);
                        // this.analysisData(this.hx_data);

                    }
                })
            },
            getCpLy(){
                this.fetchCpLy({
                    success:(data)=>{
                        this.ly_data = this.removeCharToArray(data)
                    }
                })
            },
            getCpQk(){
                this.fetchCpQk({
                    success:(data)=>{
                        this.qk_data = this.removeCharToArray(data);
                    }
                })
            },

            //取每组日期区间，遍历每个日期 并与该条的结果比较
            // 如果该条记录有条中 则停止遍历 跳到下个数组
            analysisData(sourceArr){
                // if(sourceArr.length == 1){
                //     return
                // }else{
                //     let newTargetArr = [];
                // }
                // sourceArr.reverse().forEach((item,index)=>{
                //     let tempData = item.split(" "),
                //         sectionDate = tempData[0].substr(0,7).split("-"),
                //         section_start = sectionDate[0],
                //         section_end = sectionDate[1].substr(0,3),
                //         target_Date = tempData[tempData.length -2].substr(0,3);
                //
                //     if(tempData[tempData.length - 1] == "中" && Number(target_Date) === Number(section_start)){
                //       let  str = section_start + "期 红袖万码" +  tempData[3]
                //     }
                //
                //
                // })
            },

            removeCharToArray(sourceStr){
                const reg = new RegExp(/<br\s*\\?\/?>/gi);
                let tempArr =  sourceStr.split("<br/>");
                return tempArr.slice(2,tempArr.length-4);
            },
            setTimeTask(time){
                this.timeTask = setTimeout(()=>{
                    this.getCpList();
                    this.setTimeTask(this.exe_time_1);
                },time)
            }
        },
        destroyed() {
            if(this.timeTask != null){
                clearTimeout(this.timeTask);
            }
        },
        watch:{
            //遇到数据更新的时候清除当前的定时器 改为10分钟后再执行一次
            hx_str(newVal,oldVal){
                if(oldVal != ""){
                    console.log(new Date());
                    this.showTips = true;
                    this.$nextTick(()=>{
                        setTimeout(()=>{
                            this.showTips = false
                        },5*1000)
                    })
                    clearTimeout(this.timeTask);
                    this.setTimeTask(this.exe_time_10);
                }

            }
        }
    }
</script>

