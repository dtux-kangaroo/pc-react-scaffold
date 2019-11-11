
const createType=(keys:any)=>{
  let obj={};
  keys.forEach(item=>{
    obj[item]=item;
  })
  return obj as GlobalType;
}

interface GlobalType{
  GET_USER_DATA: 'GET_USER_DATA',
  GET_NAV_DATA: 'GET_NAV_DATA',
  // GET_USER_DATA:string
  UPDATE_TIMEFILTER_NAME: 'UPDATE_TIMEFILTER_NAME',
  UPDATE_TIMEFILTER_TYPE: 'UPDATE_TIMEFILTER_TYPE',
  GET_PERMISSION_CODE: 'GET_PERMISSION_CODE',
  UPDATE_OPEN_KEYS: 'UPDATE_OPEN_KEYS',
}

export const globalType: GlobalType = createType(
  [
  'GET_USER_DATA',
  'GET_NAV_DATA',
  'UPDATE_TIMEFILTER_NAME',
  'UPDATE_TIMEFILTER_TYPE',
  'GET_PERMISSION_CODE',
  'UPDATE_OPEN_KEYS',
 ]
);

