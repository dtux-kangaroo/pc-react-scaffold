import * as React from 'react';

export default class HolidayComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  static getDerivedStateFromProps(props, state) {
    return null;
  }

  render() {
    return (
      <div>
        节假日数据
      </div>
    )
  }
}
