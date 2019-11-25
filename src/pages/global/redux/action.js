import { globalType } from './constant';
import { message } from 'antd';
import { formatCode } from "@/utils";

const navData = (data) => ({
  type: globalType.GET_NAV_DATA,
  payload: data
})
export const getNavData = (params) => async (dispatch, getState, { API }) => {
  try {
    API.getNavData(params).then(response => {
      const { result, data, result_message } = response;
      if (result) {
        dispatch(navData(data));
      } else {
        message.error(result_message)
      }
    });
  } catch (error) {
    console.log('error: ', error)
  }
}

const authCode = (data) => ({
  type: globalType.GET_AUTH_CODE,
  payload: data
})
export const getAuthCode = (params) => async (dispatch, getState, { API }) => {
  try {
    API.getAuthCode(params).then(response => {
      const { result, data, result_message } = response;
      if (result) {
        let tempData = formatCode(data || []);
        dispatch(authCode(tempData));
      } else {
        message.error(result_message)
      }
    });
  } catch (error) {
    console.log('error: ', error)
  }
}

export const setOpenKeys = (keys) => {
  return {
    type: globalType.OPEN_KEYS,
    payload: keys
  }
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

export const resetTimeFilter = () => {
  return {
    type: globalType.RESET_TIMEFILTER
  }
}
