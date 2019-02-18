
import {smallCamelType} from './constant';
import { API } from "@/api/index.js";

const smallCamelData = (data) => ({
  type: smallCamelType.GET_TYPE_DATA,
  payload: data
})
export const getbigCamelData = (params) => async (dispatch, getState) => {
  try {
    API.getUserData(params).then(response =>{ 
      if (response.success) {
        dispatch(smallCamelData(response.data));
      } else {
        //返回失败
      }
    });
  } catch (error) {
      console.log('error: ', error)
  }
}
