import actionTypes from './actionTypes';
import {message as Message} from 'antd';
//获取用户数据
export const getUserData = (params) => async (dispatch, getState, { API }) => {
    const response = await API.getUserData(params);
    const {success,message} = response;
    if (success) {
      dispatch({
          type:actionTypes.GET_USER_DATA,
          payload:response.data
      });
    } else {
        Message.error(message)
    }
}
//获取侧边栏数据
export const getNavData = (params) => async (dispatch, getState,{ API }) => {
    const response = await API.getNavData(params);
    const {success,message} = response;
    if (success) {
      dispatch({
          type: actionTypes.GET_NAV_DATA,
          payload: response.data
      })
    } else {
        Message.error(message)
    }
}


