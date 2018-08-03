import Mock from 'mockjs'
import data from './data.json'

// 返回goods的接口
Mock.mock( '/goods', {code: 0,data: data.goods})

// 返回ratings信息
Mock.mock( '/ratings', {code: 0,data: data.ratings})

// 返回info信息
Mock.mock( '/info', {code: 0,data: data.info})
