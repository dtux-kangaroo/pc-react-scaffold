import * as React from "react";
import '../style.scss';

interface IProps {
}

interface IState {
  isFixTop: boolean
}

function headFix <T> (WrappedComponent){
  return class NewComponent extends React.Component<IProps & T, IState> {
    constructor(props) {
      super(props);
      this.state = {
        isFixTop: false
      }
    }
    componentDidMount () {
      window.addEventListener('scroll', () => {
        if (document.body.scrollTop >= 60) {
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
      return <div className={isFixTop ? 'J_headfix fixed' : 'J_headfix'}>
        <WrappedComponent {...this.props} />
      </div>
    }
  }
}

export default headFix;