import {RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
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
 async getAddress ({commit, state}) {
   let {latitude, longitude} = state
   let geohash = `${latitude},${longitude}`
   let result = await reqAddress(geohash)
   if(result.code === 0){
     let address = result.data
     commit(RECEIVE_ADDRESS, {address})
   }
 },
 async getCategorys ({commit, state}) {
   let result = await reqCategorys()
   if(result.code === 0){
     let categorys = result.data
     commit(RECEIVE_CATEGORYS, {categorys})
   }
  },
 async getShops ({commit, state}) {
   let {latitude, longitude} = state
   let result = await reqShops({latitude, longitude})
   if(result.code === 0){
     let shops = result.data
     commit(RECEIVE_SHOPS, {shops})
   }
  },
  saveUser ({commit}, user) {
   commit(RECEIVE_USER, {user})
  },
  async getUser ({commit}) {
   const result = await reqUser()
    if(result.code === 0){
      const user = result.data
      commit(RECEIVE_USER, {user})
    }
  },
  async logout ({commit}) {
   const result = await reqLogout()
   if(result.code === 0 ) {
     commit(RESET_USER)
   }
  },
  async getGoods ({commit, state}, cb) {
    let result = await reqGoods()
    if(result.code === 0){
      let goods = result.data
      commit(RECEIVE_GOODS, {goods})
      typeof cb === 'function' && cb()
    }
  },
  async getRatings ({commit, state}) {
    let result = await reqRatings()
    if(result.code === 0){
      let ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },
  async getInfo ({commit, state}) {
    let result = await reqInfo()
    if(result.code === 0){
      let info = result.data
      commit(RECEIVE_INFO, {info})
    }
  }
}
