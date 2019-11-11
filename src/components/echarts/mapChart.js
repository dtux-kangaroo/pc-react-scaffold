import React from 'react';
import 'echarts/lib/component/geo';
import 'echarts/lib/chart/map'; //引入地图
import 'echarts/lib/chart/lines';
import 'echarts/map/js/china'; // 引入中国地图

import Chart from './common';

export default class MapChart extends React.Component {

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
