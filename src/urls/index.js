import {objToOptions} from "./utils";
import midServerUrls from "./midServerUrls";
import insightUrls from "./insightUrls";
import matrixUrls from "./matrixUrls";

const midServerUrlsOptions = objToOptions(midServerUrls)
const insightUrlsOptions = objToOptions(insightUrls)
const matrixUrlsOptions = objToOptions(matrixUrls)
const apiList = [ // 用户管理配置使用
  {
    label: '中间服务接口',
    childOptions: midServerUrlsOptions
  },
  {
    label: 'NetInsight服务接口',
    childOptions: insightUrlsOptions
  },
  {
    label: 'MATRIX服务接口',
    childOptions: matrixUrlsOptions
  }
]
export {midServerUrls, insightUrls, matrixUrls}
export default apiList