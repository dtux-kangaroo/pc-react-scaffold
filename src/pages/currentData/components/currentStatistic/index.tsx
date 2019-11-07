import * as React from 'react';

export default class CurrentStatistic extends React.Component {
  constructor(props) {
    super(props);
  }

  static getDeriveStateFromProps(props, state) {
    return null;
  }

  render() {
    return (
      <div>
        hello, current statistic
      </div>
    )
  }
}
