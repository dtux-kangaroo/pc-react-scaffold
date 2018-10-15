import mirror from 'mirror-creator';
export const actionTypes = mirror([
  'CHANGE_DATA',
  'CHANGE_LOADING_STATUS',
],'{{name[0].toLowerCase()+name.substring(1)}}/');

export const sexs = [
  {
    label:'男',
    value:1
  },
  {
    label:'女',
    value:2
  }
]



