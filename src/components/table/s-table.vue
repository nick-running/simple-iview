<template>
    <div class="s-table">
        <Table @on-row-click="onRowSelect"
               @on-sort-change="handleSortChange"
               :row-class-name="rowClassName"
               :loading="mLoading"
               :columns="mColumns"
               :max-height="option.maxHeight"
               :data="mData">
            <loading slot="loading"></loading>
        </Table>
        <Page v-if="hasPage" @on-change="handlePageChange" :page-size="page.pageSize" :total="page.total"
              show-elevator size="small" style="margin-top: 20px;text-align: center;"></Page>
    </div>
</template>

<script>
  import {assignIn, isEqual} from 'lodash'
  export default {
    name: "s-table",
    props: {
      option: {
        type: Object,
        default: ()=>{return {}}
      },
      hasPage: {
        type: Boolean,
        default: true
      },
      url: {
        type: Object
      },
      mapId: {
        type: String
      },
      fetchParams: {
        type: Object,
      },
      fetchVersion: {
        type: Number,
        default: 0
      },
      loading: {
        type: Boolean,
        default: false
      },
      columns: {
        type: Array,
        default: ()=>[]
      },
      data: {
        type: Array,
        default: ()=>[]
      },
      activeId: {
        type: Number,
        default: -1
      }
    },
    data() {
      return {
        mLoading: this.loading,
        mColumns: [],
        mData: this.data,
        mActiveId: this.activeId,
        mFetchParams: this.fetchParams,
        sort: {
          enable: false,
          key: null,
          order: 'normal'
        },
        page: {
          current: 1, // 当前页码
          pageSize: 10, // 每页条数
          total: 0, // 数据总数
        },
      }
    },
    created(){
      let columns = []
      this.columns.forEach(d=>{
        // let row
        if (d.active !== false) {
            // row = d
            columns.push(d)
        }
      })
      // console.log('rows is: ', JSON.stringify(columns))
      this.mColumns = columns
    },
    methods: {
      onRowSelect(row){
        this.mActiveId = row[this.mapId]
        this.$emit('on-row-select', row)
      },
      rowClassName(row){
        return this.mActiveId===row[this.mapId]?'table-active-row':''
      },
      handlePageChange(page){
        this.page.current = page
        this.fetchData()
      },
      handleSortChange({column, key, order}){ // order: asc||desc||normal
        this.sort.enable = order!=='normal'
        this.sort.key = key
        this.sort.order = order
        this.fetchData()
      },
      fetchData(){
        if(!this.url) return
        const _this = this
        _this.mLoading = !this.mLoading;
        let params = assignIn({}, this.mFetchParams)
        if (this.sort.enable) {
          // _this.$set(_this.mFetchParams, 'sort', this.sort)
          params.sort = this.sort
        }
        _this.asyncGet({
          url: _this.url,
          data: params,
          showAutoMsg: true
        }).then(data=>{
          _this.mData = data
          _this.page.total = data.page.total
          _this.renderTable()
        }).catch(err=>{
          _this.mLoading = false
        });
      },
      renderTable() {
        const _this = this
        _this.mLoading = false
        let colList = []
        if(_this.mData.length) {
          // colList = _this.mData.map((item) => {
          //   let ret = {}
          //   _this.tableData.keyFilter.forEach(n=> {
          //     // if (n.key === 'addr') {
          //     //   console.log('item is: ', JSON.stringify(item))
          //     //   ret[n.key] = item.content.join(' ')
          //     // }else{
          //     ret[n.key] = item[n.key]
          //     // }
          //   })
          //   return ret
          // })
        }
        // _this.tableData.data = colList
      },
    },
    computed: {

    },
    watch: {
      fetchVersion(v){
        this.fetchData();
      },
      fetchParams(data, oData) {
        if (!isEqual(data, oData)) {
          this.fetchData();
        }
      }
    },
    mounted() {
      if (this.url) {
        this.fetchData();
      }
    }
  }
</script>

<style scoped>

</style>