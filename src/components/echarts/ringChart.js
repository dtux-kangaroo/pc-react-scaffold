import React from "react";
import "echarts/lib/chart/pie";

import Chart from './common';

export default class PieChart extends React.Component {
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
