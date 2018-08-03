<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <span class="header_search" slot="left">
            <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
          <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(catagorys, index) in categoryArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(catagory, index) in catagorys" :key="index" >
              <div class="food_container">
                <img :src="baseImageUrl + catagory.image_url">
              </div>
              <span>{{catagory.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList />
  </section>
</template>

<script>
import {mapState} from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import HeaderTop from '../../compnents/HeaderTop/HeaderTop'
import ShopList from '../../compnents/ShopList/ShopList'
export default {
  data () {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  components: {
    HeaderTop,
    ShopList
  },
  computed: {
    ...mapState(['address','categorys']),
    categoryArr () {
      let arr = []
      let smallArr = []
      this.categorys.forEach(category => {
        if(smallArr.length === 0){
          arr.push(smallArr)
        }
        smallArr.push(category)
        if(smallArr.length === 8){
          smallArr = []
        }
      })
      return arr
    }
  },
  mounted () {
    this.$store.dispatch('getShops')
    this.$store.dispatch('getCategorys')
  },
  watch: {
    categorys () {
      this.$nextTick(() => {
        new Swiper('.swiper-container', {
          loop: true,
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .msite  //首页
    width 100%
    margin-top 45px
    .msite_nav
      bottom-border-1px(#e4e4e4)
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>
