import * as React from 'react';
import Bar from 'components/bar';
import { Row, Col } from 'antd';
const ItemBar = Bar('350px', '12px', ['#EAEBF0', '#5D78FF']);

export default (axis, icons = null) => {
  return (barList) => {
    const sum = barList.reduce((temp, cur) => cur[axis[1]] + temp, 0);
    return (
      <div>
        {
          barList.map((item, index) => (
            <div key={index}>
              <Row style={{ marginBottom: '28px' }}>
                <Col span={6}>
                  <div style={{ width: 'auto', height: '18px', lineHeight: '18px' }}>
                    {icons && <span style={{ marginRight: '10px', verticalAlign: 'middle' }}>{icons[index]}</span>}
                    <span style={{ verticalAlign: 'center' }}>{item[axis[0]]}</span>
                  </div>
                </Col>
                <Col span={18}>
                  {
                    ItemBar(Math.round(item[axis[1]] / sum * 10000) / 100, item[axis[1]] + '%')
                  }
                </Col>
              </Row>
            </div>
          ))
        }
      </div>
    )
  }
}
