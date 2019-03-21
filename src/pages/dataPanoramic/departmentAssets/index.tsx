import * as React from 'react';
import  './style.scss';

interface initProps{}
export default class DepartmentAssets extends  React.Component<initProps, any>  {
  constructor(props:any) {
    super(props);
  }
  render(){
      return (
          <div>
            部门资产
          </div>
      )
  }
}
