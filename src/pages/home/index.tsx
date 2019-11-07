import * as React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { addCount, subCount } from './redux/actions';
// import counter

// const mapStateToProps = (state) => ({
//   counter: state.counter,
// });

const mapDispatchToProps = (dispatch) => ({
  addCount: () => dispatch(addCount()),
  subCount: () => dispatch(subCount()),
})

@connect(state => ({...state}), mapDispatchToProps)
export default class Home extends React.Component<any, any> {
  state = {
    number: 100,
    value: 202,
  }
  static getDerivedStateFromProps = (props, state) => {
    console.log('before render.....');
    console.log(props, state);
  }
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>
          {this.props.counter}
        </p>
        <p>
          <button onClick={() => this.props.addCount()}>+</button>
        </p>
        <p>
          <button onClick={() => this.props.subCount()}>-</button>
        </p>
        <p>
          { this.state.number }
        </p>
        <p>
          <button onClick={() => this.setState({ number: 2000000 })}>add</button>
        </p>
      </div>
    )
  }
}
