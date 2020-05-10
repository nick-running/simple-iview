import { NI_BACKEND } from './config'
const urls = {
  // 全局通用接口
  G_CITY_LIST: {title: '获取全部标签', url: NI_BACKEND + '/api/address/list'},

  // 随机测试接口
  R_CAT_LIST : {title: '获取随机宠物猫', url: 'https://cat-fact.herokuapp.com/facts'},
  R_DOG_LIST : {title: '获取随机宠物狗', url: 'https://dog.ceo/api/breeds/image/random'},
  R_HOLIDAY_LIST : {title: '获取节假日', url: '/api_date/holiday/next/2018-02-23'}
}
export default urls