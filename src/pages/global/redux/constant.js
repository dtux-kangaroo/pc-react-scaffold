const createType=(keys)=>{
    let obj={};
    keys.forEach(item=>{
      obj[item]=item;
    })
    return obj;
  }
  
  export const globalType= createType(
    [
        "GET_AUTH_CODE",
        "GET_NAV_DATA",
        "OPEN_KEYS",
        "UPDATE_MENU",
        "UPDATE_TIMEFILTER_TYPE",
        "UPDATE_TIMEFILTER_NAME",
        "RESET_TIMEFILTER"
   ]
  );