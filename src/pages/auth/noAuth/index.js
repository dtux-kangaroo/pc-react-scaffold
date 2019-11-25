import React from 'react';
import { Result, Button } from 'antd';
export default function noAuth () {
  return (<Result
    status="403"
    title="403"
    subTitle="抱歉，你无权访问该页面。"
  // extra={<Button type="primary">Back Home</Button>}
  />)
}