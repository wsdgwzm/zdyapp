<template>
  <div class="footer">
    <a href="javascript:;" @click="goPage('/index')" class="footer-item nav01" :class="{ active : '/index'===$route.path}"><i></i>首页</a>
    <a href="javascript:;" @click="goPage('/tx')" class="footer-item nav02" :class="{ active : '/tx'===$route.path}"><i><img src="./images/hot.png" /></i>特训</a>
    <a href="javascript:;" @click="goPage('/live')" class="footer-item center"><div class="md_bg"><img src="./images/nav-center.png" /></div></a>
    <a href="javascript:;" @click="goPage('/qz')" class="footer-item nav03" :class="{ active : '/qz'===$route.path}"><i></i>圈子</a>
    <a href="javascript:;" @click="goPage('/userCenter')" class="footer-item nav04" :class="{ active : '/userCenter'===$route.path}"><i></i>个人</a>
  </div>
</template>

<script>
    export default {
      name: 'Footer',
      methods:{
        goPage(path){
          this.$router.replace(path)
        }
      }
    }
</script>

<style scoped>

  .footer{
    height: 1rem;
    width: 100%;
    border-top:1px solid #e0e0e0;
    background: #fff;
    position: fixed;
    bottom:0;
    left:0;
    z-index: 15;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
  }
  .footer .footer-item{
    display: flex;
    flex: 1;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    align-content: center;
    font-size: 0.22rem;
    color: #7e7e7e;
    position: relative;
  }
  .footer .footer-item.active{
    color: #f11d4a;
  }
  .footer .footer-item.center{
    width: 2.7rem;
  }
  .footer .footer-item.center .md_bg{
    background: url(images/bg_main_bottom_bar.png) no-repeat center top;
    background-size: 2.7rem 1.5rem;
    width:100%;
    height: 1.35rem;
    position: absolute;
    top:-0.5rem;
    left: 0;
    text-align: center;
    padding-top: 0.2rem;
  }
  .footer .footer-item.center .md_bg img{
    width: 1.2rem;
  }
  .footer .footer-item i{
    width: 0.5rem;
    height: 0.5rem;
    display: block;
    position: relative;
  }
  .footer .footer-item i img{
    width: 0.25rem;
    height: 0.15rem;
    position: absolute;
    top:0;
    right:-0.1rem
  }

  .footer .footer-item.nav01 i{
    background: url(images/home_normal.png) no-repeat;
    background-size: 100% 100%;
  }
  .footer .footer-item.nav02 i{
    background: url(images/teach_normal.png) no-repeat center center;
    background-size: 0.35rem 0.35rem;
  }
  .footer .footer-item.nav03 i{
    background: url(images/stock_normal.png) no-repeat ;
    background-size: 100% 100%;
  }
  .footer .footer-item.nav04 i{
    background: url(images/mine_normal.png) no-repeat ;
    background-size: 100% 100%;
  }
  .footer .footer-item.nav01.active i{
    background: url(images/home_pressed.png) no-repeat ;
    background-size: 100% 100%;
  }
  .footer .footer-item.nav02.active i{
    background: url(images/teach_pressed.png) no-repeat center center;
    background-size: 0.35rem 0.35rem;
  }
  .footer .footer-item.nav03.active i{
    background: url(images/stock_pressed.png) no-repeat ;
    background-size: 100% 100%;
  }
  .footer .footer-item.nav04.active i{
    background: url(images/mine_pressed.png) no-repeat ;
    background-size: 100% 100%;
  }

</style>
