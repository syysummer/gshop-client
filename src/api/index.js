/*多个接口请求函数*/
import ajax from './ajax'

// 获取当前地址
export const reqAddress = geohash => ajax('/api/position/' + geohash)

// 获取msite页面食品分类列表
export const reqCategorys = () => ajax('/api/index_category')

// 获取msite商铺列表(根据经纬度)
export const reqShops = ({latitude, longitude}) => ajax('/api/shops', {latitude, longitude})
