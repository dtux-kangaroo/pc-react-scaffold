export default {
  login: {
    method: 'post',
    url: '/westLake/user/login',
  },
  logout: {
    method: 'delete',
    url: '/westLake/user/logout',
  },
  deleteRecordById: {
    method: 'delete',
    url: '/westLake/data/deleteDataById',
  },
  getRecordById: {
    method: 'get',
    url: '/westLake/data/findDataById',
  },
  getRecordList: {
    method: 'get',
    url: '/westLake/data/findDataList',
  },
  updateRecord: {
    method: 'put',
    url: '/westLake/data/updateData',
  },
  saveRecord: {
    method: 'post',
    url: '/westLake/data/saveData',
  },
  getNavData:{
    method:'get',
    url:'/mock/navData.json'
  },
  getUserData:{
    method:'get',
    url:'/mock/userData.json'
  },
  getTrafficTrendData:{
    method:'get',
    url:'/mock/trafficTrendData.json'
  },
  getTrafficRegionData:{
    method:'get',
    url:'/mock/trafficRegionData.json'
  },
  getTrafficRankData:{
    method:'get',
    url:'/mock/trafficRankData.json'
  },
  getTradeTrendData:{
    method:'get',
    url:'/mock/tradeTrendData.json'
  },
  getTradeChannelData:{
    method:'get',
    url:'/mock/tradeChannelData.json'
  },
  getTradeRankData:{
    method:'get',
    url:'/mock/trafficRankData.json'
  },
}
