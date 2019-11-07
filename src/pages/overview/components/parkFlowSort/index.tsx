import * as React from 'react';

import SortedBarChart from '@/components/sortedBarChart';

export default class ParkFlowSort extends React.Component {
  constructor(props) {
    super(props);
  }

  static getDerivedStateFromProps(props, state) {
    console.log('render......')
    return null;
  }

  render() {
    return (
      <SortedBarChart
        barHeight="40px"
        data={[
          { label: '名称1', count: 180, description: '总车位：180', color: 'linear-gradient(to right,rgb(255, 213, 51), rgb(255, 181, 93))', barStyle: { borderRadius: '10px' } },
          { label: '名称2', count: 88, description: '总车位：88', color: 'linear-gradient(to right,rgb(255, 213, 51), rgb(255, 181, 93))', barStyle: {} },
          { label: '名称3', count: 78, description: '总车位：78', color: 'linear-gradient(to right,rgb(255, 213, 51), rgb(255, 181, 93))', barStyle: {} },
          { label: '名称4', count: 200, description: '总车位：78', color: 'linear-gradient(to right,rgb(255, 213, 51), rgb(255, 181, 93))', barStyle: {} },
          { label: '名称5', count: 28, description: '总车位：28', color: 'linear-gradient(to right, rgb(32, 191, 251), rgb(68, 161, 251))', barStyle: {} },
          { label: '名称6', count: 27, description: '总车位：27', color: 'linear-gradient(to right, rgb(32, 191, 251), rgb(68, 161, 251))', barStyle: {} },
          { label: '名称7', count: 25, description: '总车位：25', color: 'linear-gradient(to right, rgb(32, 191, 251), rgb(68, 161, 251))', barStyle: {} },
          { label: '名称8', count: 25, description: '总车位：25', color: 'linear-gradient(to right, rgb(32, 191, 251), rgb(68, 161, 251))', barStyle: {} },
          { label: '名称9', count: 25, description: '总车位：25', color: 'linear-gradient(to right, rgb(32, 191, 251), rgb(68, 161, 251))', barStyle: {} },
          { label: '名称10', count: 25, description: '总车位：25', color: 'linear-gradient(to right, rgb(32, 191, 251), rgb(68, 161, 251))', barStyle: {} },
        ]}
      />
    )
  }

}