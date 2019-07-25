// const isProd = true // 是否产品模式
const isProd = false

const isMockServer = false // 是否是模拟服务
// const isMockServer = true // 是否模拟服务地址
const isTestBackServer = false // 是否测试地址，开启后代理测试地址

let NI_BACKEND, PREFIX_AUTH, M_BACKEND
const MD_PROXY_PREFIX = '/api/'
const MD_PROXY_TEST_PREFIX = '/api_test_server/'
const MD_PROXY_MATRIX_PREFIX = '/apx_m/'
if(isProd) {
  PREFIX_AUTH = '/'
  NI_BACKEND = `${MD_PROXY_PREFIX}ICSinSinght/`
  M_BACKEND = `${MD_PROXY_MATRIX_PREFIX}matrix/`
}else {
  PREFIX_AUTH = '/api_auth/'
  let backServerScheme = ''
  if (isMockServer) {
    backServerScheme = `/api_mock/ICSinSinght/`
  }else if (!isTestBackServer) {
    backServerScheme = `${MD_PROXY_PREFIX}`
  }else {
    PREFIX_AUTH = '/api_auth_server/'
    backServerScheme = `${MD_PROXY_TEST_PREFIX}ICSinSinght/`
  }
  // backServerScheme = isTestBackServer?'asdfa':'asdf';
  // NI_BACKEND = isMockServer?`/api_mock/`:`${MD_PROXY_PREFIX}ICSinSinght/`
  NI_BACKEND = backServerScheme
  M_BACKEND = `${MD_PROXY_MATRIX_PREFIX}matrix/`
}
console.log('PREFIX_AUTH is: ', JSON.stringify(PREFIX_AUTH))
// console.log('NI_BACKEND is: ', JSON.stringify(NI_BACKEND))
export {NI_BACKEND, M_BACKEND, PREFIX_AUTH}