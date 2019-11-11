import * as React from 'react';
import { Row, Col } from 'antd';

import CardPanel from '@/components/cardPanel/index';
import { BarChart } from '@/components/echarts';

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  static getDerivedStateFromProps(props, state) {
    return null;
  }

  render() {
    var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
    var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
    var yMax = 500;
    var dataShadow = [];

    for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }
    return (
      <div>
        <Row>
          <CardPanel
            title="this is title"
            content={
              <span>
                <p style={{ marginTop: '10px' }}>
                  title, content, footer均可以组件的形式传入
              </p>
                <p>
                  若title为文本，给默认样式<br />
                  font-size: 16px;<br />
                  font-family: PingFangSC-Semibold,PingFang SC;<br />
                  font-weight: 600;<br />
                  color: hsl(240, 6%, 19%);<br />
                  line-height: 24px;
              </p>
              </span>
            }
            footer="this is footer"
          />
        </Row>
        <Row className="card-margin" gutter={20}>
          {
            [0, 1, 2].map(() => (
              <Col span={8}>
                <CardPanel
                  title={<span style={{ color: 'rgb(100, 100, 84)', fontSize: '30px', fontWeight: 600 }}>标题</span>}
                  content="内容..."
                  footer={
                    <div>
                      Footer
                </div>
                  }
                />
              </Col>
            ))
          }
        </Row>
        <Row>
          <CardPanel
            content={
              <BarChart
                config={{ height: 400 }}
                option={{
                  xAxis: {
                    data: dataAxis,
                    axisLabel: {
                      inside: true,
                      textStyle: {
                        color: '#fff'
                      }
                    },
                    axisTick: {
                      show: false
                    },
                    axisLine: {
                      show: false
                    },
                    z: 10
                  },
                  yAxis: {
                    axisLine: {
                      show: false
                    },
                    axisTick: {
                      show: false
                    },
                    axisLabel: {
                      textStyle: {
                        color: '#999'
                      }
                    }
                  },
                  dataZoom: [
                    {
                      type: 'inside'
                    }
                  ],
                  series: [
                    { // For shadow
                      type: 'bar',
                      itemStyle: {
                        normal: { color: 'rgba(0,0,0,0.05)' }
                      },
                      barGap: '-100%',
                      barCategoryGap: '40%',
                      data: dataShadow,
                      animation: false
                    },
                    {
                      type: 'bar',
                      itemStyle: {
                        normal: {
                          color: 'rgb(100, 100, 84)'
                        },
                        emphasis: {
                          color: 'rgba(100, 100, 84, 0.6)'
                        }
                      },
                      data: data
                    }
                  ]
                }}
              />
            }
          />
        </Row>
      </div>
    )
  }
}
