<template>
  <div style="background: #f0f0f0">
    <div class="header">
      <a href="newsList.html" class="news"><i></i>情报</a>
      <span class="kefu" @click="kefu()"><i></i>客服</span>
      <img src="./images/index/logo.png" class="logo" >
      <!--<span class="sys"><i></i>扫码</span>-->
    </div>
    <div class="content">

      <div class=" banner" id="banner">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in banner" :key="index" @click="goPage(item.ActivityUrl)">
            <img :src="item.ActivityImage">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="nav-box">
        <ul>
          <li @click="goPage('/qz?v=1')">
            <a href="javascript:;">
              <div class="item-img"><img src="./images/index/nav01.png"><i class="icon_new"></i></div>
              <p class="item-name">热点研报</p>
            </a>
          </li>
          <li @click="goPage('/zhyb')">
            <a href="javascript:;">
              <div class="item-img"><img src="./images/index/nav02.png"></div>
              <p class="item-name">智汇研报</p>
            </a>
          </li>
          <li @click="goPage('/qz?v=2')">
            <a href="javascript:;">
              <div class="item-img"><img src="./images/index/nav03.png"></div>
              <p class="item-name">涨牛学院</p>
            </a>
          </li>
          <li @click="goPage('/dkwg')">
            <a href="javascript:;">
              <div class="item-img"><img src="./images/index/nav04.png"><i class="icon_hot"></i></div>
              <p class="item-name">大咖问股</p>
            </a>
          </li>
          <li @click="goPage('/qz?v=0')">
            <a href="javascript:;">
              <div class="item-img"><img src="./images/index/nav05.png"></div>
              <p class="item-name">投资笔记</p>
            </a>
          </li>
          <li @click="goPage('/qz?v=1')">
            <a href="javascript:;">
              <div class="item-img"><img src="./images/index/nav06.png"></div>
              <p class="item-name">精品课</p>
            </a>
          </li>
          <li @click="goPage('/qz?v=3')">
            <a href="javascript:;">
              <div class="item-img"><img src="./images/index/nav07.png"></div>
              <p class="item-name">锦囊</p>
            </a>
          </li>
          <li @click="goPage('/qz?v=4')">
            <a href="javascript:;">
              <div class="item-img"><img src="./images/index/nav08.png"><i class="icon_jing"></i></div>
              <p class="item-name">投顾工作室</p>
            </a>
          </li>
        </ul>
      </div>
      <!--力荐-->
      <div class="lj-box">
        <a href="javascript:;" @click="goPage('https://qijiapp.xinlande.com.cn/cctv/AppPost/PostDetail?&type=0&PostID='+item.ThemeID,'lj')" class="lj-item lj" v-for="item in recommend">{{item.ActTitle}}</a>
      </div>

      <!--工作室-->
		<div class="swiper-container banner-sfk" v-if="!studio">
		  <div class="swiper-wrapper">
		    <div class="swiper-slide" v-for="(item,index) in studio" :key="index" @click="goPage('/teacherIndex?tuid='+item.TeaID+'&v=1','stduio')" >
		      <img :src="item.RecomImgUrl">
		    </div>
		  </div>
		  <div class="swiper-pagination"></div>
		</div>
		
      <!--问股-->
      <div class="section">
        <div class="sec-title"><span>大咖问股</span></div>
        <ul class="askStock">
          <li v-for="(item,index) in askStock" @click="goPage('/qz?v=2')" v-if="index<2">
            <div class="user-box">
              <img :src="item.QueUserImage" class="user-avator" />
              <span class="user-name">{{item.QueTrueName? item.QueTrueName:item.QueUserID}}</span>
              <!-- <i class="level zs"></i> -->
            </div>
            <div class="ask-info">
              {{item.QuestionContent}}
            </div>
            <div class="answer-box">
              <div class="tec-box">
                <img :src="item.UserImage" class="tec-avator" />
                <span class="tec-name">{{item.TrueName}}</span>
              </div>
              <div class="audio" :class="playId==item.AnswerID ? 'active':''"  v-if="item.AnswerRecord">
                <audio :id="item.AnswerID">
                  <source :src="item.AnswerRecord" type="audio/ogg"></source>
                </audio>
              </div>
              <span class="duration" v-if="item.AnswerRecord">{{item.RecordTime}}</span>
              <div class="answer-info" v-if="item.AnswerDesc">{{item.AnswerDesc}}</div>
            </div>
            <div class="bot">
              <span class="icon-zan ">{{item.ClickCount}}</span>
              <span class="time">{{item.RegTime}}</span>
            </div>
          </li>
        </ul>
      </div>

      <!--最新情报-->
      <div class="section">
        <div class="sec-title"><span>最新情报</span></div>
        <ul class="qb-ul" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
          <li v-for="item in newsList" @click="showMore(item)" :class="{'on':item.active}">
            <div class="qb-info"><span class="time">{{item.Date | qbfilter}}</span>{{item.Abstract}}</div>
          </li>
        </ul>
      </div>
      <div class="kfBox">
        <div class="kf-bd">是否确定拨打客服热线？<p>010-87417777</p></div>
        <div class="kf-btn">
          <span @click="closePop()">取消</span>
          <span class="submit" @click="callPhone()">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    import {reqSwiper,reqLijian,reqStudio,reqDaKaWenStock,reqAppInfoMsg} from "../../api";
	import Swiper from 'swiper'
    import Vue from 'vue'
    var layerPage;
    export default {
      data () {
        return {
          token:'697B9F5FFE263D9E05B6F290B4B372E8C0062A05B66D160C',
          banner:'',
          newsList:'',
          recommend:'',
          studio:'',
          askStock:'',
          play:false,
          playId:'',
          loading:false,
          page:1
        }
      },
      mounted (){
        this.getswiper()
        this.getLijian()

        reqStudio().then(res =>{
          this.studio=res.data
          new Swiper('.banner-sfk',{
              spaceBetween: 0,
              centeredSlides: true,

              autoplay: {
                  delay: 2500,
                  disableOnInteraction: false,
              },
              pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
              },
             observer: true, // 启动动态检查器(OB/观众/观看者)
             observeParents: false // 修改swiper的父元素时，自动初始化swiper
           })

        })

        reqDaKaWenStock().then(res =>{
          this.askStock=res.data
        })

        reqAppInfoMsg('',this.page).then(res =>{
          this.newsList=res.data
        })

      },
      methods:{
          goPage(e,i){
              if(i){
                  if(this.token){
                      window.location.href=e
                  }else{
                      this.untils.toLogin()
                  }
              }else{
                  window.location.href=e
              }

          },
        getswiper(){
          reqSwiper().then(res =>{
            this.banner=res.data
            this.$nextTick(() => {
                new Swiper('#banner',{
                    direction:"horizontal",
                    speed: 100,
                    autoplay: {// 自动滑动
                        delay: 2000, //1秒切换一次
                        disableOnInteraction: false
                    },
                    pagination: {// 如果需要分页器
                        el: '.swiper-pagination'
                    },
                    observer: true, // 启动动态检查器(OB/观众/观看者)
                    observeParents: false // 修改swiper的父元素时，自动初始化swiper
                })
            })
          })
        },
        getLijian(){
          reqLijian().then(res =>{
            this.recommend=res.data
          })
        },
        loadMore(){
            this.loading = true;
            setTimeout(() => {
                this.page++
                reqAppInfoMsg('',this.page).then(res =>{
                    this.newsList=this.newsList.concat(res.data)
                })
                this.loading = false;
            }, 1000);
        },
        showMore(item){
            if(item.active){
                Vue.set(item,'active',false)
            }else{
                Vue.set(item,'active',true)
            }
        },
        kefu(){
            layerPage=layer.open({
                type:1,
                title:' ',
                area:['5.6rem','4.5rem'],
                content:$(".kfBox")
            })
        },
        callPhone(){
            layer.close(layerPage)
            layer.alert('(010)87417777',{
                title:false,
                closeBtn:false,
                skin:'callphone',
                btn:['取消','呼叫'],
                btn1:function(){

                    layer.closeAll()
                },
                btn2:function(){
                    console.log(222)
                    window.location.href="tel:(010)-87417777"
                }
            })
        },
        closePop(){
            layer.closeAll()
        }
      },
        filters:{
            qbfilter(val){
                return val.substr(11,5)
            }
        }
    }
</script>

<style scoped>
  body{background: #f0f0f0;}
  .header{
    height: 0.9rem;
    text-align: center;
    position: fixed;
    top:0;
    left: 0;
    width:100%;
    z-index: 11;
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #e1e1e1;
  }
  .header .logo{
    width: 2.5rem;
    height: 0.4rem;
    display: block;
    margin: 0 auto;
  }
  .header .news,.header .kefu,.header .sys{
    width: 0.6rem;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.18rem;
    color: #666;
  }
  .header .news{
    position: absolute;
    left: 0.3rem;
    top:0;
  }
  .header .news i{
    background: url(./images/index/icon_hm_msg.png) no-repeat;
    background-size: 100% 100%;
    width: 0.6rem;
    height: 0.6rem;
  }
  .header .kefu{
    position: absolute;
    right: 0.3rem;
    top:0;
  }
  .header .kefu i{
    background: url(./images/index/icon_hm_kefu.png) no-repeat;
    background-size: 100% 100%;
    width: 0.6rem;
    height: 0.6rem;
  }
  .header .sys{
    position: absolute;
    right: 0.3rem;
    top:0;
  }
  .header .sys i{
    background: url(./images/index/icon_saoma.png) no-repeat;
    background-size: 100% 100%;
    width: 0.6rem;
    height: 0.6rem;
  }

  .content{
    width: 100%;
    padding: 0.9rem 0 1rem;
  }
  .content .stock-box{
    padding-top: 0.2rem;
    background: #fff;
  }
  .content .stock-bd{
    margin:0 0.35rem ;
    background: url(./images/index/bg_hm_top_red.png) no-repeat center top #fff;
    background-size: 100% 1.7rem;
    height: 1.7rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    padding: 0 0.2rem;
  }
  .content .stock-box .stock-box-text{
    color: #fff;
    font-size: 0.28rem;
    line-height: 0.5rem;
  }
  .content .stock-box .stock-box-text .count1{
    font-size: 0.32rem;
    margin-bottom: 0.1rem;
  }
  .content .stock-box .stock-box-text .count1 span{
    font-weight: bold;
    font-size: 0.45rem;
    vertical-align: middle;
  }
  .content .stock-box .stock-box-btn{
    width: 1.9rem;
    height: 0.6rem;
  }


  /* 轮播 */
  .banner{
    height: 4rem;
    width: 100%;
    overflow: hidden;
  }
  .banner .swiper-slide img{
    width: 100%;
    height: 100%;
  }
  .banner .swiper-pagination-bullet-active{
    background: #fff;
  }



  /* 菜单 */
  .nav-box{
    margin: 0.2rem 0;
    padding: 0.5rem 0.3rem 0;
    background: #fff;
    overflow: auto;
  }
  .nav-box li{
    width: 25%;
    float: left;
    margin-bottom: 0.2rem;
  }
  .nav-box li a{
    display: block;
    text-align: center;
    color: #595757;
    padding-bottom: 0.15rem;
  }
  .nav-box li .icon_new{
    background: url(./images/index/icon_new.png) no-repeat;
    background-size:100% 100%;
    width: 0.38rem;
    height: 0.36rem;
    display: block;
    position: absolute;
    top:-0.1rem;
    right:-0.1rem
  }
  .nav-box li .icon_hot{
    background: url(./images/index/icon_hot.png) no-repeat;
    background-size:100% 100%;
    width: 0.24rem;
    height: 0.33rem;
    display: block;
    position: absolute;
    top:0;
    right:-0.05rem
  }
  .nav-box li .icon_jing{
    background: url(./images/index/icon_jing.png) no-repeat;
    background-size:100% 100%;
    width: 0.29rem;
    height: 0.23rem;
    display: block;
    position: absolute;
    top:0;
    right:0
  }
  .nav-box li .item-img{
    position: relative;
    width: 0.8rem;
    height: 0.8rem;
    margin: 0 auto;
  }
  .nav-box li .item-img img{
    width: 0.8rem;
  }
  .nav-box li .item-name{
    line-height: 0.5rem;
    font-size: 0.24rem;
  }


  /* 力荐 */
  .lj-box{
    margin-top: 0.2rem;
    background: #fff;
    padding: 0.2rem 0.3rem;
  }
  .lj-item{
    padding: 0.1rem 0 0.1rem 0.8rem;
    display: block;

    line-height: 0.5rem;
    font-size: 0.28rem;
    color: #333;
    border-bottom: 1px solid #ededed;
  }
  .lj-item.lj{
    background: url(./images/index/icon_sylj.png) no-repeat left 0.2rem;
    background-size: 0.67rem 0.37rem;
  }
  .lj-item:last-child{
    border: none;
  }


  /* 轮播 */
  .banner-sfk{
    height: 1.68rem;
    width: 100%;
    overflow: hidden;
  }
  .banner-sfk .swiper-slide img{
    width: 100%;
  }
  .banner-sfk .swiper-pagination-bullet-active{
    background: #fff;
  }


  /* 大咖问股 */
  .section{
    margin-top: 0.2rem;
  }
  .sec-title{
    background: #fff;
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid #c9c9c9;
  }
  .sec-title span{
    background: url(./images/index/icon_arw_rt.png) no-repeat right center;
    background-size: 0.11rem 0.21rem;
    padding-right: 0.2rem;
    font-size: 0.32rem;
  }

  .askStock li{
    background: #fff;
    margin-bottom: 0.2rem;
    padding: 0 0.3rem;
  }
  .askStock li .user-box{
    display: flex;
    flex-direction: row;
    justify-content:flex-start;
    align-items: center;
    height:1rem ;
  }
  .askStock li .user-box .user-avator{
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    margin-right: 0.1rem;
  }
  .askStock li .user-box .user-name{
    font-size: 0.24rem;
    margin-right: 0.1rem;
  }
  .askStock li .user-box .level{
    width: 0.4rem;
    height: 0.4rem;
    display: inline-block;
  }
  .askStock li .user-box .level.zs{
    background: url(./images/index/icon_zsb.png) no-repeat center center;
    background-size: 0.33rem 0.25rem;
  }
  .askStock li .user-box .level.zz{
    background: url(./images/index/icon_zzb.png) no-repeat center center;
    background-size: 0.33rem 0.27rem;
  }
  .askStock li .ask-info{
    line-height: 0.5rem;
    background: url(./images/index/icon_wen.png) no-repeat left 0.1rem;
    background-size: 0.37rem 0.28rem;
    padding-left:0.45rem ;
    font-size: 0.28rem;
    padding-bottom: 0.1rem;
    border-bottom: 1px dashed  #ccc;
  }
  .askStock li .answer-box{
    padding: 0.3rem 0 0.1rem 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    border-bottom: 1px solid #eaeaea;
  }
  .askStock li .answer-box .tec-box .tec-avator{
    width: 0.85rem;
    height: 0.85rem;
    border-radius: 50%;
    display: block;
  }
  .askStock li .answer-box .tec-box .tec-name{
    height: 0.45rem;
    line-height: 0.45rem;
    background: url(./images/index/tab_ls.png) no-repeat right center;
    background-size: 0.44rem 0.2rem;
    padding-right:0.5rem;
    font-size: 0.2rem;
    color: #4b4b4b;
  }
  .askStock li .answer-box .audio{
    background: url(./images/index/wyttt.png) no-repeat;
    background-size: 100% 100%;
    width: 2.76rem;
    height: 0.6rem;
    margin: 0.1rem 0.15rem;
  }
  .askStock li .answer-box .audio.active{
    background: url(./images/index/wyttt.gif) no-repeat;
    background-size: 100% 100%;
  }

  .askStock li .answer-box .audio.off{
    background: url(./images/index/wyttt2.png) no-repeat;
    background-size: 100% 100%;
  }
  .askStock li .answer-box .answer-info{
    padding-top: 0.05rem;
    line-height: 0.4rem;
    width: 5.2rem;
    height:1.1rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.24rem;
    color: #999;
    padding-left: 0.1rem;
  }
  .askStock li .answer-box .duration{
    line-height: 0.6rem;
    margin-top: 0.13rem;
  }
  .askStock li .bot{
    height: 0.7rem;
    line-height: 0.7rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    font-size: 0.22rem;
    color: #afafaf;
  }
  .askStock li .bot .icon-zan{
    background: url(./images/index/icon_zan-h.png) no-repeat left center;
    background-size: 0.18rem 0.14rem;
    padding-left: 0.25rem;
    display: block;
    margin-right: 0.25rem;
  }
  .askStock li .bot .icon-zan.on{
    background: url(./images/index/icon_zan.png) no-repeat left center;
    background-size: 0.18rem 0.14rem;
  }


  .qb-ul {
    margin-bottom: 0.2rem;
  }
  .qb-ul li{
    padding: 0.15rem 0.3rem 0.25rem;
    border-bottom: 1px solid #ededed;
    background: #fff;
  }
  .qb-ul li .time{
    color: #dc2a1e;
    font-weight: bold;
    margin-right: 0.05rem;
  }
  .qb-ul li .qb-info{
    line-height: 0.4rem;
    font-size: 0.26rem;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    max-height: 1.2rem;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .qb-ul li.on .qb-info{
    overflow: auto;
    max-height: none;
    display: block;
  }



  .kfBox{
    width: 5.6rem;
    height: 3.6rem;
    background: #f0f0f0;
    display: none;
  }
  .kfBox .kf-bd{
    background: url(./images/index/icon-kf.png) no-repeat center 0.3rem;
    background-size: 0.9rem 0.88rem;
    padding-top: 1.3rem;
    text-align: center;
    font-size: 0.32rem;
    line-height: 0.5rem;
  }
  .kfBox .kf-bd p{
    color: #c01639;
    font-size: 0.3rem;
    padding: 0;
    font-weight: bold;
  }
  .kfBox .kf-btn{
    padding: 0 0.3rem;
    margin-top: 0.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .kfBox .kf-btn span{
    width: 1.6rem;
    height: 0.65rem;
    line-height: 0.65rem;
    border-radius: 0.1rem;
    display: block;
    text-align: center;
    color: #fff;
    background: #acacac;
  }
  .kfBox .kf-btn span.submit{
    background: #c01639;
  }


</style>
