import * as React from 'react';

export default class CurrentData extends React.Component {
  constructor(props) {
    super(props);
  }
  
  static getDerivedStateFromProps(props, state) {
    return null;
  }

  render() {
    return (
      <div>
        当日数据
      </div>
    )
  }

}
