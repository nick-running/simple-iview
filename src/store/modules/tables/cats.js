export default {
  cities: [
    {key: 'type', title: '类型', sortable: true},
    {key: 'text', title: '描述'},
    // {key: 'updateAt', title: '更新时间'},
    // {key: 'createAt', title: '创建时间'},
    // {key: 'status', title: '状态'},
    {key: 'user', title: '用户'},
    {key: 'pchilds', title: '省份', active: true,
      render: (h, params) => {
        if(params.row.pchilds&&params.row.pchilds.length>1){
          return (
            <div>
              <Poptip placement="right" width="400" transfer={true}>
                <Button>{params.row.name}</Button>
                <div class="city-table" slot="content">
                  <s-table columns={[
                    {key: 'code', title: '代码', sortable: true},
                    {key: 'name', title: '省份', sortable: true},
                  ]} data={params.row.pchilds} option={{maxHeight: 450}}
                           hasPage={false} mapId="code"/>
                </div>
              </Poptip>
            </div>
          )
        }else{
          return (
            <div>{params.row.name}</div>
          )
        }
      }
    },
  ]
}