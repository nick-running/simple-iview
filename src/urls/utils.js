export function objToOptions(obj) {
  let options = []
  Object.keys(obj).forEach(n=>{
    options.push({label: obj[n].title, value: obj[n].url})
  })
  return options
}