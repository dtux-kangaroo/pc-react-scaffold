import * as React from "react";
import "./style.scss";
import { Row, Col } from "antd";
import { API } from "api/index";
//import { url } from 'inspector';
declare var  frontConf
type IState = {
  appList: any;
};
export default class Home extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
  }
  state: IState = {
    appList: [
      {
        name: "数据中台",
        remark: "数据中台数据中台数据中台数据中台数据中台数据中台数据中台",
        url: "http://baidu.com"
      },
      {
        name: "sdfs",
        remark: "this is test",
        url: "http://baidu.com"
      },
      {
        name: "sdfs",
        remark: "this is test",
        url: "http://baidu.com"
      },
      {
        name: "sdfs",
        remark: "this is test",
        url: "http://baidu.com"
      }
    ]
  };
  componentDidMount(){
    this.getListUsingGet();
  }
  getListUsingGet=()=>{
    API.listUsingGet({})
    .then(ret=>{
      if(ret.success){
        this.setState({appList:ret.data||[]});
      }else{
        console.log(ret,'1213');
      }
    })
  }
  redirect=(item)=>{
     
  }
  render() {
    const { appList } = this.state;
    return (
      <div className="home-page">
        <Row gutter={48}>
          {appList.map((item, idx) => (
            <Col
              key={idx}
              className="gutter-row"
              style={{ marginTop: `${idx > 2 ? "55px" : "auto"}` }}
              span={8}
            >
              <a className="app-box" target="_blank" href={item.columResource} style={{backgroundImage:`url(${frontConf.SERVER_URL}${item.columImage})`}}>
                <div>{item.columName}</div>
                <div>{item.columDesc}</div>
              </a>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
