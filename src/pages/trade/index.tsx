import * as React from "react";
import { connect } from "react-redux";
import * as global from "pages/global/action";
import { bindActionCreators } from "redux";
import { Card, Row, Col } from 'antd';
import { PieChart } from 'components/echarts';
import "./style.scss";

interface IProps {
}

interface IState {
  changeRate: number,
  channel: {
    option: any,
    config: {
      height: number
    }
  }
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
    changeRate: 0,
    channel: {
      option: {},
      config: {
        height: 340
      }
    }
  };
  componentDidMount() {
  }
  render() {
    const { changeRate, channel } = this.state;
    return (
      <div className="comp-trade">
        <Card title={<span className="card-title">收益趋势分析</span>} style={{ margin: "20px 0" }}>
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
        <Card title={<span className="card-title">停车收益排名TOP10</span>} style={{ margin: "20px 0" }}>
        </Card>
        <Card title={<span className="card-title">收益渠道分析</span>} style={{ margin: "20px 0" }}>
          <Row gutter={20}>
            <Col span={10}>
              <PieChart option={channel.option} config={channel.config} />
            </Col>
            <Col span={14}></Col>
          </Row>
        </Card>
      </div>
    );
  }
}
