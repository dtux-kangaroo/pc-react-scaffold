import {listType} from './constant';
import { message } from 'antd';
import { API } from "@/api/index.js";

const pageAction = (data) => ({
  type: listType.GET_DATA,
  payload: {
    data,
    reload:true
  }
})
export const getpageAction = (params) => async (dispatch, getState) => {
  try {
		API.getpageAction(params).then(response =>{ 
      if (response.result) {
				dispatch(pageAction(response.data));
			} else {
					//返回失败
			}
    });
  } catch (error) {
      console.log('error: ', error)
  }
}
