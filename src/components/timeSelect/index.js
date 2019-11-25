import React, { Component } from 'react';
import { Select, DatePicker } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import * as global from "pages/global/redux/action";
import { bindActionCreators } from "redux";
import './style.scss';

const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;
const parseDate = (type, dateString) => {
  switch (type) {
    case '0':
      return moment(dateString);
    case '1':
      return moment(dateString);
    case '2':
      return dateString.split('->').map(ds => moment(ds));
  }
}

@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
export default class TimeSelect extends Component {
	constructor(props) {
		super(props);
  }
  
	state = {
		date: moment(),
		start: moment(0),
	}

	static getDerivedStateFromProps(nextProps) {
    const { timeFilter } = nextProps;
    return {
      date: parseDate(timeFilter.type, timeFilter.name)
    }
  }
  
	handleTypeChange = (type) => {
		const { updateTimeFilterType, updateTimeFilterName } = this.props;
		updateTimeFilterType(type);
		if(type === '0') {
			updateTimeFilterName(moment().subtract(1, 'days').format('YYYY-MM-DD'));
		} else if(type === '1') {
			updateTimeFilterName(moment().format('YYYY-MM'));
		}
	}

	disabledDate = (current) => {
		return current >= moment().startOf('day');
	}

  handleCalendarChange = ([start]) => {
    this.setState({ start });
  }

  disabledDate = current => {
    return current >= moment().startOf('day');
  }

  disabledDateRange = current => {
    return current >= moment().startOf('day') || current <= this.state.start;
  }

  renderDatePicker = () => {
    const attributes = {
      value: this.state.date,
      onChange: this.handleDateChange,
      allowClear: false,
      disabledDate: this.disabledDate
    }
    switch (this.props.timeFilter.type) {
      case '0':
        return <DatePicker {...attributes} />
      case '1':
        return <MonthPicker {...attributes} />
      case '2':
        return <RangePicker {...attributes} onCalendarChange={this.handleCalendarChange} />
    }
  }

  render() {
    return (
      <div className="f-fr">
        <span>时间筛选：</span>
        <Select style={{ width: 90 }} value={this.props.timeFilter.type} onChange={this.handleTypeChange}>
          <Option value="0">自然天</Option>
          <Option value="1">自然月</Option>
          <Option value="2">自定义</Option>
        </Select>&nbsp;&nbsp;
        {
          this.renderDatePicker()
        }
      </div>
    )
  }
}