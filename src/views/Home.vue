<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
      <s-table
          :url="overviewUrl"
          :fetchParams="condTypes"
          :columns="tableColumns"
          :data="tableData"
          :hasPage="false"
          mapId="code">
      </s-table>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data(){
    return {
      overviewUrl: this.$insightUrls.G_CITY_LIST,
      condTypes: {
        businessName: '',
        ip: '',
      },
      tableColumns: [
        {key: 'code', title: '代码', sortable: true},
        {key: 'name', title: '省份'},
        {key: 'pchilds', title: '省份', active: true,
          render: (h, params) => {
              if(params.row.pchilds.length>1){
                return (
                  <div>
                    <Poptip placement="right" width="400" transfer={true}>
                      <Button>{params.row.name}</Button>
                      <div class="api" slot="content">
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
      ],
      tableData: [
        {code: 1002, name: '成都'},
        {code: 1003, name: '北京'},
        {code: 1004, name: '武汉'},
        {code: 1005, name: '重庆'},
      ]
    }
  }
}
</script>
