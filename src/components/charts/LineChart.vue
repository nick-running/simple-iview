<template>
    <div class="line-chart">
        <div ref="chart22" class="chart"></div>
    </div>
</template>

<script>
  import extend from 'extend'
  import { mapState, mapGetters } from 'vuex'
  import {isEqual} from 'lodash'
  import { NI_BACKEND } from '@/urls/config'
  import {bytesToSize} from '@/api/utils'

  let echarts = require('echarts');
  require('echarts/lib/chart/bar');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  export default {
    name: "line-chart",
    props: {
      title: {
        type: String,
      },
      showLegend: {
        type: Boolean,
        default: false
      },
      url: {
        type: String,
      },
      fetchParams: {
        type: Object,
      },
      fetchVersion: {
        type: Number,
        default: 0
      },
      resizeVersion: {
        type: Number,
        default: 0
      },
      legend: {
        type: Object,
        default(){
          return {
            show: true,
            orient: 'horizontal', // string. optional: [horizontal, vertical]
            left: 'auto', // string, number. e.g. 20, '20%' also 'left', 'center', 'right',
            top: 'auto',
            right: 'auto',
            bottom: '0'
          }
        }
      }
    },
    data() {
      return {
        isFetchFinish: true,
        chartData: []
      }
    },
    methods: {
      initChart(){
        const _this = this
        // console.log('this.$refs.chart22 is: ', this.$refs.chart22)
        _this.chart = echarts.init(this.$refs.chart22)
        this.renderChart()
        this.fetchData()
      },
      fetchData() {
        const _this = this
        if(!this.isFetchFinish) return
        this.isFetchFinish = false
        _this.asyncGet({
          // url: {url: '/api_test_server/'+_this.longUrl},
          url: {url: _this.longUrl},
          data: {...this.fetchParams},
          showAutoMsg: true
          // data: {},
        }).then(data=>{
          _this.isFetchFinish = true
          _this.chartData = data.rows
          _this.renderChart()
        }).catch(err=>{
          _this.isFetchFinish = true
        })
      },
      renderChart() {
        const _this = this
        // let legendData = []
        let seriesData = [], legendData = []
        _this.chartData.forEach(n=>{
          let itemList = []
          n.data&&n.data.forEach(d=>{
            // itemList.push([d.ts, d.num])
            itemList.push({name: d.ts, value: [d.ts, d.num]})
          })
          legendData.push({name: n.name})
          seriesData.push({
            sampling: 'average',
            name: n.name,
            type: 'line',
            symbol: 'circle',
            smooth: true,
            data: itemList
          })
        })
        _this.chart.setOption(extend(true, {}, _this.lineOption, {
          dataZoom: null,
          title: {
            show: !!this.title,
            text: this.title
          },
          legend: {
            show: this.showLegend,
            left: 'center',
            data: legendData
          },
          tooltip: {
            formatter: (params)=>{
              return _this.tooltipFormatter()(params, 'all', _this.fetchParams.statisticalObject)
            }
          },
          xAxis: {
            // data: legendData
            type: 'time',
            boundaryGap: false,
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: function (value, index) {
                let statObj = _this.fetchParams.statisticalObject
                return bytesToSize(value, 'single', statObj);
              }
            }
          },
          // color: _this.itemColors,
          // legend: {
          //   ..._this.legend,
          //   data: legendData
          // },
          series: seriesData
          // series: [{
          //   name: '名称',
          //   type: 'line',
          //   smooth: true,
          //   data: seriesData
          // }]
        }), true);
        this.resize()
      },
      resize(){
        const _this = this
        setTimeout(function () {
          _this.chart.resize()
        }, 50)
      }
    },
    computed: {
      longUrl(){
        let baseUri = NI_BACKEND
        if (NI_BACKEND.slice(NI_BACKEND.length - 1)) {
          baseUri = NI_BACKEND.substr(0, NI_BACKEND.length-1)
        }
        return baseUri+this.url;
      },
      ...mapState({
        doughnutOption: state => state.charts.option.doughnut,
        lineOption: state => state.charts.option.line,
        itemColors: state => state.charts.itemColors,
      }),
      ...mapGetters(['getDateRangeTime', 'barItemStyle', 'tooltipFormatter'])
    },
    watch: {
      title(data){
        this.chart.setOption({
          title: {
            text: this.title,
          }
        })
      },
      showLegend(v){
        this.chart.setOption({
          legend: {
            show: this.showLegend
          }
        })
      },
      resizeVersion(){
        // console.log('resizeVersion...')
        this.chart.resize()
      },
      fetchVersion(v){
        this.fetchData();
      },
      // isFetchFinish(v){
      //   this.fetchData();
      // },
      fetchParams(data, oData) {
        if (!isEqual(data, oData)) {
          this.fetchData();
        }
      }
    },
    mounted() {
      const _this = this
      setTimeout(function () {
        _this.initChart()
      },1)
    }
  }
</script>

<style scoped lang="scss">
    .line-chart{
        flex: auto;
        display: flex;
        .chart{
            flex: 1;
        }
    }
</style>