export default [ // 预警列表 当前|历史
  {key: 'alarmTime', title: '时间', active: true},
  // {key: 'level', title: '级别', active: true},
  {
    title: '级别',
    key: 'level',
    active: true,
    render: (h, params) => {
      return h('div', [
        h('Icon', {
          props: {
            type: 'md-person'
          }
        }),
        h('strong', params.row.level+'----')
      ]);
    }
  },
  {key: 'content', title: '内容', active: true},
  {key: 'triggerRule', title: '触发规则', active: true},
  {key: 'operation', title: '操作', active: true},
  
  {key: 'alarmId', title: 'alarmId', active: false},
]