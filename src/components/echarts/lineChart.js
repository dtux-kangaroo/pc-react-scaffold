import React from 'react'
import 'echarts/lib/chart/line';

import Chart from './common';

export default class LineChart extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { config, option } = this.props;
    return (
      <Chart 
        config={config}
        option={option}
      />
    )
  }
}
