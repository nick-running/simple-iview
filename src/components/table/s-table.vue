<template>
    <div class="s-table">
        <Table @on-row-click="onRowSelect"
               @on-sort-change="handleSortChange"
               :row-class-name="rowClassName"
               :loading="mLoading"
               :columns="mColumns"
               :max-height="option.maxHeight"
	       :height="height"
               :data="mData">
            <loading slot="loading"></loading>
        </Table>
        <Page v-if="hasPage" @on-change="handlePageChange"
              :current="page.current"
              :page-size="page.size"
              :total="page.total"
              show-elevator size="small" style="margin-top: 20px;text-align: center;"></Page>
    </div>
</template>

<script>
  import {find, assignIn, isEqual, cloneDeep} from 'lodash'
  import { mapState } from 'vuex'
  export default {
    name: "s-table",
    props: {
      height: {
        type: [Number, String],
      },
      option: {
        type: Object,
        default: ()=>{return {}}
      },
      hasPage: {
        type: Boolean,
        default: true
      },
      sortable: {
        type: Boolean,
        default: false
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
      manualFetch: { // 为true后需要自动控制fetchVersion来请求，false fetchParams同样请求
        type: Boolean,
        default: false
      },
      fetchVersion: {
        type: Number,
        default: 0
      },
      silentFetchVersion: {
        type: Number,
        default: 0
      },
      fetchPageVersion: {
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
        type: [Number, String],
        default: null
      }
    },
    data() {
      return {
        mLoading: this.loading,
        mColumns: this.columns,
        mData: this.data,
        mActiveId: this.activeId,
        mFetchParams: this.fetchParams,
        keyFilter: [],
        header: [],
        sort: {
          // enable: false,
          key: null,
          direction: 'normal'
        },
        page: {
          resetCurrent: false,
          current: 1, // 当前页码
          pageSize: 10, // 每页条数
          total: 0, // 数据总数
        },
      }
    },
    methods: {
      initTable(){
        const _this = this
        this.columns.forEach(item=>{
          // let header = {title: item.title, key: item.key, active: item.active}
          // if(item.width){header.width = item.width}
          // if(item.minWidth){header.minWidth = item.minWidth}
          // _this.keyFilter.push(header)
          if (_this.sortable&&item.sortType) {
            _this.sort.key = item.key
          }
          _this.keyFilter.push(item);
          if(item.active!==false) _this.header.push(item)
        })
      },
      onRowSelect(row){
        if(!this.mapId) return
        this.mActiveId = row[this.mapId]
        this.$emit('on-row-select', row)
      },
      rowClassName(row){
        if(!this.mapId) return ''
        return this.mActiveId===row[this.mapId]?'table-active-row':''
      },
      handlePageChange(page){
        this.page.current = page
        this.fetchData()
        if(document.querySelector('.ivu-table-overflowY')){
            document.querySelector('.ivu-table-overflowY').scroll(0, 0)
        }
      },
      handleSortChange({column, key, order}){ // order: asc||desc||normal
        // console.log('handleSortChange...')
        // console.log('column is: ', JSON.stringify(column))
        // console.log('key is: ', JSON.stringify(key))
        // console.log('order is: ', JSON.stringify(order))
        // this.sort.enable = order!=='normal'
        this.sort.key = key
        this.sort.direction = order
        this.fetchData()
      },
      fetchData(silentFetch){
        const _this = this
        if (!silentFetch) {
          _this.mLoading = !this.mLoading;
        }
        let params = assignIn({}, this.mFetchParams)
        if (this.hasPage) {
          params.page = this.page
        }
        if (this.sortable) {
          params.sort = this.sort
        }
        if (this.sortable) {
          // _this.$set(_this.mFetchParams, 'sort', this.sort)
          params.sort = this.sort;
        }
        // let beforeCollector = this.collector
        let beforeParams = cloneDeep(params)
        _this.asyncGet({
          url: _this.url,
          data: params,
          showAutoMsg: true
        }).then(data=>{
          if (isEqual(beforeParams, params)) {
            _this.mLoading = false
            _this.mData = data
            _this.page.total = data.page.total
            _this.renderTable()
            _this.$emit('on-async-data-loaded', {data: data, activeData: _this.activeData})
          }
        }).catch(err=>{
          _this.mLoading = false
        });
      },
      renderTable() {
        const _this = this
        let colList = []
        // if(_this.mData.length) {
        //   colList = _this.mData.map((item) => {
        //     let ret = {}
        //     _this.keyFilter.forEach(n=> {
        //       // if (n.key === 'addr') {
        //       //   console.log('item is: ', JSON.stringify(item))
        //       //   ret[n.key] = item.content.join(' ')
        //       // }else{
        //       ret[n.key] = item[n.key]
        //       // }
        //     })
        //     return ret
        //   })
        // }
        // _this.mData = colList

        _this.mData = _this.mData.map(item=>{
          let ret = {}
          _this.keyFilter.forEach(d=>{
            if (d.processor) {
              ret[d.key] = d.processor(item[d.key], d.statObj);
            }else if(d.feature){
              if (d.feature.key === 'PCT') {
                ret[d.key] = (total ? (item[d.feature.value] / total * 100).toFixed(2) : 0) + '%'
              }
            }else {
              ret[d.key] = item[d.key]
            }
          })
          return ret
        })
      },
    },
    computed: {
      activeData(){
        let {mapId, mActiveId} = this
        if(!this.mapId) return
        return find(this.mData, n=>n[mapId]===mActiveId)
      },
      ...mapState({
        // doughnutOption: state => state.charts.option.doughnut,
        // collector: state => state.collectors.collector,
        // itemColors: state => state.charts.itemColors,
      }),
    },
    watch: {
      activeId(id){
        this.mActiveId = id
      },
      'activeData'(data){
        this.$emit('on-row-change', {data, activeId: this.mActiveId})
      },
      fetchVersion(v){
        if (this.page.resetCurrent) {
          this.page.current = 1
          this.page.resetCurrent = false
        }
        this.fetchData();
      },
      silentFetchVersion(v){
        this.fetchData(true)
      },
      fetchPageVersion(v){
        this.page.current = 1
        this.fetchData()
      },
      fetchParams(data, oData) {
        this.mFetchParams = data
        if(this.hasPage) this.page.resetCurrent = true
        if(this.manualFetch) return
        if (!isEqual(data, oData)) {
          this.fetchData();
        }
      }
    },
    mounted() {
      this.initTable()
      if (this.url&&!this.manualFetch) {
        this.fetchData();
      }
    }
  }
</script>

<style scoped>

</style>