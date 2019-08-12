import {find, findIndex, uniq} from 'lodash'
export default function (data, {
  layout='circular',
  rotateLabel=true,
  roam=true,
  symbolSize=5,
  modularity,
  categories=[],
  id, source='source', target='target'}){
  if(!data) return
  
  // console.log('data is: ', JSON.stringify(data))
  let makeGraph = (data)=>{
    let nodes = [], links = []
    data.forEach(dd=>{
      let foundSIdx = findIndex(nodes, d => d.name === dd[source])
      if (!~foundSIdx) { // source
        nodes.push({id: id?dd[id]:dd[source], name: dd[source], label: {normal: {show: true}}, symbolSize, category: modularity?dd[modularity]:0})
      }else{
        // nodes[foundSIdx].symbolSize += nodes[foundSIdx].symbolSize*=.005
        nodes[foundSIdx].symbolSize += nodes[foundSIdx].symbolSize*=1.2
      }
      let foundTIdx = findIndex(nodes, d => d.name === dd[target]) // target
      if (!~foundTIdx) {
        nodes.push({id: id?dd[id]:dd[target], name: dd[target], label: {normal: {show: true}}, symbolSize, category: modularity?dd[modularity]:1})
      }else{
        // nodes[foundTIdx].symbolSize += nodes[foundTIdx].symbolSize*=.2
        // nodes[foundTIdx].symbolSize += nodes[foundTIdx].symbolSize*=.005
        nodes[foundTIdx].symbolSize += nodes[foundTIdx].symbolSize*=1.2
      }
      if (dd.count&&dd.count>5) {
        dd.count = 5
      }
      // links.push({source: dd[source], target: dd[target], ...dd})
      links.push({source: dd[source], target: dd[target], lineStyle: {width: dd.count?dd.count+=dd.count*.002:1}, ...dd})
    })
    return {nodes, links}
  }
  
  let graph = makeGraph(data)
  // console.log('graph is: ', JSON.stringify(graph))
  let series = []
  if (data instanceof Array) {
    let config = {
      type: 'graph',
      layout,
      circular: {
        rotateLabel
      },
      data: graph.nodes,
      links: graph.links,
      roam,
      categories,
      label: {
        normal: {
          position: 'right',
          formatter: '{b}'
        }
      },
      lineStyle: {
        normal: {
          color: 'source',
          curveness: 0.3
        }
      }
    }
    series.push(config)
  }else{
    throw 'Data is not an array'
  }
  console.log('series is: ', series)
  return series
}