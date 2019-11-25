import React from 'react';
import { Icon } from 'antd';

const Footer = () => (
  <footer className="yux-footer">
    <div className="copyright"><Icon type="copyright" />&nbsp;Copyright {PARAMSCONF.FOOTER_RIGHT}</div>
  </footer>
);

export default Footer;