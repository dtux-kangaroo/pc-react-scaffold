export default {
    /* -------- DT-BootX Default Index Controller -------- */
    indexUsingGet: { // 根目录Controller
        method: 'get',
        url: `/` 
    }, 

    /* -------- 用户管理 User Controller -------- */
    addUsingPost: { // 添加用户
        method: 'post',
        url: `/api/v1/user/add` 
    }, 
    deleteUsingPost: { // 删除用户
        method: 'post',
        url: `/api/v1/user/del` 
    }, 
    getUserUsingGet: { // 获取用户信息
        method: 'get',
        url: `/api/v1/user/get-user` 
    }, 
    listUsingPost: { // 用户列表
        method: 'post',
        url: `/api/v1/user/list` 
    }, 
    resetUsingPost: { // 重置用户密码
        method: 'post',
        url: `/api/v1/user/reset` 
    }, 
    updateUsingPost: { // 修改用户密码
        method: 'post',
        url: `/api/v1/user/update` 
    }, 

    /* -------- 登录管理 Login Controller -------- */
    loginUsingPost: { // 登录用户
        method: 'post',
        url: `/api/v1/login` 
    }, 
    logoutUsingGet: { // 退出登录
        method: 'get',
        url: `/api/v1/logout` 
    }, 

    /* -------- 首页看板 Colum Ctroller -------- */
    listUsingGet: { // 获取导航栏
        method: 'get',
        url: `/api/v1/login/list` 
    }, 

}