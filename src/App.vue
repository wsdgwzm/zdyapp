<template>
  <div id="app">

    <router-view/>
    <Footer v-show="$route.meta.showFooter" />
  </div>
</template>

<script>

  import Footer from './components/footer/footer'
  //import { reqSwiper } from './api'
export default {
  name: 'App',
  mounted () {

  },
  components:{
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
