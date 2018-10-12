import React from 'react';
import {Layout} from 'antd';
import BasicLayout from '@/layouts/BasicLayout';
import './style.scss';
const {Content} = Layout;
export default class ContentLayout extends React.PureComponent{
  render(){
    const {children} = this.props;
    return (
      <BasicLayout className="layout-content">
        <Content className="content">
          {children}
        </Content>
      </BasicLayout>
    )
  }
}