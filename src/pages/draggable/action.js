
import {applicationConfigType} from './constant';
import { API } from "@/api/index.js";
const applicationConfigData = (data) => ({
  type: applicationConfigType.GET_APPLICATIONCONFIG_DATA,
  payload: data
})
export const getApplicationConfigData = (params) => async (dispatch, getState) => {
  try {
    API.getUserData(params).then(response =>{ 
      if (response.success) {
        dispatch(applicationConfigData(response.data));
      } else {
        //返回失败
      }
    });
  } catch (error) {
    console.log('error: ', error)
  }
}
