import { PREFIX_AUTH } from './config'
// 中间服务管理
const urls =  {
  USER_LOGIN: {title: '登录', url: PREFIX_AUTH + 'login'},
  GET_INFO: {title: '获取用户权限信息', url: PREFIX_AUTH + 'getInfo'},
  
  ALL_USER: {title: '获取用户管理列表', url: PREFIX_AUTH + 'getUserList'},
  ADD_USER: {title: '新增用户', url: PREFIX_AUTH + 'addUser'},
  UPDATE_USER: {title: '更新用户', url: PREFIX_AUTH + 'updateUser'},
  CHANGE_PWD: {title: '修改密码', url: PREFIX_AUTH + 'changePwd'},
  DELETE_USER: {title: '删除用户', url: PREFIX_AUTH + 'deleteUser'},
  
  UPDATE_USER_PERMISSION: {title: '权限管理', url: PREFIX_AUTH + 'updateUserPermission'},
  
  All_API: {title: '获取接口管理', url: PREFIX_AUTH + 'getApiList'},
  ADD_API: {title: '新增接口', url: PREFIX_AUTH + 'addApi'},
  UPDATE_API: {title: '更新接口', url: PREFIX_AUTH + 'updateApi'},
  DELETE_API: {title: '删除接口', url: PREFIX_AUTH + 'deleteApi'},
  
  ALL_MENU: {title: '获取菜单', url: PREFIX_AUTH + 'getMenuList'},
  ADD_MENU: {title: '新增菜单', url: PREFIX_AUTH + 'addMenu'},
  UPDATE_MENU: {title: '更新菜单', url: PREFIX_AUTH + 'updateMenu'},
  DELETE_MENU: {title: '删除菜单', url: PREFIX_AUTH + 'deleteMenu'},
  
  ALL_ICON: {title: '获取图标', url: PREFIX_AUTH + 'getIconList'},
  ADD_ICON: {title: '新增图标', url: PREFIX_AUTH + 'addIcon'},
  UPDATE_ICON: {title: '更新图标', url: PREFIX_AUTH + 'updateIcon'},
  DELETE_ICON: {title: '删除图标', url: PREFIX_AUTH + 'deleteIcon'},
}
export default urls