import React from "react";
import { Layout, Icon } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import TopBar from "./topBar/index";
import * as global from "@/pages/global/redux/action";
//import ErrorBoundary from "@/components/errorBoundary";
import { filterMenu } from "@/utils/index";
import { immutableRenderDecorator } from "react-immutable-render-mixin";
import { bindActionCreators } from "redux";
import "./style.scss";

@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
@immutableRenderDecorator
class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    loading: false,
    hasError: false
  };
  componentDidMount() {
    const { authCode, navData } = this.props;
    if (authCode.length || navData.length) {
    } else {
      this.props.getAuthCode({});
      this.props.getNavData({});
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }
  componentWillReceiveProps(nextProps) {
    const { navData, location, authCode} = nextProps;
    let flag = navData.length && authCode.length;
    if (flag) {
      filterMenu(location, navData, authCode);
    }
  }
  render() {
    const { navData, location, history, authCode, children } = this.props;
    const { hasError } = this.state;
    return (
      <Layout className="basic-layout">
        <TopBar
          isTopMenu={false}
          location={location}
          history={history}
          navData={navData}
          authCode={authCode}
        />
        <div>{hasError ? "error" : children}</div>
        <footer className="footer">
          <div className="copyright">
            <Icon type="copyright" />
            &nbsp;Copyright {PARAMSCONF.FOOTER_RIGHT}
          </div>
        </footer>
      </Layout>
    );
  }
}

export default withRouter(BasicLayout);
