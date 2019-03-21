import * as React from 'react';
import  './style.scss';

interface initProps{}
export default class CategoryAssets extends  React.Component<initProps, any>  {
  constructor(props:any) {
    super(props);
  }
  render(){
      return (
          <div>
            类目资产
          </div>
      )
  }
}
