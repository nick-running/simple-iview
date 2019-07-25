import moment from 'moment'
import {assignIn, find, findIndex, sortedUniq, sortBy} from 'lodash'
export function optionsToKeyDict(options) {
  let dict = {}
  options.forEach(n=>{
    dict['key'+n.value] = n.label
  })
  return (key)=>dict[`key${key}`]
}

export function debounce(func, delay, immediate) {
  let timer = null;
  return function(){
    let context = this;
    let args = arguments;
    // console.log('args is: ', JSON.stringify(args))
    if(timer) clearTimeout(timer);
    if(immediate){
      //根据距离上次触发操作的时间是否到达delay来决定是否要现在执行函数
      let doNow = !timer;
      //每一次都重新设置timer，就是要保证每一次执行的至少delay秒后才可以执行
      timer = setTimeout(function(){
        timer = null;
      },delay);
      //立即执行
      if(doNow){
        func.apply(context,args);
      }
    }else{
      timer = setTimeout(function(){
        func.apply(context,args);
      },delay);
    }
  }
}
export function flattenData(children) {
  let data = []
  let fetchDeepData = (children, depth, parent, subData)=>{
    children.forEach(n=>{
      // subData.push({name: n.name, key: n.key})
      if(n.children&&n.children.length){
        if(!subData[depth]) subData[depth] = []
        subData[depth].push({name: n.name, key: n.key, parent: parent})
        fetchDeepData(n.children, depth+1, n.key, subData)
      }
    })
  }
  
  children.forEach(n=>{
    let subData = []
    fetchDeepData(n.children, 0, n.key, subData)
    data.push({name: n.name, key: n.key, subData: subData})
  })
  return data
}
export function listToTableData(list, col) {
  let nList = [], row = []
  list.forEach((n,i)=>{
    row.push(n)
    if (row.length === col||list.length-1===i) {
      nList.push(row)
      row = []
    }
  })
  return nList
}

/**
 *
 * @param bytes
 * @param type all || single || null
 * @param statObj
 * @returns {*}
 */
export function bytesToSize(bytes, type, statObj) {
  let basicUnit = statObj&&statObj!=='flows'&&type==='all'?statObj:''
  if (bytes === 0) return '0 '+basicUnit;
  if (bytes < 1) return bytes+' '+basicUnit
  let k = 1000;
  let sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
  let i = Math.floor(Math.log(bytes) / Math.log(k))
  //return (bytes / Math.pow(k, i)) + ' ' + sizes[i];
  let value = parseFloat((bytes / Math.pow(k, i)).toPrecision(3))
  let unit = sizes[i]+basicUnit
  return value + ' ' +unit
  //toPrecision(3) 后面保留两位小数，如1.00GB  
}

export function unitTime(time) {
  let value = time / 1000
  let val = ''
  if (value < 1) {
    val = time + '微秒'
  } else {
    val = value.toFixed(2) + '毫秒'
  }
  return val
}

export function parseDateToStr(date, type) {
  // console.log(`key is: ${key}`)
  let pattern = 'YYYY-MM-DD HH:mm:ss'
  if (type === 'day') pattern = 'YYYY-MM-DD'
  return moment(date).format(pattern)
}
export function parseDateRangeToStr(dateRange) {
  let StrDateRange = ['', '']
  if (dateRange instanceof Array&&dateRange.length===2) {
    let startDate = dateRange[0]
    let endDate = dateRange[1]
    StrDateRange = [startDate&&parseDateToStr(startDate), endDate&&parseDateToStr(endDate)]
  }
  return StrDateRange
}

export function parseWsMsg(wsMsg, key) {
  let data = []
  wsMsg.forEach(n => {
    if (n.data.lfp.function_type === key) {
      data.push(n)
    }
  })
  return data
}

export function parseWsMsg2(wsMsg, key) {
  let data = []
  wsMsg.forEach(n => {
    if (n.data.lfp.function_type === key) {
      data.push(n)
    }
  })
  return data
}

export let makeTree = {
  /**
   * 根据平铺的菜单数据生成有层级结构的菜单数据
   * @param menus
   * @returns {Array}
   */
  make(menus) {
    let treeMap = {}
    // console.log(`make menus is: ${JSON.stringify(menus)}`)
    menus.forEach(n=>{
      let deep = n.path.split('#').length
      let treeKey = treeMap[deep]
      if(!treeKey){
        treeMap[deep] = []
      }
      n.children = []
      treeMap[deep].push(n)
    })
    // console.log(`Object.keys(treeMap) is: ${JSON.stringify(Object.keys(treeMap))}`)
    let order = Object.keys(treeMap).sort((a,b)=>a>b) // 数组的建为数字？
    // let order = sortedUniq(Object.keys(treeMap))
    let treeData = []
    let lastDeep = {level: null, data: null}
    order.forEach((o, oIdx)=>{
      let curLevelData = treeMap[o]
      // console.log(o)
      if(oIdx){
        lastDeep.data.forEach(l=>{
          curLevelData.forEach(c=>{
            if(l._id===c.parent){
              l.children.push(c)
            }
          })
        })
        lastDeep.data = treeMap[o]
        lastDeep.level = oIdx
      }else{
        lastDeep.data = treeMap[o]
        lastDeep.level = oIdx
        treeData =curLevelData
      }
    })
    return treeData
  },
  changeChild(children, params) {
    let newChildren = []
    if (params&&params.order) {
      children.sort((a,b)=>a[params.order]-b[params.order])
    }
    children.forEach(n => {
      let item = assignIn({}, n, {title: n.name, expand: true, disabled: !!n.readonly})
      // let item = {title: n.name, _id: n._id, url: n.url, isPage: n.isPage, expand: true}
      if (n.children) {
        item.children = this.changeChild(n.children, params)
      }
      newChildren.push(item)
    });
    return newChildren
  },
  deleteChild(arr, key) { // 删除子节点
    let newChildren = []
    arr.forEach(n => {
      if (n._id !== key) { // 用此方法删除
        let item = n
        if (n.children) {
          item.children = this.deleteChild(n.children, key)
        }
        newChildren.push(item)
      }
    })
    return newChildren
  },
  updateChild(arr, key, data) {
    let newChildren = []
    arr.forEach(n => {
      let item = n
      if (n._id === key) {
        item = assignIn({}, item, data)
      }
      if (n.children) {
        item.children = this.updateChild(n.children, key, data)
      }
      newChildren.push(item)
    })
    return newChildren
  },
  addChild(arr, key, child) {
    // console.log(`add child will be: ${JSON.stringify(child)}`)
    let newChildren = []
    arr.forEach(n => {
      let item = n
      if (n.children) {
        item.children = this.addChild(n.children, key, child)
      }
      if (n._id === key) {
        item.children.push(child)
      }
      newChildren.push(item)
    })
    return newChildren
  },
  selectAllChild(arr, isChecked) {
    // console.log(`add child will be: ${JSON.stringify(child)}`)
    let newChildren = []
    arr.forEach(n => {
      let item = assignIn({}, n, {checked: isChecked})
      if (n.children) {
        item.children = this.selectAllChild(n.children)
      }
      newChildren.push(item)
    })
    return newChildren
  },
  selectChildByIds(arr, ids) {
    // console.log(`add child will be: ${JSON.stringify(child)}`)
    let newChildren = []
    arr.forEach(n => {
      const foundIdx = findIndex(ids, id => {
        return id === n._id
      })
      let isChecked = false
      if (foundIdx !== -1) {
        isChecked = true
        ids.splice(foundIdx, 1)
      }
      let item = assignIn({}, n, {checked: isChecked})
      if (n.children) {
        item.children = this.selectChildByIds(n.children, ids)
      }
      newChildren.push(item)
    })
    return newChildren
  },
  getSelectedMenusId(children, checkedMenusId) {
    children.forEach(n => {
      let item = assignIn({}, n, {checked: n.checked})
      if (n.checked) {
        checkedMenusId.push(n._id)
      }
      if (n.children) {
        item.children = this.getSelectedMenusId(n.children, checkedMenusId)
      }
    })
    return checkedMenusId
  }
}

export function removeKeyFromArray(arr, keyAttr, key, version) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].data.lfp[keyAttr] === key && version ? arr[i].version === version : true) {
      arr.splice(i, 1)
      i--
    }
  }
  return arr
}

/*移除小于此时间段的数据*/
export function removeLETimeFromArray(arr, keyAttr, minimumTime) {
  // console.log(`移除小于此时间段的数据...`)
  for (let i = 0; i < arr.length; i++) {
    // console.log(`arr[i][keyAttr] is: ${arr[i][keyAttr]}`)
    // console.log(`moment(arr[i][keyAttr]).milliseconds() is: ${moment(arr[i][keyAttr])}`)
    if (moment(arr[i][keyAttr]) < minimumTime) {
      arr.splice(i, 1)
      i--
    }
  }
  // console.log(`arr removed: ${JSON.stringify(arr)}`)
  return arr
}

export function paginator(rows, page) {
  let current = page.current - 1
  return rows.slice(current * page.pageSize, current * page.pageSize + page.pageSize)
}

export function parseDataToGraph(data) {
  let nodes = [], links = []
  data.forEach(item => {
    let isSFind = false, isTFind = false
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === item.source) {
        isSFind = true
        // nodes[i].symbolSize *=0.005
        nodes[i].symbolSize += nodes[i].symbolSize * .005
        // nodes[i].symbolSize += nodes[i].symbolSize
      }
    }
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === item.target) {
        isTFind = true
        // nodes[i].symbolSize  *=0.005
        nodes[i].symbolSize += nodes[i].symbolSize * .005
        // nodes[i].symbolSize  += nodes[i].symbolSize
      }
    }
    if (!isSFind) {
      nodes.push({id: item.source, name: item.source, symbolSize: 1})
    }
    if (!isTFind) {
      nodes.push({id: item.target, name: item.target, symbolSize: 1})
    }
    
    // 访问关系
    let isLinkRepeat = false
    for (let i = 0; i < links.length; i++) {
      if (links[i].source === item.source && links[i].target === item.target) {
        isLinkRepeat = true
        links[i].lineStyle.normal.width += links[i].lineStyle.normal.width * 0.2
      }
    }
    if (!isLinkRepeat) {
      links.push({source: item.source, target: item.target, lineStyle: {normal: {width: 1}}})
    }
  });
  return {nodes: nodes, links: links}
}
