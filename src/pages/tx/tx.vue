<template>
    <div>

      <div class="wrapper">
       
      </div>
    </div>

</template>

<script>
  import {reqStudio} from "../../api";

  export default {
   data(){
      return{
        studio:'' ,
    
      }
    },
    mounted(){
      reqStudio().then(res =>{
        this.studio=res.data
        
      })
    },

  }
</script>

<style scoped>
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

</style>
