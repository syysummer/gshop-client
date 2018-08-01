<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFoot"/>
  </div>
</template>

<script>
import FooterGuide from './compnents/FooterGuide/FooterGuide'
export default {
 components: {
   FooterGuide
 },
  mounted () {
   this.$store.dispatch('getAddress')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
