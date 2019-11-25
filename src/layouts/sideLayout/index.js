import * as React from 'react';
import { Layout } from "antd";
import { connect } from "react-redux";
import SideBar from "./sideBar";
import { isUndefined } from 'lodash';
import BasicLayout from 'layouts/basicLayout';
import Loading from '@/components/loading';
import * as global from "@/pages/global/redux/action";
import { bindActionCreators } from "redux";
import './style.scss'

export default (navName) => {
  return connect(
    state => ({ ...state.global }),
    dispatch => bindActionCreators({ ...global }, dispatch)
  )((props) => {
    const findTopNavChildren = (navData) => {
      const matchedTopNav = navData ? navData.find((nav) => nav.permissionName === navName) : [];
      return isUndefined(matchedTopNav) || isUndefined(matchedTopNav.children) ? [] : matchedTopNav.children;
    }
    const { location, navData, history, children, authCode } = props;
    return (
      <BasicLayout>
        <Layout>
          <SideBar openKeys={props.openKeys} setOpenKeys={props.setOpenKeys} location={location} history={history} authCode={authCode} navData={findTopNavChildren(navData)} />
          <Layout className="base-layout">
              <div className="base-content">{children}</div>
          </Layout>
        </Layout>
      </BasicLayout>
    );
  })
}