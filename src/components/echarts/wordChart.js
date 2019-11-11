import React from 'react'
require('echarts-wordcloud');

import Chart from './common';

export default class WordChart extends React.Component {

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
