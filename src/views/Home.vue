<template>
  <div class="home">
      234234
    <img alt="Vue logo" src="../assets/logo.png">
      testCheck: {{testCheck}}
      <br>
      checkList: {{checkList}}
      <br>
      <s-checkboxGroup v-model="checkList" :min="1" :box="true">
        <s-checkbox :label="item.key"
                    v-for="item in showcaseList" :disabled="item.disabled">
            <h4>{{item.title}}</h4>
            <p>{{item.key}}</p>
        </s-checkbox>
      </s-checkboxGroup>
      <!--<s-checkbox v-model="testCheck">2</s-checkbox>-->
      <!--<s-table-->
          <!--:url="overviewUrl"-->
          <!--:fetchParams="condTypes"-->
          <!--:columns="tableColumns"-->
          <!--:data="tableData"-->
          <!--:hasPage="false"-->
          <!--mapId="code">-->
      <!--</s-table>-->
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
      testCheck: true,
      checkList: ["reTrans", "reset" ],
      showcaseList: [
        {title: '尝试建链', key: 'tryLink'},
        {title: '建链成功', key: 'linkSucceed', disabled: true},
        {title: '建链成功率', key: 'linkSucceedRatio'},
        {title: '重置', key: 'reset'},
        {title: '连接重置率', key: 'resetRatio'},
        {title: '重传', key: 'reTrans', disabled: true},
        {title: '零窗口', key: 'zeroWindow'},
      ],
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
