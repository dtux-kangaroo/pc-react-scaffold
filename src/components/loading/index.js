import React from 'react';
import { Spin } from 'antd';
import './style.scss';
export default function Loading() {
  return <div className="component-loading">
    <Spin size="large" tip="努力加载中..."/>
  </div>
}