import * as React from 'react';

import CardPanel from '@/components/cardPanel';
import StatisticPanel from "@/components/statisticPanel";
import CurrentFlowTrend from "./components/currentFlowTrend";
import ParkDetailForm from './components/parkDetailForm';
import CurrentProfitTrend from './components/currentProfitTrend';

export default class CurrentData extends React.Component {
  constructor(props) {
    super(props);
  }
  
  static getDerivedStateFromProps(props, state) {
    return null;
  }

  render() {
    return (
      <div>
        {/* 当日数据 */}
        <StatisticPanel
          statistics={[
            { title: '当日总车流量', value: 2000 },
            { title: '当日总收益额', value: 1000 },
          ]}
        />

        <CardPanel
          className="card-margin"
          title="当日流量趋势"
          content={
            <div style={{ marginTop: '10px' }}>
              <CurrentFlowTrend />
            </div>
          }
          footer="ccccc"
        />

        <CardPanel
          title="当日收益趋势"
          content={
            <div>
              <CurrentProfitTrend />
            </div>
          }
        />

        <CardPanel
          className="card-margin"
          title="当前停车场情况"
          content={
            <div style={{ marginTop: '10px' }}>
              <ParkDetailForm />
            </div>
          }
        />
      </div>
    )
  }

}
