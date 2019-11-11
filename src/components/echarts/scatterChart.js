import React from 'react'
import 'echarts/lib/chart/scatter'

import Chart from './common';

export default class ScatterChart extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { config, option } = this.props;
    return <Chart
      config={config}
      option={option}
    />
  }
}
