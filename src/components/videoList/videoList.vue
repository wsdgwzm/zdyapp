<template>
    <div class="course-list">
        <div class="course-item" v-for="(item,index) in texun" :key="index" @click="goPage(item.VideoUrl,item.ClassID)">
            <div class="course-hd">
                <i v-if="item.IsPay==0" class="free"></i>
                <img :src="item.ClassImage" />
                <div class="title">{{item.ClassDesc}}</div>
            </div>
            <div class="course-tec">
                <img :src="item.UserImage" />
                <span class="tec-name">{{item.UserName}}</span>
            </div>
            <div class="course-bot">
                <span class="time">{{item.RegTime}}</span>
                <span class="counts">{{item.StuCount}} 播放</span>
            </div>
        </div>

    </div>
</template>

<script>
    import {reqTxList} from "../../api";
    export default {
        props: {
            id: String
        },
        data(){
            return{
                texun:[],
                tid:'',
                page:0,
                loading:false
            }
        },
        mounted(){
            console.log(this)
            this.txlist(this.id)
        },
        methods:{
            txlist(id){
                this.tid=id
                this.page=1
                reqTxList(this.tid,this.page).then(res =>{
                    console.log(this.page)
                    this.texun=res.data
                })
            },
            loadMore(){
                this.loading = true;
                this.page++
                reqTxList(this.tid,this.page).then(res =>{
                    console.log(this.page)
                    this.texun=this.texun.concat(res.data)
                })
                this.loading = false;
            },
            goPage(){

            }
        }
    }
</script>

<style scoped>
    /* 特训列表 */
    .course-list{
        background: #fff;
        overflow: auto;
        padding: 0.2rem 0 0.2rem 0.3rem;
        margin-bottom: 1rem;

    }
    .course-list .course-item{
        width: 3.2rem;
        float: left;
        margin: 0 .5rem 0.1rem 0;
    }
    .course-list .course-item:nth-child(2n){
        margin-right: 0;
    }
    .course-list .course-item .course-hd{
        width: 100%;
        height: 2.3rem;
        position: relative;
        overflow: hidden;
    }
    .course-list .course-item .course-hd img{
        width: 100%;
        height: 100%;
    }
    .course-list .course-item .course-hd i{
        width: 0.7rem;
        height: 0.35rem;
        display: block;
        position: absolute;
        top:0;
        right:0;
        z-index: 11;
    }
    .course-list .course-item .course-hd i.free{
        background: url(../../common/images/live/icon-free.png) no-repeat center center;
        background-size: 100% 100%;
    }
    .course-list .course-item .course-hd .title{
        position: absolute;
        bottom:0;
        right:0;
        z-index: 11;
        width: 100%;
        height: 0.35rem;
        line-height: 0.35rem;
        padding: 0 0.2rem;
        box-sizing: border-box;
        color: #fff;
        font-size: 0.2rem;
        background: rgba(0,0,0,0.6);
    }
    .course-list .course-item .course-tec{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.26rem;
    }
    .course-list .course-item .course-tec img{
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        margin-right: 0.1rem;
    }
    .course-list .course-item .course-bot{
        height: 0.35rem;
        line-height: 0.35rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 0.22rem;
        color:  #999;
    }
</style>