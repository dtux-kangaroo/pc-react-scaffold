import * as React from 'react';
import  './style.scss';

interface initProps{}
export default class PersionalAssets extends  React.Component<initProps, any>  {
  constructor(props:any) {
    super(props);
  }
  render(){
      return (
          <div>
            个人资产
          </div>
      )
  }
}
