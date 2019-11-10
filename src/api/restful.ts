export default {
  login: {
    method: 'post',
    url: '/westLake/user/login',
  },
  logout: {
    method: 'delete',
    url: '/westLake/user/logout',
  },

  getNavData:{
    method:'get',
    url:'/mock/navData.json'
  },

  findPermissionByRoleId: {
    method: 'get',
    url: '/mock/findPermissionByRoleId.json',
  },

  findUserPermissionCodes: {
    method: 'get',
    url: '/mock/findUserPermissionCodes.json',
  },

  findMenuTreeData: {
    method: 'get',
    url: '/mock/findMenuTreeData.json',
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
    url:'/mock/tradeChannelData.json' // /log/api/v2/parking/tradeData/findProfitChannel
  },
  getTradeRankData:{
    method:'get',
    url:'/mock/trafficRankData.json'
  },
}
