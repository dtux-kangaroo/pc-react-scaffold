import * as React from "react";
import { Select } from 'antd';
import { connect } from 'react-redux';
import * as global from "pages/global/action";
import { bindActionCreators } from "redux";
import './style.scss';

const { Option } = Select;

@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
export default class TimeSelect extends React.Component<any> {
  constructor(props) {
    super(props);
  }

  handleTypeChange = value => {
    this.props.updateTimeFilter(value);
  }

  render() {
    return (
      <div className="f-fr">
        <span>时间筛选：</span>
        <Select style={{ width: 80 }} value={this.props.timeFilter} onChange={this.handleTypeChange}>
          <Option value="0">本周</Option>
          <Option value="1">本月</Option>
          <Option value="2">本年</Option>
        </Select>&nbsp;&nbsp;
      </div>
    )
  }
}