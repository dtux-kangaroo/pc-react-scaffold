import React from "react";
import "echarts/lib/chart/gauge";

import Chart from "./common";

export default class GuageChart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { config, option } = this.props;
    return <Chart
      config={config}
      option={option}
    />
  }
}
