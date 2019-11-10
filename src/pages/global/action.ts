import {globalType} from './constant';
// import * as _ from 'lodash';
const userData = (data) => ({
  type: globalType.GET_USER_DATA,
  payload: data
})
export const getUserData = (params) => async (dispatch, getState,{API}) => {
  try {
    API.getUserData(params).then(response =>{ 
      if (response.success) {
        dispatch(userData(response.data));
      } else {
      }
    });
  } catch (error) {
    console.log('error: ', error)
  }
}

const navData = (data) => ({
  type: globalType.GET_NAV_DATA,
  payload: data
})
export const getNavData = (params) => async (dispatch, getState,{API}) => {
  API.findMenuTreeData(params).then(response => {
    if (response.success) {
      // API.findPermissionByRoleId({}).then(({ success, data, message }) => {
      //   if (success) {
      //     let { sideNav, topNav } = _.cloneDeep(response.data);
      //     console.log(sideNav,)
      //     const permissionMenus = data.filter(permission => permission.isMenu === 1);
      //     const permissionItems = data.filter(permission => permission.isMenu === 0);
      //     let permissionSideNav = [];
      //     permissionSideNav = sideNav.filter(nav => permissionMenus.find(menu => menu.permissionName === nav.permissionName));
      //     sideNav.forEach(nav => {
      //       nav.children && (nav.children = nav.children.filter(subNav => {
      //         return permissionItems.find(permissionItem => permissionItem.permissionName === subNav.permissionName)
      //       }))
      //       if (nav.children && nav.children.length > 0) {
      //         console.log(nav.children)
      //         permissionSideNav.push(nav);
      //       }
      //     })
      //     let permissionTopNav = [];
      //     permissionTopNav = topNav.filter(nav => permissionMenus.find(menu => menu.permissionName === nav.permissionName));
      //     topNav.forEach(nav => {
      //       nav.children && (nav.children = nav.children.filter(subNav => {
      //         return permissionItems.find(permissionItem => permissionItem.permissionName === subNav.permissionName)
      //       }));
      //       if (nav.children && nav.children.length > 0) {
      //         permissionTopNav.push(nav);
      //       }
      //     })
      //     const permissionNavs = {
      //       topNav: permissionTopNav,
      //       sideNav: permissionSideNav,
      //     }
      //     console.log(response.data ,permissionNavs)
      //     dispatch(navData(permissionNavs))
      //     // this.setState({ permissionNavs })
      //   }
      // })
      dispatch(navData(response.data));
    } else {
      //返回失败
    }
  });
}

export const updateTimeFilterType = type => {
  return {
    type: globalType.UPDATE_TIMEFILTER_TYPE,
    payload: type
  }
}

export const updateTimeFilterName = name => {
  return {
    type: globalType.UPDATE_TIMEFILTER_NAME,
    payload: name
  }
}