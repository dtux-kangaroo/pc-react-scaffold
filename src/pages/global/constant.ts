
const createType=(keys:any)=>{
  let obj={};
  keys.forEach(item=>{
    obj[item]=item;
  })
  return obj;
}

// interface globalType{
//   GET_USER_DATA:string,
//   GET_NAV_DATA:string,
//   //GET_USER_DATA:string
// }

export const globalType:any= createType(
  [
  'GET_USER_DATA',
  'GET_NAV_DATA'
 ]
);

