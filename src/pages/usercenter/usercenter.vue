<template>
    <div>
      <div class="log" v-if="logged">
        <div class="header">
          <div class="user">
            <div class="user-bd">
              <img :src="userInfo.UserImage || require('./images/1.png')" class="avator" />

              <div class="user-info">
                <div class="user-name">{{userInfo.TrueName}}</div>
                <div class="user-intro">{{userInfo.UserDesc || '这个人很懒，什么都没留下'}}</div>
              </div>
            </div>
            <span class="sign"></span>
          </div>
          <div class="hd-info">
            <div class="info-item">
              <img src="./images/uc/icon-zs.png">
              <div class="item-bd"><strong>{{diamond}}</strong>钻石</div>
            </div>
            <div class="line"></div>
            <div class="info-item">
              <img src="./images/uc/icon-care.png">
              <div class="item-bd"><strong>{{userInfo.AttentionCount}}</strong>人</div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="sec-item" onclick="goPage('myPrivilege.html')">
            <div class="sec-item-hd">
              <img src="./images/uc/icon-tq.png"><span>我的特权</span>
            </div>
            <span class="more"></span>
          </div>
          <div class="pro-list">
            <div class="pro-item">
              <img src="./images/uc/icon_pro01.png" class="pro-avator" />
              <div class="pro-name">中国放心股</div>
            </div>
            <div class="pro-item">
              <img src="./images/uc/icon_pro02.png" class="pro-avator" />
              <div class="pro-name">盘口猎装</div>
            </div>
            <div class="pro-item"  onclick="goPage('privilegeMall.html')">
              <img src="./images/uc/more.png" class="pro-avator" />
              <div class="pro-name">更多特权</div>
            </div>

          </div>
          <div class="sec-item">
            <div class="sec-item-hd">
              <img src="./images/uc/list01.png"><span>风险测评</span>
            </div>
            <span class="more strong">未测评</span>
          </div>
        </div>
        <div class="section">
          <div class="sec-item" onclick="goPage('myOrder.html')">
            <div class="sec-item-hd">
              <img src="./images/uc/list02.png"><span>我的订单</span>
            </div>
            <span class="more"></span>
          </div>
          <div class="sec-item" onclick="goPage('dealPlanList.html')">
            <div class="sec-item-hd">
              <img src="./images/uc/list03.png"><span>交易计划</span>
            </div>
            <span class="more"></span>
          </div>
          <div class="sec-item" onclick="goPage('myCircle.html')">
            <div class="sec-item-hd">
              <img src="./images/uc/list04.png"><span>我的圈子</span>
            </div>
            <span class="more"></span>
          </div>
        </div>
        <div class="section">
          <div class="sec-item" onclick="goPage('logout.html.html')">
            <div class="sec-item-hd">
              <img src="./images/uc/list05.png"><span>用户注销</span>
            </div>
            <span class="more"></span>
          </div>
          <!-- <div class="sec-item">
                        <div class="sec-item-hd">
                            <img src="images/uc/list06.png"><span>邀请好友</span>
                        </div>
                        <span class="more"></span>
                    </div> -->
          <div class="sec-item"  onclick="goPage('setting.html')">
            <div class="sec-item-hd">
              <img src="./images/uc/list07.png"><span>设置</span>
            </div>
            <span class="more"></span>
          </div>
          <div class="sec-item">
            <div class="sec-item-hd">
              <img src="./images/uc/list08.png"><span>隐私政策</span>
            </div>
            <span class="more"></span>
          </div>
        </div>
        <div class="section" style="margin-bottom: 1.2rem;">
          <div class="sec-item">
            <div class="sec-item-hd">
              <img src="./images/uc/list09.png"><span>退出</span>
            </div>
            <span class="more"></span>
          </div>
        </div>

      </div>
      <div class="nolog" v-else>
        <div class="header">
          <img class="user-avator" src="../../common/images/1.png" @click="goPage('/login')" />
          <div class="logBtn" onclick="goPage('login.html')">点击登陆</div>
        </div>
        <div class="section">
          <div class="sec-item" onclick="goPage('logout.html.html')">
            <div class="sec-item-hd">
              <img src="../../pages/login/images/login/reg01.png"><span>清理缓存</span>
            </div>
            <span class="more"></span>
          </div>
          <div class="sec-item"  onclick="goPage('setting.html')">
            <div class="sec-item-hd">
              <img src="../../pages/login/images/login/reg02.png"><span>关于我们</span>
            </div>
            <span class="more"></span>
          </div>
          <div class="sec-item">
            <div class="sec-item-hd">
              <img src="../../pages/login/images/login/reg03.png"><span>免责声明</span>
            </div>
            <span class="more"></span>
          </div>
          <div class="sec-item">
            <div class="sec-item-hd">
              <img src="./images/uc/list08.png"><span>隐私政策</span>
            </div>
            <span class="more"></span>
          </div>
        </div>

      </div>

    </div>
</template>

<script>
    import layer from 'layui-layer'
    import {reqUserInfo} from '../../api'
    export default {
      data (){
        return {
          logged:false,
          userInfo:'',
          diamond:''
        }
      },
      mounted(){
        var token= this.untils.getCookie('token')
        console.log(token)
        this.diamond=this.untils.getCookie("diamonds")
        if(token){
          this.logged=true
          reqUserInfo(token).then(res =>{
            console.log(res)
            this.userInfo=res.data
          })
        }

      },
      methods:{
        goPage(u){
          this.$router.push(u)
        }
      }
    }
</script>

<style scoped>
  .header{
    background: url(./images/uc/hdBg.png) no-repeat center bottom ;
    background-size: 100% 100%;
    height: 3.2rem;
    position: relative;
    padding: 1rem 0.3rem 0;
    margin-bottom: 1rem;
  }
  .header .user{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 1rem;
  }

  .header .user .user-bd .avator{
    width: 1rem;
    height: 1rem;
    margin-right: 0.1rem;
    float: left;
    border-radius: 50%;
  }
  .header .user .user-bd .user-info{
    margin-left: 1.1rem;
  }
  .header .user .user-bd .user-info .user-name{
    line-height: 0.5rem;
    font-size: 0.4rem;
    color: #fff;
  }
  .header .user .user-bd .user-info .user-intro{
    overflow: hidden;
    height: 0.4rem;
    line-height: 0.4rem;
    color: #fff;
    font-size: 0.24rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 3.7rem;
  }
  .header .user .sign{
    width: 2rem ;
    height: 0.75rem;
    background: url(./images/uc/icon-sign.png) no-repeat center center;
    background-size: 2rem 0.75rem;
    display: block;
    position: absolute;
    top:1.2rem;
    right:0.3rem
  }

  .hd-info{
    background: #fff;
    border-radius: 0.1rem;
    position: absolute;
    bottom:-0.8rem;
    left: 0.3rem;
    right:0.3rem;
    z-index: 15;
    box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.2) ;
    height: 1.6rem;
    margin: 0 0.3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .hd-info .info-item{
    text-align: center;
    color: #999999;
    font-size:0.24rem;
  }
  .hd-info .line{
    width: 1px;
    height: 0.6rem;
    background: #ececec;
  }
  .hd-info .info-item img{
    width: 0.55rem;
    display: block;
    margin: 0 auto 0.05rem;
  }
  .hd-info .info-item strong{
    font-size: 0.36rem;
    color: #333333;
    margin-right: 3px;
    vertical-align: middle
  }


  .section{
    background: #fff;
    margin-bottom: 0.2rem;
  }
  .section .sec-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 0.9rem;
    align-items: center;
    padding: 0 0.3rem;

    border-bottom: 1px solid #dedede;
  }
  .section .sec-item .sec-item-hd{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 0.9rem;
    align-items: center;
    font-size: 0.26rem;
    font-weight: bold;
  }
  .section .sec-item .sec-item-hd img{
    margin-right: 0.1rem;
    max-width: 0.28rem;
  }
  .section .sec-item .more{
    background: url(./images/uc/icon-rt.png) no-repeat right center;
    background-size: 0.13rem 0.24rem;
    padding-right: 0.2rem;
    display: block;
    min-width: 1rem;
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.24rem;
  }
  .section .sec-item .more.strong{
    color: #999;
    font-weight: bold;
  }

  .pro-list{
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: center;
    padding:0.2rem 0.3rem;
    line-height: 0.5rem;
    text-align: center;
    font-size: 0.2rem;
    color: #666;
    border-bottom: 1px solid #dedede;
  }
  .pro-list .pro-item{
    flex:1;
  }
  .pro-list .pro-item .pro-avator{
    width: 0.7rem;
    height: 0.7rem;
    display: block;
    margin: 0 auto 0.05rem;
  }



  .nolog .header{
    margin-bottom: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    font-size: 0.32rem;
  }
  .nolog .header .user-avator{
    width: 1rem;
    height: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 0.3rem;
  }

</style>
