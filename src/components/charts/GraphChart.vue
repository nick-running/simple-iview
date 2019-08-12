<template>
    <div class="graph-chart">
        <div ref="chart" class="chart"></div>
    </div>
</template>

<script>
  import extend from 'extend'
  import { mapState, mapGetters } from 'vuex'
  import {isEqual} from 'lodash'

  let echarts = require('echarts');
  require('echarts/lib/chart/bar');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  import {chartDataProcessor} from '@/api/dataProcessor/index'
  export default {
    name: "graph-chart",
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
      option: {
        type: Object
      },
      data: {
        type: Array,
        default: ()=>[]
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
        chartData: this.data
      }
    },
    methods: {
      initChart(){
        const _this = this
        // console.log('this.$refs.chart is: ', this.$refs.chart)
        _this.chart = echarts.init(this.$refs.chart)
        // console.log('this.chart is: ', this.chart)
        this.renderChart()
        // this.fetchData()
      },
      fetchData() {
        const _this = this
        if(!this.isFetchFinish) return
        this.isFetchFinish = false
        _this.asyncGet({
          // url: {url: '/api_test_server/'+_this.longUrl},
          url: {url: _this.url},
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
        if(!this.chart) return
        const _this = this
        // let legendData = []
        let seriesData = [], legendData = ['发送0', '接收1']

        seriesData = chartDataProcessor.graphProcessor(_this.chartData,
          {
            ...this.option
          })
        // console.log('this.chart is: ', this.chart)
        // console.log('seriesData is: ', JSON.stringify(seriesData))
        // console.log('seriesData is: ', seriesData)
        _this.chart.setOption({
          // dataZoom: null,
          title: {
            show: !!this.title,
            text: this.title
          },
          legend: {
            show: this.showLegend,
            left: 'center',
            data: this.option.categories
          },
          // tooltip: {
          //   // formatter: (params)=>{
          //   //   return _this.tooltipFormatter()(params, 'all', _this.fetchParams.statisticalObject)
          //   // }
          // },
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
        }, true);
        // this.resize()
      },
      resize(){
        const _this = this
        setTimeout(function () {
          _this.chart.resize()
        }, 50)
      }
    },
    computed: {
      ...mapState({
        // doughnutOption: state => state.charts.option.doughnut,
        lineOption: state => state.charts.option.line,
        // itemColors: state => state.charts.itemColors,
      }),
      // ...mapGetters(['getDateRangeTime', 'barItemStyle', 'tooltipFormatter'])
    },
    watch: {
      url(u){
        this.fetchData()
      },
      data(d){
        this.chartData = d
        this.renderChart()
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
    .graph-chart{
        flex: auto;
        display: flex;
        .chart{
            flex: 1;
        }
    }
</style>