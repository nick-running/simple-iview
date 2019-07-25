import ip_list from './ip_list'
import key_business_list from './key_business_list'
export default {
  ip_list,
  key_business_list,
  overview: [
    {key: 'alarmTime', title: '字节数', active: true, sortable: true},
    {key: 'level', title: '包数', active: true},
    {key: 'level', title: 'TCP连接数', active: true},
    {key: 'processState', title: '处理状态', active: true, sortable: true},
    {key: 'level', title: '关键业务数', active: true}
  ]
}