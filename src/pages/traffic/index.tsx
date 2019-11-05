import * as React from "react";
import { connect } from "react-redux";
import * as global from "pages/global/action";
import { Card, Radio } from 'antd';
import HeatMap from 'components/heatMap'
import MapList from 'components/mapList'
import { bindActionCreators } from "redux";
import "./style.scss";

const CN_CENTER = [120, 38];
// const ZJ_CENTER = [122.0, 29.4];

interface IProps {
}

interface IState {
  changeRate: number,
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
      type: string | undefined
    }
  }
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
    changeRate: 0,
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
        type: undefined
      }
    }
  };
  componentDidMount() {
  }
  render() {
    const { changeRate, region } = this.state;
    return (
      <div className="comp-traffic">
        <Card title={<span className="card-title">车流量趋势分析</span>} style={{ margin: "20px 0" }}>
          <div>
            总车流量<span style={{ fontSize: '18px', margin: '0 30px 0 15px' }}>2000</span>较前一时段
            {
              changeRate >= 0
                ? <img src="assets/imgs/arrow-up.png" style={{ margin: '-5px 5px 0 10px' }} alt="上升" />
                : <img src="assets/imgs/arrow-down.png" style={{ margin: '-5px 5px 0 10px' }} alt="下降" />
            }
            <span style={{ fontSize: '18px' }}>{changeRate + '%'}</span>
          </div>
        </Card>
        <Card title={<span className="card-title">停车流量排名TOP10</span>} style={{ margin: "20px 0" }}>
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
          <div style={{ height: '550px', 'marginTop': '-24px' }}>
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
