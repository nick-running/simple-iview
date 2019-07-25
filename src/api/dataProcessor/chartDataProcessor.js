/**
 * 处理原始数据为折线图需要的series数据
 */
export default {
  simpleProcessor(data, {
                    id='id', name='name', type='line', symbol='circle', smooth=true,
                    dataKey='data'}){
    if(!data) return
    let makeRow = (d)=>{
      let row = {type, symbol, smooth}
      if (d[id]) {
        row.id = d[id]
      }
      if (d[name]) {
        row.name = d[name]
      }
      if (d[dataKey]) {
        row.data = d[dataKey]
      }
      return row
    }
    
    let series = []
    if (data instanceof Array) {
      data.forEach(d=>{
        let row = makeRow(d)
        if (id) {
          row[id] = data[id]
        }
        series.push(row);
      })
    }else {
      series.push(makeRow(data))
    }
    return series
  },
  timeProcessor(data, {
    sampling='average',
    name='name',
    type='line',
    symbol='circle',
    smooth=true,
    area,
    stack,
    id='id',
    dataKey='data', tsDataName='ts', tsDataValue='value'}){
    if(!data) return
    
    let makeRow = (d)=>{
      let makeData = (dd)=>{
        let rowData = []
        dd.forEach(td=>{
          rowData.push({
            name: td[tsDataName],
            value: [td[tsDataName], td[tsDataValue]]
          })
        })
        return rowData
      }
      let row = {sampling, type, symbol, smooth}
      if(area){
        row.areaStyle = {}
      }
      if(stack){
        row.stack = stack
      }
      if (d[id]) {
        row.id = d[id]
      }
      if (d[name]) {
        row.name = d[name]
      }
      if (d[dataKey]) {
        row.data = makeData(d[dataKey])
      }
      return row
    }
    
    let series = []
    if (data instanceof Array) {
      data.forEach(d=>{
        let row = makeRow(d)
        series.push(row);
      })
    }else{
      throw 'data not array'
    }
    return series
  }
}