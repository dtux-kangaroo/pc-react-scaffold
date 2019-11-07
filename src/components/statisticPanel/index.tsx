import * as React from 'react';
import { Row, Col } from 'antd';

import './style';

interface Statistic {
  title: any;
  value: any;
}

interface IProps {
  statistics: Statistic[];
  calssName?: string;
  gutter?: number;
  background?: string;
  style?: any;
}

const StatisticPanel: React.FC<IProps> = (props) => {

  const { gutter = 20, statistics, background = '#fff', style = {}, calssName } = props;
  const mergedStyle = Object.assign(style, { background });
  const span = Math.floor(24 / statistics.length);
  return (
    <div className={`statistics-panel ${calssName}`}>
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

export default StatisticPanel;
