import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS} from './mutation-types'
import {reqAddress, reqCategorys, reqShops} from "../api";

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
  }
}
