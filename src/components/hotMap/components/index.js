import React, { Component } from "react";
import { Row, Col } from 'antd';
import Bar from '../bar';
import './style.scss';

// const FIRST_COLOR = '#FFB822';
// const SECOND_COLOR = '#08BB87';
// const THIRD_COLOR = '#1DC9B7';
// const EMPTY_COLOR = '#EAEBF0';
const colorArr = ['#FFB822', '#08BB87', '#1DC9B7', '#98AAFF', '#A2B2FF', '#ADBBFF', '#B6C3FF', '#C1CCFF', '#CBD4FF', '#D6DDFF'];

export default class MapList extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    let { option, data } = this.props;
    data = data.slice(0, 10).sort((a, b) => {
      if (a.key && b.key) {
        return (b.value + b.key / 100000000) - (a.value + a.key / 100000000) //key为行政区码，适配地图组件
      } else {
        return b.value - a.value
      }
    });
    return (
      <div className="comp-list">
        <p className="title">{option.title}</p>
        <ul>
          {
            data.map((item, index) => (
              <li className="list-li" key={index}>
                <Row>
                  <Col span={7} className="preCol">
                    {/* <div
                      className="circle"
                      style={{ 'background': index == 0 ? FIRST_COLOR : (index == 1 ? SECOND_COLOR : (index == 2 ? THIRD_COLOR : `rgba(93,120,255,${1 - ((index - 3) * 0.15) ** 2})`)) }}>
                      {index + 1}
                    </div> */}
                    <div
                      className="circle"
                      style={{ 'background': colorArr[index] }}>
                      {index + 1}
                    </div>
                    <span className="text">{item.name}</span>
                  </Col>
                  <Col span={16} offset={1}>
                    {
                      // Bar('150px', '12px', [EMPTY_COLOR, index == 0 ? FIRST_COLOR : (index == 1 ? SECOND_COLOR : (index == 2 ? THIRD_COLOR : `rgba(93,120,255,${1 - ((index - 3) * 0.15) ** 2})`))], '3px', 'space-between')(Math.round(item.value / data[0].value * 100), item.value + (option.type == 'percent' && '%'))
                      Bar('85%', '12px', ['#EAEBF0', colorArr[index]], '3px', 'space-between')(Math.round(item.value / data[0].value * 100) || 0, item.value + (option.type == 'percent' && '%'))
                    }
                  </Col>
                </Row>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}