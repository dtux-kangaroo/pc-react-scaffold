import * as React from "react";
import { connect } from "react-redux";
import * as global from "pages/global/action";
import { bindActionCreators } from "redux";
import { Card, Row, Col } from 'antd';
import { AreaChart, PieChart } from 'components/echarts';
import PageHeader from 'components/pageHeader';
import BarList from './components/barList';
import SortedBarChart from 'components/sortedBarChart';
import EmptyData from 'components/emptyData';
import { API } from '@/api';
import "./style.scss";

const ChannelBarList = BarList(['name', 'value']);

interface IProps {
  globalData: any
}

interface IState {
  sum: number,
  changeRate: number,
  trend: {
    option: any,
    config: {
      height: number
    }
  },
  channel: {
    option: any,
    config: {
      height: number
    }
  },
  rankList: any
}

@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
export default class Trade extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }
  state: IState = {
    sum: 0,
    changeRate: 0,
    channel: {
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}: {d}%'
        },
        series: [{
          name: '收益渠道',
          type: 'pie',
          radius: ['40%', '60%'],
          label: {
            normal: {
              formatter: '{b| {b}}\n{d| {d}%}',
              rich: {
                b: {
                  fontSize: '14',
                  color: '#A6A6B3'
                },
                d: {
                  fontSize: '18',
                  color: '#2E2E34'
                }
              }
            }
          },
          data: [{
            name: '111',
            value: 111
          }, {
            name: '222',
            value: 222
          }],
          hoverAnimation: false,
        }]
      },
      config: {
        height: 360
      }
    },
    trend: {
      option: {
        grid: {
          top: 50,
          bottom: 20,
          left: 50,
          right: 30
        },
        xAxis: {
          type: 'category',
          data: ['2019-11-1', '2019-11-2'],
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        series: [{
          data: [100, 200],
          type: 'line',
          smooth: true,
          // symbol: 'none',
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          },
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#5D78FFFF'
              }, {
                offset: 1, color: '#5D78FF00'
              }],
            }
          },
          symbol: 'none',
        }]
      },
      config: {
        height: 360
      }
    },
    rankList: []
  };
  componentDidMount() {
    // const { timeFilter } = this.props.globalData;
    // this.updateAllData({
    // 	type: timeFilter.type,
    // 	time: timeFilter.name
    // });
    this.updateRankData();
  }

  updateAllData(params) {
    this.updateSum(params);
    this.updateTrendData(params);
    this.updateChannelData(params);
  }

  updateSum(params) {
    API.getTrafficTrendData().then(res => {
      if (res && res.result) {
        this.setState({
          sum: res.data.parkingTotalProfit,
          changeRate: res.data.parkingTotalProfitGrowthRate
        });
      }
    })
  }

  updateTrendData(params) {
    API.getTradeTrendData().then(res => {
      if (res && res.result) {
        const { trend } = this.state;
        trend.option.xAxis.data = res.data.x;
        trend.option.series[0].data = res.data.y;
        this.setState({
          trend
        });
      }
    });
  }

  updateChannelData(params) {
    API.getTradeTrendData().then(res => {
      if (res && res.result) {
        const { channel } = this.state;
        let data = res.data, arr = [];
        data.foreach(item => {
          arr.push({
            name: item.channelName,
            value: item.channelNum
          });
        });
        channel.option.series[0].data = arr;
        this.setState({
          channel
        })
      }
    })
  }

  updateRankData() {
    API.getTrafficRankData().then(res => {
      if (res && res.result) {
        let list = res.data;
        list.forEach((item, value) => {
          if (value < 3) {
            item.color = '#fccb05';
            item.barStyle = {
              background: 'linear-gradient(90deg, #fccb05, #f5804d)',
              borderRadius: '5px'
            };
          } else {
            item.color = '#248ff7';
            item.barStyle = {
              background: 'linear-gradient(90deg, #248ff7, #6851f1)',
              borderRadius: '5px'
            };
          }
        });
        this.setState({
          rankList: list
        })
      }
    })
  }

  render() {
    const { sum, changeRate, trend, channel, rankList } = this.state;
    return (
      <div className="comp-trade">
        <PageHeader title="交易数据" hasTimeSelect={true} />
        <Card title={<span className="card-title">收益趋势分析</span>}>
          <div style={{ margin: '10px 0 20px' }}>
            总车流量<span style={{ fontSize: '18px', margin: '0 30px 0 15px' }}>{sum}</span>较前一时段
            {
              changeRate >= 0
                ? <img src="assets/imgs/arrow-up.png" style={{ margin: '-5px 5px 0 10px' }} alt="上升" />
                : <img src="assets/imgs/arrow-down.png" style={{ margin: '-5px 5px 0 10px' }} alt="下降" />
            }
            <span style={{ fontSize: '18px' }}>{changeRate + '%'}</span>
          </div>
          {
            trend.option.series[0].data.length > 0 && <AreaChart option={trend.option} config={trend.config} />
          }
        </Card>
        <Card title={<span className="card-title">停车收益排名TOP10</span>} style={{ margin: "20px 0" }}>
          {
            rankList.length > 0 ?
              <SortedBarChart barHeight="60px" data={rankList} /> :
              <EmptyData />
          }
        </Card>
        <Card title={<span className="card-title">收益渠道分析</span>} style={{ margin: "20px 0" }}>
          <Row gutter={20} type="flex" justify="space-around" align="middle">
            {
              channel.option.series[0].data.length > 0 ?
                <>
                  <Col span={10}>
                    <PieChart option={channel.option} config={channel.config} />
                  </Col>
                  <Col span={14}>
                    {
                      ChannelBarList(channel.option.series[0].data)
                    }
                  </Col>
                </> :
                <EmptyData />
            }
          </Row>
        </Card>
      </div>
    );
  }
}
