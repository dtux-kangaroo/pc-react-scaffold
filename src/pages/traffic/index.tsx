import * as React from "react";
import { connect } from "react-redux";
import * as global from "pages/global/action";
import { Card, Radio } from 'antd';
import PageHeader from 'components/pageHeader';
import HeatMap from 'components/heatMap';
import MapList from 'components/mapList';
import SortedBarChart from 'components/sortedBarChart';
import EmptyData from 'components/emptyData';
import { AreaChart } from 'components/echarts';
import { bindActionCreators } from "redux";
import { API } from '@/api';
import { transCNData, transZJData } from 'utils/geoUtils';
import "./style.scss";

const CN_CENTER = [120, 38];
// const ZJ_CENTER = [122.0, 29.4];

interface IProps {
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
  region: {
    type: string,
    mapOption: {
      type: string,
      zoom: number,
      center: Array<number>
    },
    mapData: any, // Array<object>,
    mapList: {
      title: string,
      type: string
    }
  },
  rankList: any, // Array<object>
}

@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
export default class Traffic extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }
  state: IState = {
    sum: 0,
    changeRate: 0,
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
    region: {
      type: '0',
      mapOption: {
        type: 'china',
        zoom: 4,
        center: CN_CENTER
      },
      mapData: [],
      mapList: {
        title: 'TOP10排行榜',
        type: 'count'
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
    this.updateRegionData();
    this.updateRankData();
  }

  updateAllData(params) {
    this.updateTrendData(params);
    this.updateRegionData();
  }

  updateSum(params) {
    API.getTrafficTrendData().then(res => {
      if (res && res.result) {
        this.setState({
          sum: res.data.parkingTotalFlow,
          changeRate: res.data.parkingTotalFlowGrowthRate
        });
      }
    })
  }

  updateTrendData(params) {
    API.getTrafficTrendData().then(res => {
      if (res && res.result) {
        const { trend } = this.state;
        trend.option.xAxis.data = res.data.x;
        trend.option.series[0].data =  res.data.y;
        this.setState({
          trend
        });
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

  updateRegionData() {
    API.getTrafficRegionData().then(res => {
      if (res && res.result) {
        const { region } = this.state;
        if (region.mapOption.type == 'china') {
          region.mapData = transCNData(res.data);
        } else {
          region.mapData = transZJData(res.data);
        };
        this.setState({
          region
        })
      }
    })
  }

  render() {
    const { sum, changeRate, trend, region, rankList } = this.state;
    return (
      <div className="comp-traffic">
        <PageHeader title="车流数据" hasTimeSelect={true} />
        <Card title={<span className="card-title">车流量趋势分析</span>}>
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
            trend.option.series[0].data.length > 0 ?
            <AreaChart option={trend.option} config={trend.config} /> :
            <EmptyData />
          }
        </Card>
        <Card title={<span className="card-title">停车流量排名TOP10</span>} style={{ margin: "20px 0" }}>
          {
            rankList.length > 0 ?
            <SortedBarChart barHeight="60px" data={rankList} /> : 
            <EmptyData />
          }
        </Card>
        <Card style={{ margin: "20px 0" }} title={
          <>
            <span className="card-title">车辆来源地TOP10</span>
            <Radio.Group style={{ position: 'absolute', right: '20px', marginTop: '-2px' }} defaultValue="0">
              <Radio.Button style={{ width: '60px', height: '28px', lineHeight: '28px' }} value="0">全国</Radio.Button>
              <Radio.Button style={{ width: '60px', height: '28px', lineHeight: '28px' }} value="1">本省</Radio.Button>
            </Radio.Group>
          </>
        }>
          <div style={{ height: '550px', position: 'relative' }}>
            <HeatMap option={region.mapOption} data={region.mapData}></HeatMap>
            {
              region.mapData.length > 0 && <MapList data={region.mapData} option={region.mapList} />
            }
          </div>
        </Card>
      </div>
    );
  }
}
