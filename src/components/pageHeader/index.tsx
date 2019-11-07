import * as React from "react";
import headfix from './components/headFix';
import TimeSelect from 'components/timeSelect';
import './style.scss';

interface IProps {
  title: string,
  hasTimeSelect: boolean
}

class PageHeader extends React.Component<IProps> {
  constructor(props: IProps) {
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
export default headfix <IProps>(PageHeader)
