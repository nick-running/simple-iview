<template>
    <div class="graph-chart">
        <h1>关系图</h1>
        <!--<s-graph-chart url="http://127.0.0.1:8033/1ee09cb9db3347a275c7/dataShow/historyBusinessTrend"-->
                    <!--:resize-version="0"/>-->
        <s-graph-chart style="width: 800px;height: 600px"
                      :resize-version="0"
                      :option="option"
                      :data="data"/>
    </div>
</template>

<script>
    // import {chartDataProcessor} from '@/api/dataProcessor/index'
  export default {
    name: "GraphChart",
    data() {
      return {
        option: {
          categories: ['发送0', '接收1']
        },
        data: []
      }
    },
    methods: {},
    mounted() {
      // let data = [
      //   {name: '邮件营销', data: [120, 132, 101, 134, 90, 230, 210]},
      //   {name: '联盟广告', data: [220, 182, 191, 234, 290, 330, 310]},
      //   {name: '视频广告', data: [150, 232, 201, 154, 190, 330, 410]},
      //   {name: '直接访问', data: [320, 332, 301, 334, 390, 330, 320]},
      //   {name: '搜索引擎', data: [820, 932, 901, 934, 1290, 1330, 1320]},
      // ]
      // let seriesData = chartDataProcessor.simpleProcessor(data, {})
      // console.log('seriesData is: ', JSON.stringify(seriesData))

      let data = [
        {source: 'a', target: 'b', count: 1},
        {source: 'b', target: 'a', count: 2},
        {source: 'c', target: 'b', count: 3},
        {source: 'c', target: 'b', count: 3},
        {source: 'c', target: 'b', count: 3},
        {source: 'c', target: 'a', count: 3},
        {source: 'a', target: 'c', count: 3},
        {source: 'a', target: 'd', count: 3},
        {source: 'a', target: 'e', count: 3},
      ]
      this.data = data
      // let seriesData = chartDataProcessor.timeProcessor(data,
      //   {
      //     // name: name,
      //     // dataKey: 'data',
      //     tsDataName: 'ts',
      //     tsDataValue: 'num'
      //   })
      // console.log('seriesData is: ', JSON.stringify(seriesData))
    }
  }
</script>

<style scoped>

</style>