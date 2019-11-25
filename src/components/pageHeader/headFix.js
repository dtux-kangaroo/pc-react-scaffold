import React, { Component } from 'react';
import './style.scss';

export default (WrappedComponent) => {
  class NewComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isFixTop: false
      }
    }
    componentDidMount () {
      window.addEventListener('scroll', () => {
        if (document.body.scrollTop >= 64) {
          this.setState({
            isFixTop: true
          })
        } else {
          this.setState({
            isFixTop: false
          })
        }
      })
    }
    componentWillUnmount () {
      window.removeEventListener('scroll', () => { })
    }
    render () {
      const { isFixTop } = this.state;
      return <div className={isFixTop ? 'headfix fixed' : 'headfix'}>
        <WrappedComponent {...this.props} />
      </div>
    }
  }

  return NewComponent;
}