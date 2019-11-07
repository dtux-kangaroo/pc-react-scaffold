import * as React from 'react';

import CardPanel from '@/components/cardPanel/index';
// import { LineChart } from '@/components/echarts';
import OverviewStatistic from './components/overviewStatistic';
import ParkSpaceSort from './components/parkSpaceSort';
import ParkFlowSort from './components/parkFlowSort';
import ParkProfitSort from './components/parkProfitSort';

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
        <OverviewStatistic/>
        <CardPanel
          className="card-margin"
          title="停车场车位排名Top10"
          content={
            <div style={{ marginTop: '10px' }}>
              <ParkSpaceSort />
            </div>
          }
        />

        <CardPanel
          className="card-margin"
          title="停车场流量排名Top10"
          content={
            <div style={{ marginTop: '10px' }}>
              <ParkFlowSort />
            </div>
          }
        />

        <CardPanel
          className="card-margin"
          title="停车场收益排名Top10"
          content={
            <div style={{ marginTop: '10px' }} >
              <ParkProfitSort />
            </div>
          }
        />
      </div>
    )
  }
}
