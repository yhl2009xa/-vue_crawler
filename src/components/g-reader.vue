/**
* 电子书阅读器插件
*/
<template>
  <div class="g-reader">
    <slot></slot>
  </div>
</template>

<script>
    import ePub from "epubjs"
    import {mapMutations} from 'vuex';

    export default {
        name: "g-reader",
        props: {
            url: {
                type: String,
                required: true,
            },
            rendEl: {
                required: true
            },
            jumpChapterPercent: {
                required: false,
            }
        },
        data() {
            return {
                //电子书对象
                book: null,
                //渲染对象
                rendition: null,
                //目录对象
                navigation: null,
                //本地存储对象
                locations: null,
                //是否解析完毕
                bookAvailable: false,
                //存放所有的目录
                allCatalogue:[],

            }
        },
        mounted() {
            this.init();
            this.addEvents();
        },
        methods: {
            ...mapMutations(["setCatalogue"]),
            goPrePage: function () {
                this.rendition.prev();
            },
            goNextPage: function () {
                this.rendition.next();
            },
            goPreChapter:function(){
                let CurrentHrefIndex = this.getCurrentHrefIndex();
                let preHref = this.allCatalogue[CurrentHrefIndex-1].href;
                this.rendition.display(preHref);
            },
            goNextChapter:function(){
                let CurrentHrefIndex = this.getCurrentHrefIndex();
                let preHref = this.allCatalogue[CurrentHrefIndex +1].href;
                this.rendition.display(preHref);
            },
            //获取当前书籍封面
            coverUrl: function () {

            },
            //跳转到指定的位置目录
            gotoUrl: function (url) {
                this.rendition.display(url);
            },
            getCurrentHrefIndex(){
                let currentLocation = this.rendition.currentLocation();
                console.log(currentLocation.start.href);
                for(let index = 0 ;index < this.allCatalogue.length;index++){
                    if(this.allCatalogue[index].href == currentLocation.start.href){
                        return index;
                    }
                }
                return 0;

            },
            //获取当前页面的百分比
            getCurrentPercent(){
                let currentLocation = this.rendition.currentLocation(),
                    currentPercent =  this.locations.percentageFromCfi(currentLocation.start.cfi);

                let    test =  this.locations.locationFromCfi(currentLocation.start.cfi);
                return currentPercent;
            },
            //跳转到内容百分比

            jumpNewChapter: function (progress) {
                const percentage = progress / 100
                const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
                this.rendition.display(location)
            },
            /**
             *这里的el挂载元素必须用id，class也不行
             */
            renderBook: function () {
                this.rendition = this.book.renderTo(this.rendEl, {
                    height: window.innerHeight,
                    width: window.innerWidth,
                    flow: 'paginated',
                    spreads: false,
                })
                this.rendition.display();
            },
            //生成目录
            initList: function () {
                this.book.ready.then(() => {
                    // 生成目录
                    this.navigation = this.book.navigation;
                    // 生成Locations对象。
                    return this.book.locations.generate(10);
                }).then(result => {
                    // 保存locations对象
                    this.locations = this.book.locations;
                    // 标记电子书为解析完毕状态
                    this.bookAvailable = true;
                    // this.$store.commit("setCatalogue");

                    this.initCatalogue(this.navigation.toc);
                    this.setCatalogue(this.navigation.toc);
                    console.log(this.allCatalogue);
                })
            },


            init: function () {
                this.book = new ePub(this.url);
                this.initList();
                this.renderBook();
            },
            /**
             * 初始化目录
             */
            initCatalogue:function(cataArr){
                cataArr.forEach((item,index)=>{
                    let obj = {id:item.id,href:item.href};
                    this.allCatalogue.push(obj);
                    if(item.subitems){
                        this.initCatalogue(item.subitems);
                    }
                })
            },
            addEvents() {
                this.$on("goPrePage", this.goPrePage);
                this.$on('goNextPage', this.goNextPage);
                this.$on('goPreChapter', this.goPreChapter);
                this.$on('goNextChapter', this.goNextChapter);
                this.$on('gotoUrl', this.gotoUrl);

            },


        },
        watch: {
            jumpChapterPercent(newValue,oldValue) {
                this.jumpNewChapter(newValue);
            }
        }
    }
</script>

<style scoped>

</style>
