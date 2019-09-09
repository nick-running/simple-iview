<template>
    <div class="Table">
        <h1>表格</h1>
	    <Row>
		    <i-col span="6">
			    <div>
				    <div>activeId: {{activeId}}</div>
				    <div>activeData: {{activeData}}</div>
			    </div>
		    </i-col>
		    <i-col span="18">
			    <s-table
					    :url="overviewUrl"
					    :fetchParams="condTypes"
					    :columns="tableColumns"
					    :data="tableData"
					    :sortable="true"
					    :option="tableOption"
					    :hasPage="false"
					    @on-row-change="handleRowChanged"
					    mapId="code">
			    </s-table>
		    </i-col>
	    </Row>
    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: "Table",
    data() {
      return {
        overviewUrl: this.$insightUrls.G_CITY_LIST,
        condTypes: {
          businessName: '',
          ip: '',
        },
        tableOption: {
          maxHeight: 600
        },
        tableColumns: [],
        tableData: [],
        activeData: null,
        activeId: null,
      }
    },
    methods: {
      handleRowChanged({data, activeId}){
        console.log('...handleRowChanged')
        this.activeData = data
        this.activeId = activeId
      }
    },
    computed: {
      ...mapState({
        cities: state => state.tables.cities.cities,
      }),
    },
    mounted() {
    },
    created(){
      this.tableColumns = this.cities
    },
  }
</script>

<style scoped>

</style>