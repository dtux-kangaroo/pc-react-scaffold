import React from 'react';
import { Result, Button } from 'antd';
export default function error () {
  return (<Result
    status="500"
    title="500"
    subTitle="抱歉，服务器出错了。"
    // extra={<Button type="primary">Back Home</Button>}
  />)
}