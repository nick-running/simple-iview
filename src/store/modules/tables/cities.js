export default {
  cities: [
    {key: 'code', title: '代码', sortable: true},
    {key: 'name', title: '省份'},
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
                  ]} data={params.row.pchilds}
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