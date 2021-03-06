
import {applicationConfigType} from './constant';
import { message } from 'antd';
import http from '../../utils/http'
import apiUrl from '../../constants/apis';
import { browserHistory } from 'react-router';
const applicationConfigData = (data) => ({
  type: applicationConfigType.GET_APPLICATIONCONFIG_DATA,
  payload: data
})
export const getApplicationConfigData = (params) => async (dispatch, getState) => {
  try {
      let response = await http.get(apiUrl.getUserData, params);
      if (response.success) {
          await dispatch(applicationConfigData(response.data));
      } else {
          //返回失败
      }
  } catch (error) {
      console.log('error: ', error)
  }
}
