import React from 'react';
import { Result, Button } from 'antd';
export default function noAuth () {
  return (<Result
    status="404"
    title="404"
    subTitle="抱歉，你访问的页面不存在。"
  // extra={<Button type="primary">Back Home</Button>}
  />)
}