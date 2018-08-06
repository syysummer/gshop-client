export default {
// 获取全部的ratings的数量
  ratingsTotalCount (state) {
    return state.ratings.length
  },
// 获取满意的ratings的数量
  ratingsPositiveCount (state) {
    return state.ratings.reduce((pre, rating) => pre + (rating.rateType === 0 ? 1 : 0),0)
  },
// 计算购物车中已选食品的总数量
  cartFoodCount (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
  },
// 计算购物车中已选食品的总价钱
  cartFoodPrice (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count * food.price,0)
  }
}
