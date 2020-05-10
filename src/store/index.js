import Vue from 'vue'
import Vuex from 'vuex'

import iView from 'view-design';
import axios from 'axios'
import CONSTANTS from '@/api/constants'
Vue.use(Vuex)
import tables from './modules/tables/index'
import charts from './modules/charts'

export default new Vuex.Store({
  modules: {
    tables,
    charts
  },
  state: {

  },
  mutations: {

  },
  actions: {
    asyncGetData({dispatch}, params){
      return dispatch('asyncFetchData', {fetchType: CONSTANTS.FETCH_TYPE.get, ...params})
    },
    asyncPostData({dispatch}, params){
      return dispatch('asyncFetchData', {fetchType: CONSTANTS.FETCH_TYPE.post, ...params})
    },
    /**
     *
     * @param context
     * @param showAutoMsg 如果配置为true，能根据请求方法智能提示
     * @returns {Promise<any>}
     */
    asyncFetchData({commit}, params){ // 向后台请求操作数据
      // console.log('asyncFetchData...')
      // console.log(`params is: ${JSON.stringify(params)}`)`
      // console.log(`params.url.url is: ${JSON.stringify(params.url.url)}`)
      return new Promise((resolve, reject) => {
        let msg = ''
        axios({
          method: 'post',
          url: params.url.url,
          data: params.data,
        }).then((resp)=>{
          // console.log('resp is: ', JSON.stringify(resp))
          if(!resp.data.errno) {
            resolve(resp.data&&resp.data.data)
          }else{
            msg = resp.data.errmsg
            if (!msg) {
              // if (params.url.title) {
              //   msg = params.fetchType.name+ params.url.title+'失败'
              // }else{
              //   msg = params.fetchType.name+params.url+'失败'
              // }
            }
            if (params.showAutoMsg) {
              // iView.Notice.warning({desc: msg, duration: 0});
              iView.Message.warning(msg)
              // commit('toggleNotice', {desc: msg})
            }else{
              reject(msg)
            }
          }
        }).catch(function (err) {
          // console.log('err.response.data: ', err.response.data)
          // console.log('err.response.status: ', err.response.status)
          // console.log('err.response.headers: ', err.response.headers)
          console.log(`err is: ${JSON.stringify(err)}`)
          if(err.response&&err.response.status===403){
            msg = `没有${params.url.title}的权限`
          }else{
            // msg = params.fetchType.name+ params.url.title+'失败'
            if (params.url.title) {
              msg = params.url.title+'失败';
            }else{
              msg = params.url+'失败';
            }
          }
          if (params.showAutoMsg) {
            // iView.Notice.warning({desc: msg, duration: 0});
            // commit('toggleNotice', {desc: msg})
            iView.Message.warning(msg)
          }
          reject(msg)
        })
      
      })
    }

  }
})
