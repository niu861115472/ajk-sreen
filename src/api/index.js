import axios from 'axios'
import qs from 'qs'                                                                                                                                                                                                                                                                          

var base_url = 'http://demo.live-ctrl.com/'
var base_url1 = 'http://demo.live-ctrl.com/'
var base_url2 = 'http://api.web.haier.qingdao.cosmoplat.com/'
// var base_url = 'http://192.168.0.84:8888/aijukex'
const base_axios_options = {
headers:{ 'content-type': 'application/json' },
timeout:5000,
withCredentials:false,  //是否跨站点访问控制请求
};
const url = `${base_url}`;
const url1 = `${base_url1}`;
const url2 = `${base_url2}`;
const token = 'RQsb3e69V1ZNeGNVeFhjM1JoUnprd1dsZDRTV0l5TVd3PQC3hhBsZ8ZoOUj5bO=='
const postAxios = axios.create(Object.assign({},{ baseURL:url },base_axios_options));
const postAxios1 = axios.create(Object.assign({},{ baseURL:url1 },base_axios_options));
const postAxios2 = axios.create(Object.assign({},{ baseURL:url2 },base_axios_options));

export const Api = {
  // 根据标识获取酒店信息接口
  getHotelBySign:(params) =>{
    return postAxios.post('aijukex/hm/hm_getHotelBySign?'+`token=${token}&`+qs.stringify(params)).then(res=>res.data);
  },
  //客流、房间数等信息
  getFlowStatistics:(params) =>{
    return postAxios.post('aijukex/hm/hm_htFlowStatistics?'+`token=${token}&`+qs.stringify(params)).then(res=>res.data);
  },
  //酒店房间信息接口
  getHotelHouses:(params) =>{
    return postAxios.post('aijukex/hm/hm_htHotelHouses?'+`token=${token}&`+qs.stringify(params)).then(res=>res.data);
  },
  //酒店订单接口
  getHotelOrders:(params) =>{
    return postAxios.post('aijukex/hm/hm_htHotelOrders?'+`token=${token}&`+qs.stringify(params)).then(res=>res.data);
  },
  //客房消息接口
  getHotelMsgs:(params) =>{
    return postAxios.post('aijukex/hm/hm_htHotelMsgs?'+`token=${token}&`+qs.stringify(params)).then(res=>res.data);
  },
  //异常消息接口
  getHotelExceptionMsgs:(params) =>{
    return postAxios.post('aijukex/hm/hm_htHotelExceptionMsgs?'+`token=${token}&`+qs.stringify(params)).then(res=>res.data);
  },
  //电源统计接口
  getHotelPowerStatistics:(params) =>{
    return postAxios.post('aijukex/hm/hm_htHotelPowerStatistics?'+`token=${token}&`+qs.stringify(params)).then(res=>res.data);
  },
  //电源排行接口
  getHotelPowerRank:(params) =>{
    return postAxios.post('aijukex/hm/hm_htHotelPowerRank?'+`token=${token}&`+qs.stringify(params)).then(res=>res.data);
  },
  //用电报警接口
  getHotelPowerWarnMsg:(params) =>{
    return postAxios.post('aijukex/hm/hm_htHotelPowerWarnMsg?'+`token=${token}&`+qs.stringify(params)).then(res=>res.data);
  },
  //用电报警已处理/未处理数量
  getHotelPowerWarnCount:(params) =>{
    return postAxios.post('aijukex/hm/hm_htHotelPowerWarnCount?'+`token=${token}&`+qs.stringify(params)).then(res=>res.data);
  },
  postOpenDoor:(params) =>{
    return postAxios.get('snbface/openDoor?'+qs.stringify(params)).then(res =>res.data)
  },
  //获取房间设备功率、线温接口
  getRealTimeData:(params) =>{
    return postAxios1.get('aijukex/tenement/queryLineModels?'+qs.stringify(params)).then(res =>res.data)
  }
}