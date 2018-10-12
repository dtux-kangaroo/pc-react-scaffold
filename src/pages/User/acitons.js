import {listType} from './constant';
import { message as Message } from 'antd';


//获取用户列表
export const getUserList = (params) => async (dispatch, getState,{API}) => {
    dispatch({
        type: listType.CHANGE_LOADING_STATUS,
        payload: true
    })
    const response = await API.getUserList(params);
    const {success,message,data} = response;
    if (success) {
        dispatch({
            type: listType.GET_DATA,
            payload: data
        });
    } else {
        Message.error(message);
    }
}
