<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="menuScroll">
          <li class="menu-item" v-for="(good, index) in goods" :key="index" @click="clickItem(index)"
              :class="{current: currentIndex === index}">
            <span class="text bottom-border-1px">
               <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="scrollUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click='showFood(food)'>
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food = 'food'/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import CartControl from '../../../compnents/CartControl/CartControl'
import Food from '../../../compnents/Food/Food'
import ShopCart from '../../../compnents/ShopCart/ShopCart'
export default {
 data () {
   return {
     scrollY: 0,
     tops: [],
     food: {},
     isNeedScroll: true
   }
 },
 mounted () {
   this.$store.dispatch('getGoods', () => {
     this.$nextTick(() => {
       this._initTops()
       this._initScrollY()
     })
   })
   // 创建滚动对象的代码的时机为页面更新显示之后.
   // 但是better-scroll做了优化,在mounted中也可以实现相应的效果
 },
 computed: {
   ...mapState(['goods']),
   currentIndex () { //通过右边列表滚动的距离计算当期的currentIndex
    let {scrollY, tops} = this
    let index = tops.findIndex((top, index) => scrollY >= top && scrollY < tops[index+1])
    this._initMenuScroll(index)
    return index
   }
 },
  methods: {
    _initTops () {
      let lis = this.$refs.scrollUl.getElementsByClassName('food-list-hook')
      // let lis = this.$refs.scrollUl.children // 可以获取所有的子元素节点
      let tops = []
      let top = 0
      tops.push(top)
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      this.tops = tops
    },
    _initScrollY () {
      // 创建左边菜单的滚动对象
      this.scrollMenu = new BScroll('.menu-wrapper', {
        click: true
      })

      // 创建右边的滚动对象
        this.scrollFood = new BScroll('.foods-wrapper', {
          probeType: 2,
          click: true
        })

      // 监听右边的滚动事件
      this.scrollFood.on('scroll',({x, y}) => {
        this.isNeedScroll = true
        this.scrollY = Math.abs(y)
      })

    // 监听滑动停止,相应左边的currentIndex对应相应的index
    //   this.scrollFood.on('scrollEnd',({x, y}) => {
    //     this.scrollY = Math.abs(y)
    //   })
    },
    _initMenuScroll (index) {
      // if(this.scrollMenu){
      //   // 自定义改善左边联动代码
      //   // let lis = this.$refs.menuScroll.getElementsByClassName('menu-item')
      //   let lis = this.$refs.menuScroll.children
      //   this.scrollMenu.scrollToElement(lis[index], 500)
      // }

      if(this.scrollMenu && this.isNeedScroll) {
        // 自定义改善左边联动代码
        let lis = this.$refs.menuScroll.getElementsByClassName('menu-item')
        let height = lis[0].clientHeight
        switch (index) {
          case 7:
            this.scrollMenu.scrollTo(0, -height, 500)
            return
          case 8:
            this.scrollMenu.scrollTo(0, -height * 2, 500)
            return
          default :
            this.scrollMenu.scrollTo(0, 0, 500)
        }
        // if (index === 7) {
        //   this.scrollMenu.scrollTo(0, -height, 500)
        // } else if (index === 8) {
        //   this.scrollMenu.scrollTo(0, -height * 2, 500)
        // } else {
        //   this.scrollMenu.scrollTo(0, 0, 500)
        // }
      }
    },
    // 点击左边分类时,右边相应的进行联动
    clickItem (index) {
      let top = this.tops[index]
      this.scrollFood.scrollTo(0, -top, 200)
      this.scrollY = top
      this.isNeedScroll = false
    },
    showFood (food) {
      this.food = food
      this.$refs.food.toggleShow()
    }
    },
  components: {
    CartControl,
    Food,
    ShopCart
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 248px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
