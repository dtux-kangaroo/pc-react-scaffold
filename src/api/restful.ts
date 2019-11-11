export default {
  login: {
    method: 'post',
    url: '/westLake/user/login',
  },
  logout: {
    method: 'delete',
    url: '/westLake/user/logout',
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
}
