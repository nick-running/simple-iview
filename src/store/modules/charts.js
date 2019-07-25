import extend from 'extend'
import {bytesToSize} from '@/api/utils'
let primaryColor = {orange: '#62523F', blue: '#299DEF', textGrey: '#B1B1C3'}
let dataZoom = [
  {
    type: 'inside',
    start: 0,
    end: 100,
    // filterMode: 'empty'
  },
  {
    start: 0,
    end: 10,
    // handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
    handleSize: '80%',
    backgroundColor: 'transparent',
    borderColor: primaryColor.orange,
    dataBackground: {
      areaStyle: {
        color: primaryColor.blue
      }
    },
    handleStyle: {
      // color: '#fff',
      color: primaryColor.blue,
      shadowBlur: 3,
      shadowColor: 'rgba(0, 0, 0, 0.6)',
      shadowOffsetX: 2,
      shadowOffsetY: 2
    },
    textStyle: {
      color: primaryColor.textGrey
    }
  }
]
let itemColors = [ // 图标项的预设颜色，包括柱状图，饼图的颜色；可以动态AJAX配置
  '#299def', '#724bbe', '#e4873c', '#2cbdbf', '#d64952',
  '#dac827', '#bc3297', '#8d98b3', '#92bc32', '#95706d',

  '#56A36C', '#5E8579', '#77C34F', '#2E68AA', '#7E884F',
]
let axisOption = {
  title: {
    textStyle: {
      fontWeight: 'normal',
      color: '#e5e5ff'
      // color: 'red'
    }
  },
  backgroundColor: 'transparent',
  textStyle: {
    color: '#B1B1C3'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer : {
      type : 'shadow'
    }
  },
  legend: {
    left: '5%',
    right: '5%',
    bottom: 0,
    textStyle: 'red',
    inactiveColor: '#262626',
    // orient: 'vertical',
    // x: 'bottom',
    data: []
  },
  xAxis: {
    boundaryGap: false,
    axisTick: {
      show: false
    },
    // axisLabel: {
    //   show: false
    // },
    axisLine: {
      lineStyle: {
        color: primaryColor.orange,
        width: 3
      }
    },
    data: []
  },
  yAxis: {
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: primaryColor.orange,
        width: 3
      }
    },
    splitLine: {
      lineStyle: {
        color: primaryColor.orange,
        type: 'dashed'
      }
    }
  },
  series: [{
    name: '',
    type: 'bar',
    emphasis: {
      borderColor: 'green',
      borderWidth: 2
    },
    data: []
  }]
}
let barOption = extend(true, {}, axisOption, { // 首个参数为true表示深拷贝
  grid: {
    left: '15%',
    bottom: 100
  },
  xAxis: {
    axisLabel: {
      rotate: -45,
      fontSize: 10,
    },
    boundaryGap: true
  }
})
let lineOption = extend(true, {}, axisOption, {
  color: itemColors,
  legend: {
    show: false
  },
  tooltip: {
    axisPointer: {
      type : 'line'
    }
  },
  xAxis: {
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: function (value, index) {
        return bytesToSize(value)
      }
    }
  },
  dataZoom: dataZoom,
})
let doughnutOption = extend(true, {}, axisOption, {
  color: itemColors,
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  xAxis: null,
  yAxis: null,
  series: [{
    type: 'pie',
    radius: ['50%', '70%'],
    center: ['50%', '40%'],
    selectedMode: 'single',
    label: {
      normal: {
        show: false,
        position: 'center'
      }
    },
    data: []
  }]
})
let confidenceBandOption = extend(true, {}, axisOption, {
  tooltip: {
    axisPointer: {
      type : 'line'
    }
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      formatter: function (value, idx) {
        let date = new Date(value);
        return idx === 0 ? value : [date.getMonth() + 1, date.getDate()].join('-');
      }
    },
    splitLine: {
      show: false
    },
    boundaryGap: false
  },
  dataZoom: dataZoom,

})
// console.log('barOption is:')
// console.log(barOption)
export default {
  state: {
    itemColors: itemColors,
    option: {
      bar: barOption,
      line: lineOption,
      doughnut: doughnutOption,
      confidenceBand: confidenceBandOption,
      pie: {}
    },
    dataZoom: dataZoom,
  },
  mutations: {},
  actions: {},
  getters: {
    barItemStyle: state => {
      return {
        normal: {
          color: function(params) {
            const colorList = state.itemColors;
            return colorList[params.dataIndex]
          }
        }
      }
    },
    tooltipFormatter: state => (params)=> {
      return function (params, type, statObj) {
        let result = '';
        if(params instanceof Array) {
          if(params[0].componentSubType==='bar') {
            let item = params[0]
            // console.log('item is: ', JSON.stringify(item))
            result = item.name+'</br>'
            let value = bytesToSize(item.value, type, statObj)
            result += item.marker + " " + (item.seriesName?item.seriesName+" : ":"") + value +"</br>";
          }else{
            let name = ''
            if(params[0].value instanceof Array) {
              name = params[0].value[0]
            }else{
              name = params[0].value
            }
            result = name+'</br>'
            params.forEach(function (item) {
              let value = 0
              if(typeof item.value==='number') {
                value = item.value?bytesToSize(item.value, type, statObj):item.value
              }else{
                value = item.value[1]?bytesToSize(item.value[1], type, statObj):item.value[1]
              }
              result += item.marker + " " + item.seriesName + " : " + value +"</br>";
            });
          }
        }else{
          let value = bytesToSize(params.value, statObj)
          // console.log(`params is: ${JSON.stringify(params)}`)
          if(params.componentSubType==='pie') {
            result += params.seriesName+"</br>"+params.name+" "  + " : " + value + "("+params.percent+"%)"+"</br>";
          }else if(params.componentSubType==='bar') {
            result += params.marker + " " + params.seriesName + " : " + value +"</br>";
          }else{
            result += params.marker + " " + params.seriesName + " : " + value +"</br>";
          }
        }
        // console.log('result is: ', JSON.stringify(result))
        return result;
      }
    }
  }
}