import React from 'react';
import { Empty } from 'antd';

function EmptyData (props) {
  const { height = '60px', marginTop = 0 } = props;
  return (
    <Empty className="empty"
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      imageStyle={{
        width: '100%',
        height: height,
        marginTop: marginTop,
      }}
    />
  )
}

export default EmptyData;
