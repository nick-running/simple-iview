<template>
    <div class="line-chart">
        <h1>折线图</h1>
        <!--<s-line-chart url="http://127.0.0.1:8033/1ee09cb9db3347a275c7/dataShow/historyBusinessTrend"-->
                    <!--:resize-version="0"/>-->
        <s-line-chart style="width: 800px;height: 600px" :resize-version="0" :data="data"/>
    </div>
</template>

<script>
    // import {chartDataProcessor} from '@/api/dataProcessor/index'
  export default {
    name: "LineChart",
    data() {
      return {
        data: []
      }
    },
    methods: {},
    mounted() {
      console.log('asdfa')
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
        {
          "name": "业务a",
          "id": "a4eaae67-759a-47a9-8414-236a9fcd7d46",
          "data": [
            {
              "ts": "2019-04-15 00:00:23",
              "num": "122"
            },
            {
              "ts": "2019-04-15 00:10:23",
              "num": "111"
            },
            {
              "ts": "2019-04-15 00:23:23",
              "num": "122"
            }
          ]
        },
        {
          "name": "业务b",
          "id": "2",
          "data": [
            {
              "ts": "2019-04-15 00:00:23",
              "num": "12"
            },
            {
              "ts": "2019-04-15 00:10:23",
              "num": "52"
            },
            {
              "ts": "2019-04-15 00:23:23",
              "num": "62"
            }
          ]
        },
        {
          "name": "业务c",
          "id": "3",
          "data": [
            {
              "ts": "2019-04-15 00:00:23",
              "num": "65"
            },
            {
              "ts": "2019-04-15 00:10:23",
              "num": "26"
            },
            {
              "ts": "2019-04-15 00:23:23",
              "num": "47"
            }
          ]
        }
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