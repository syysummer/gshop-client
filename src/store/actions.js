import {RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
} from './mutation-types'
import {reqAddress,
  reqCategorys,
  reqShops,
  reqUser,
  reqLogout,
  reqGoods,
  reqRatings,
  reqInfo
} from "../api";

export default {
 // 定义获取地址的异步action
 async getAddress ({commit, state}) {
   let {latitude, longitude} = state
   let geohash = `${latitude},${longitude}`
   let result = await reqAddress(geohash)
   if(result.code === 0){
     let address = result.data
     commit(RECEIVE_ADDRESS, {address})
   }
 },
  // 定义获取商品列表的异步action
 async getCategorys ({commit, state}) {
   let result = await reqCategorys()
   if(result.code === 0){
     let categorys = result.data
     commit(RECEIVE_CATEGORYS, {categorys})
   }
  },
  // 定义获取商家列表的异步action
 async getShops ({commit, state}) {
   let {latitude, longitude} = state
   let result = await reqShops({latitude, longitude})
   if(result.code === 0){
     let shops = result.data
     commit(RECEIVE_SHOPS, {shops})
   }
  },
  // 用户登录时,保存用户信息的同步action(已经在Login组件中发送了请求)
  saveUser ({commit}, user) {
   commit(RECEIVE_USER, {user})
  },
  // 实现自动登录的异步action
  async getUser ({commit}) {
   const result = await reqUser()
    if(result.code === 0){
      const user = result.data
      commit(RECEIVE_USER, {user})
    }
  },
  // 实现退出登录的action
  async logout ({commit}) {
   const result = await reqLogout()
   if(result.code === 0 ) {
     commit(RESET_USER)
   }
  },
  // 获取商品的异步action
  async getGoods ({commit, state}, cb) {
    let result = await reqGoods()
    if(result.code === 0){
      let goods = result.data
      commit(RECEIVE_GOODS, {goods})
      typeof cb === 'function' && cb()
    }
  },
  // 获取评价的列表异步action
  async getRatings ({commit, state}, cb) {
    let result = await reqRatings()
    if(result.code === 0){
      let ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      typeof cb === 'function' && cb()
    }
  },
  // 或取商家信息的异步action
  async getInfo ({commit, state}, cb) {
    let result = await reqInfo()
    if(result.code === 0){
      let info = result.data
      commit(RECEIVE_INFO, {info})
      typeof cb === 'function' && cb()
    }
  },
  // 定义更新食品数量的同步action
  updateFoodCount ({commit}, {food, isAdd}) {
   if(isAdd) {
     commit(INCREMENT_FOOD_COUNT, {food})
   } else {
     commit(DECREMENT_FOOD_COUNT, {food})
   }
  }
}
