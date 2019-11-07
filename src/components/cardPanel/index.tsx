import * as React from 'react';
import { Row } from 'antd';

import './style';

interface IProps {
  title?: any;
  content?:any;
  footer?: any;
  className?: string;
  style?: any;
  background?: string;
}

const mergeStyle = (style1: Object, style2: Object) => Object.assign(style1, style2);

function isString(target:any):target is string {
  return typeof target === 'string';
}

const CardPanel: React.FC<IProps> = (props) => {
    const { title, content, footer, background = '#fff', className, style = {} } = props;
    const mergedStyle = mergeStyle({ background }, style);
    return (
      <div className={`card-panel ${className}`} style={mergedStyle}>
        {
          title && (
            <Row>
              <div className="title-block">
                {
                  isString(title) ? (
                    <span className="title">{title}</span>
                  ) : (
                    title
                  )
                }
              </div>
            </Row>
          )
        }
        {
          content && (
            <Row>
              <div className="content-block">
                {content}
              </div>
            </Row>
          )
        }
        {
          footer && (
            <div className="footer-block">
              {footer}
            </div>
          )
        }
      </div>
    )
}

export default CardPanel;
