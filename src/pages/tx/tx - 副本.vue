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
            <CourseList></CourseList>

      </div>
    </div>

</template>

<script>
  import {reqTeaFilterList,reqTxList} from "../../api";
  import  HeaderTop  from "../../components/header/Header"
  import  CourseList from "../../components/videoList/videoList"
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
        HeaderTop,
        CourseList
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




</style>
