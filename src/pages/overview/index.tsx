import * as React from 'react';
import StatisticPanel from '@/components/statisticPanel/index';
import CardPanel from '../../components/cardPanel/index';
import { Row, Col } from 'antd';
// import SortBarChart from '../../components/sortedBarChart/index';
import SortedBarChart from '../../components/sortedBarChart/index';

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  static getDerivedStateFromProps(props, state) {
    return null;
  }

  render() {
    return (
      <div>
        <StatisticPanel
          statistics={[
              { title: '停车场总资源', value: 64 },
              { title: '停车位总资源', value: 1000},
              { title: '历史停车位', value: 1289372 },
              { title: '历史总收益', value: 12839720 },
              { title: '历史总收益', value: 12839720 },
              { title: '历史总收益', value: 12839720 },
            ]
          }
          // background="blue"
          gutter={20}
        />
        <Row gutter={20}>
          <Col span={8}>
            <CardPanel
              title="this is title"
              content="this ois content"
              footer="this is footer"
            />
          </Col>
          <Col span={8}>
            <CardPanel
              title="this is title"
              content={<div style={{ width: '100%', height: '20px',borderRadius: '5px', textAlign: 'center', background: 'rgba(100, 100, 84, 0.6)' }}>this is a components</div>}
              footer="footer"
            />
          </Col>
          <Col span={8}>
            <CardPanel
              title="hello, world"
              content="123456上山打老虎"
              footer="nihaoma"
            />
          </Col>
        </Row>
        {/* <SortBarChart></SortBarChart> */}
        <CardPanel
          // className="marginTop20"
          style={{ marginTop: '20px' }}
          title="停车场排名"
          content={
            <SortedBarChart
              barHeight="60px"
              data={[
                { label: '名称1', count: 100, description: '总车位：100', color: 'red', barStyle: {} },
                { label: '名称2', count: 88, description: '总车位：88', color: 'purple', barStyle: {} },
                { label: '名称3', count: 78, description: '总车位：78', color: 'orange', barStyle: {} },
                { label: '名称4', count: 28, description: '总车位：28', color: 'green', barStyle: {} },
              ]}
            />
          }
        />
      </div>
    )
  }
}
