import * as React from 'react';

interface IState {}
interface IProps {}

export default class extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  static getDeriveStateFromProps(props, state) {
    console.log('before render....');
    return null;
  }

  render() {
    return (
      <>
        hello, this is home page
      </>
    )
  }
}
