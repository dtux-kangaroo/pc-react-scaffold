import {listType} from './constant';
import { API } from "@/api/index.js";

const userList = (data) => ({
  type: listType.GET_DATA,
  payload: {
    data,
    reload:true
  }
})
export const getUserList = (params) => async (dispatch, getState) => {
  try {
    API.getUserList(params).then(response =>{ 
      if (response.success) {
        dispatch(userList(response.data));
      } else {
        //返回失败
      }
    });
  } catch (error) {
    console.log('error: ', error)
  }
}
