import React from 'react'

import Chart from './common';

export default class AreaChart extends React.Component {

  constructor(props) {
    super(props)
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
