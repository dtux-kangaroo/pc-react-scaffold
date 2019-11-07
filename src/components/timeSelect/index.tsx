import * as React from "react";
import { connect } from 'react-redux';
import * as global from "pages/global/action";
import * as moment from "moment";
import { bindActionCreators } from "redux";
import { Select, DatePicker } from 'antd';
import './style.scss';

const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;

@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
export default class TimeSelect extends React.Component<any> {
  constructor(props) {
    super(props);
  }

  state: any = {
    date: moment(),
    start: moment(0)
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { timeFilter } = nextProps;
    this.setState({
      date: this.parseDate(timeFilter.type, timeFilter.name)
    });
  }

  parseDate = (type: string, dateString: string) => {
    switch (type) {
      case '0':
        return moment(dateString);
      case '1':
        return moment(dateString);
      case '2':
        return dateString.split('->').map(ds => moment(ds));
    }
  }

  handleTypeChange = (type: string) => {
    this.props.updateTimeFilterType(type);
  }

  handleDateChange = (date, dateString) => {
    const { updateTimeFilterName, timeFilter } = this.props;
    console.log(date);
    
    this.setState({
      date,
      start: moment(0)
    });
    if (timeFilter.type === '2') {
      updateTimeFilterName(dateString.join('->'));
    } else {
      updateTimeFilterName(dateString);
    }
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