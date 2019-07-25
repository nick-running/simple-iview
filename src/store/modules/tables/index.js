/**
 * 表格功能的表格配置数据
 */
import current_early_warning_list from './early_warning'
import overview from './overview'
import cities from './cities'
export default {
  state: {
    current_early_warning_list,
    overview,
    cities,
    user_list: [ // 用户管理user
      {key: '_id', title: '_id', active: false},
      {key: 'username', title: '用户名'},
      {key: 'created_at', title: '创建日期'},
      // {key: 'authorityNum', title: '权限'},
    ],
    icon_list: [ // 用户管理user
      {key: '_id', title: '_id', active: false},
      {key: 'name', title: '名称'},
      {key: 'preview', title: '预览'},
      {key: 'ni_class', title: '类名'},
      {key: 'size', title: '大小'},
      {key: 'desc', title: '描述'},
    ],
    single_user_list: [ // 用户管理user 权限管理
      {key: '_id', title: '_id', active: false},
      {key: 'apiList', title: 'apiList', active: false},
      {key: 'menus', title: 'menus', active: false},
      {key: 'username', title: '用户名'},
    ],
    api_list: [ // 用户管理api
      {key: 'api_name', title: '接口'},
      {key: 'url', title: 'url地址'},
      {key: 'desc', title: '描述'},

      {key: '_id', title: '_id', active: false},
    ],
  },
  mutations: {
    // allProtocol(state, data) {
    //   state.allProtocol = data
    // }
  },
  actions: {},
  getters: {}
}
