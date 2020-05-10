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
        overviewUrl: this.$insightUrls.R_HOLIDAY_LIST,
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
        header: state => state.tables.dogs.dogs,
      }),
    },
    mounted() {
    },
    created(){
      this.tableColumns = this.header
    },
  }
</script>

<style scoped>

</style>