import * as React from 'react';

import { LineChart } from '@/components/echarts';

export default class CurrentFlowTrend extends React.Component {
  constructor(props) {
    super(props);
  }

  static getDeriveStateFromProps(props, state) {
    return null;
  }

  render() {
    const polyLineData = {
      x: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00', '2:00', '4:00', '6:00', '8:00'],
      y: [[10, 120, 30, 25, 121, 50, 56, 48, 88, 26, 60, 0, 12]],
      legend: ["类型一", "类型二"]
    }
    return (
      <LineChart
        config={{ height: '400px' }}
        option={{
          xAxis: {
            type: 'category',
            data: polyLineData.x,
            name: '时间',
            boundaryGap: false
          },
          visualMap: {
            show: false,
            dimension: 0,
            pieces: [{
              lte: 5,
              color: 'rgb(85, 162, 238)'
            }, {
              gt: 5,
              lte: 8,
              color: 'rgb(233, 103, 142)',
            },{
              gt: 8,
                color: 'rgb(233, 103, 142)',
            }]
          },
          yAxis: {
            type: 'value',
            name: 'value name',
            max: 140,
          },
          series: [{
            data: polyLineData.y[0],
            type: 'line',
          },
          // {
          //   data: [140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140],
          //   type: 'line',
          //   areaStyle: {
          //     // color: 'red',
          //   },
          //   lineStyle: {
          //     color: 'transparent',
          //   },
          //   symbol: 'none',
          //  }
        ],
          tooltips: {
            show: true,
            trigger: 'axis',
          },
          grid: {
            show: true,
            top: 40,
            left: 80,
            right: 80,
            bottom: 40,
          }
        }}
      />
    )
  }
}
