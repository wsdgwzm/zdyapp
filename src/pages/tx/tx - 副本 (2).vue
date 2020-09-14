<template>
    <div>
        <HeaderTop title="特训">
            <span slot="back"  class="back"></span>
        </HeaderTop>
      <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="30">
          <div class="banner"><img src="../../common/images/1.png"></div>
          <div class="filter-box">
              <span class="title">精选课程</span>
              <div class="filter" @click="toggleFilter()">
                  <img src="../../common/images/1.png" class="avator" />
                  全部
              </div>
              <div class="filter-list" v-if="show">
                  <ul class="filter-bd">
                      <li @click="txlist()"><img class="avator" src="../../common/images/1.png" ><div class="lsname">全部</div></li>
                      <li v-for="item in teaList" @click="txlist(item.TeaID)">
                          <img class="avator" :src="'http://qijios.xinlande.com.cn'+item.UserImage" >
                          <div class="lsname">{{item.UserName}}</div>
                      </li>

                  </ul>
              </div>
          </div>

          <div class="course-list" >
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
      </div>
    </div>

</template>

<script>
  import {reqTeaFilterList,reqTxList} from "../../api";
  import  HeaderTop  from "../../components/header/Header"
  export default {
   data(){
      return{
          show:false,
          teaList:'' ,
          texun:[],
          tid:'',
          page:0,
          loading:false,
          token:''
      }
    },
    mounted(){
        this.token=this.untils.getCookie('token')
        reqTeaFilterList().then(res =>{
            this.teaList=res.data
          })
    },
    methods:{
        toggleFilter(){
            this.show=!this.show
        },
        txlist(id){
            this.tid=id
            this.show=false
            this.page=1
            reqTxList(this.tid).then(res =>{
                console.log(this.page)
                this.texun=res.data
            })
        },
        loadMore(){
            this.loading = true;
            this.show=false
            this.page++
            reqTxList(this.tid,this.page).then(res =>{
                console.log(this.page)
                this.texun=this.texun.concat(res.data)
            })
            this.loading = false;



        },
        goPage(url,id){
            if(this.token){
                ajax_send('get','http://qijios.xinlande.com.cn/app/apph5/AddVideoPlayRecord',
                    {token:token,classid:id},'json',function(res){
                        if(res.code==1){
                            window.location.href=url
                        }
                    })
            }else{
                layer.msg('请先登录获取更多信息')
            }

        }
    },
    components:{
        HeaderTop
    }
  }
</script>

<style scoped>
    .content{
        background: #f5f5f5;
        height: 100%;
    }
    .banner{
        height: 2.7rem;
        overflow: hidden;
    }
    .banner img{
        width: 100%;
        height: 100%;
    }


    .filter-box{
        height: 1.1rem;
        background:#fff ;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.3rem;
        margin: 0.2rem 0 0;
        border-bottom: 1px solid #ddd;
        position: relative;
    }
    .filter-box .title{
        font-size: 0.32rem;

    }
    .filter {
        display: flex;
        flex-direction: row;
        justify-content:flex-start;
        height: 0.5rem;
        background: url(../../common/images/icon-filter.png) no-repeat right center;
        background-size: 0.35rem 0.3rem;
        padding-right: 0.5rem;
        line-height: 0.5rem;
        color: #999;
        font-size: 0.26rem;
    }
    .filter .avator{
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        margin-right: 0.1rem;
    }

    .filter-list{
        position: absolute;
        top:1.1rem;
        left: 0;
        height:2rem ;
        background: #fff;
        z-index: 20;
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;;
        padding: 0.3rem 0 0.1rem 0.3rem;
    }

    .filter-list .filter-bd,.slide{
        width: 100%;
        height:1.4rem ;
        overflow-x: scroll;
        white-space: nowrap;
    }
    .filter-list .filter-bd li{
        display: inline-block;
        width:0.8rem;
        text-align: center;
        margin: 0 0.5rem 0 0.3rem ;
    }
    .filter-list .filter-bd li .avator{
        width: 0.8rem;
        height: 0.8rem;
        display: block;
        border-radius: 50%;
    }
    .filter-list .filter-bd li .lsname{
        height: 0.5rem;
        line-height: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.26rem;
    }



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
