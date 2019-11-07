import * as React from 'react';
import { Row } from 'antd';

import './style';

export interface SortedBarData {
  label: any;
  count: number;
  description: any;
  color: string;
  barStyle?: Object;
}

interface IProps {
  barHeight?: string;
  data: SortedBarData[];
}

const max = (nums: number[]) => {
  let max = nums[0];
  for(let i = 1; i < nums.length; i++) {
    if(max < nums[i]) {
      max = nums[i];
    }
  }
  return max;
}

const SortedBarChart: React.FC<IProps> = (props) => {
  const { barHeight = '40px', data } = props;
  return (
    <div className="sorted-bar-chart">
      {
        data && data.length > 0 && data.map((item, index) => (
          <Row key={index}>
            <div className="bar-row">
              <div className="bar-row-left">
                <LabelBlock
                  barHeight={barHeight}
                  item={item}
                  index={index}
                />
                <BarBlock
                  barHeight={barHeight}
                  data={data}
                  item={item}
                />
              </div>
              <div className="bar-row-right" style={{ height: barHeight }}>
                <div className="desc-wrapper">
                  {item.description}
                </div>
              </div>
            </div>
          </Row>
        ))
      }
    </div>
  )
}

interface Props {
  item: SortedBarData;
  barHeight: string;
  index: number;
}

const LabelBlock: React.FC<Props> = (props) => {
  const { barHeight, item, index } = props;
  return (
    <div className="label-block" style={{ height: barHeight }}>
      <div className="label-wrapper">
        {
          typeof item.label === 'string' ? (
            <>
              <div className="square" style={{ background: item.color }}>{index + 1}</div>
              {item.label}
            </>
          ) : (
              item.label
            )
        }
      </div>
    </div>
  )
}

const BarBlock = (props) => {
  const defaultStyle = {
    height: '10px',
    background: 'rgb(36, 187, 251)',
  }
  const { barHeight, item, data} = props;
  const maxValue = max(data.map(item => item.count));
  return (
    <div className="bar-block" style={{ height: barHeight }}>
      <div className="bar-wrapper">
        <div style={Object.assign({}, defaultStyle, { width: `${item.count / maxValue * 100}%`, background: item.color }, item.barStyle ? item.barStyle : {})}></div>
      </div>
    </div>
  )
}

export default SortedBarChart;
