<template>
  <header id="header">
    <slot name="back"  class="back" ></slot>
    <div class="title">{{title}}</div>
    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
    name:'HeaderTop',
    props:{
      title:String
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #header{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    box-sizing: border-box;
    padding: 0 0.3rem;
    font-size:0.32rem;
    background: #fff;
    z-index: 88;
    border-bottom: 1px solid #dedede;
  }
  #header .back{
    background: url(../../common/images/icon_back.png) no-repeat center center ;
    background-size: 0.2rem 0.35rem;
    width: 0.4rem;
    height: 100%;
    display: block;
    position: absolute;
    top:0;
    left: 0.3rem;
  }
  #header~.content{
    padding-top: 0.9rem;
  }
</style>
