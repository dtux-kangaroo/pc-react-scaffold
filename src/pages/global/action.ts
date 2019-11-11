import {globalType} from './constant';
import { API } from '@/api';
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
export const getNavData = () => (dispatch) => {
  API.findMenuTreeData().then(response => {
    console.log('line 27-------------------', response)
    if (response.success) {
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

const permissionCodeArr = permissionCodeArr => ({
  type: globalType.GET_PERMISSION_CODE,
  payload: permissionCodeArr,
})

export const getPermissionCode = () => dispatch => {
  API.findUserPermissionCodes({}).then(response => {
    if(response.success) {
      return dispatch(permissionCodeArr(response.data));
    }
  })
}

export const updateOpenKeys = openKeys => ({
  type: globalType.UPDATE_OPEN_KEYS,
  payload: openKeys,
}) 
