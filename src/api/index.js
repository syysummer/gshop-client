/*多个接口请求函数*/
import ajax from './ajax'

// 获取当前地址
export const reqAddress = geohash => ajax('/api/position/' + geohash)

// 获取msite页面食品分类列表
export const reqCategorys = () => ajax('/api/index_category')

// 获取msite商铺列表(根据经纬度)
export const reqShops = ({latitude, longitude}) => ajax('/api/shops', {latitude, longitude})

//请求手机验证码
export const reqSmsCode = (phone) => ajax('/api/sendcode',{phone})

//请求手机登录
export const reqLoginSms = ({phone, code}) => ajax('/api/login_sms', {phone, code}, 'POST')

//请求密码登录
export const reqLoginPwd = ({name, pwd, captcha}) => ajax('/api/login_pwd',{name, pwd, captcha}, 'POST')

//实现自动登录效果
export const reqUser = () => ajax('/api/userinfo')

//实现退出登录
export const reqLogout = () => ajax('/api/logout')

//获取goods
export const reqGoods = () => ajax('/goods')

//获取ratings
export const reqRatings = () => ajax('/ratings')

//获取info
export const reqInfo = () => ajax('/info')

