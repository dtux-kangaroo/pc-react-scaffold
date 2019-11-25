import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import SiderMenu from '../components/siderMenu';
import TopNavHeader from '../components/topNavHeader';
const { Content } = Layout;
import '../style.scss';

const mapStateToProps = (state) => ({
  navData: state.global
})

@connect(mapStateToProps)
export default class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() { }
  render() {
    const { children, navData } = this.props;
    const { submenu } = navData;
    // const isShowSider = true;
    const isShowSider = submenu.length > 0;
    console.log('has sider:', submenu, isShowSider);
    return (
      <Layout className="yux-layout g-dashbdapp" style={{ minHeight: '100vh' }}>
        <TopNavHeader key="top" />
        <Layout key="layout" className="yux-layout">
          {isShowSider && <SiderMenu key="sider" data={submenu} />}
          <Layout className="base-layout">
            <Content key="content" className="yux-content">
              {children}
            </Content>
          </Layout>
          {/* <GlobalFooter /> */}
        </Layout>
      </Layout>
    );
  }
}
