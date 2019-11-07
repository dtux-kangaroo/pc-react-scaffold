import {globalType} from './constant';

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
  try {
   
    API.getNavData(params).then(response =>{
      console.log(globalType,'globalType',response); 
      if (response.success) {
        dispatch(navData(response.data));
      } else {
        //返回失败
      }
    });

  } catch (error) {
    console.log('error: ', error)
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