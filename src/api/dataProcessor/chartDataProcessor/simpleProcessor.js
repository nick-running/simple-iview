export default function(data, {
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
}