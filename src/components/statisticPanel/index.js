import React from 'react';
import { Row, Col } from 'antd';

import './style.scss';

export const StatisticPanel = (props) => {

  const { gutter = 20, statistics, background = '#fff', style = {}, classNames = ''} = props;
  const mergedStyle = Object.assign(style, { background });
  const span = Math.floor(24 / statistics.length);
  return (
    <div className={`statistics-panel ${classNames}`}>
      <Row gutter={gutter}>
        {
          statistics.map((statistic, index) => (
            <Col span={span} key={index}>
              <div className="panel-card" style={mergedStyle}>
                <div className="card-title">
                  {statistic.title}
                </div>
                <div className="card-value">
                  {statistic.value}
                </div>
              </div>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}
