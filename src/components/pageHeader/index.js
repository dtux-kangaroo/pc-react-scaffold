import React, { Component } from 'react';
import headFix from './headFix';
import TimeSelect from '../timeSelect';
import './style.scss';

class PageHeader extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    const { title, hasTimeSelect } = this.props;
    return <div className="page-title clearfix">
      <span className="title-txt">{title}</span>
      {
        hasTimeSelect && <TimeSelect />
      }
    </div>
  }
}
export default headFix(PageHeader)
