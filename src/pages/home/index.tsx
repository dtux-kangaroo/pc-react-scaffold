import * as React from "react";
import './style.scss'
import { Row, Col } from 'antd';
type IState={
    appList:any
}
export default class Home extends React.Component<{},IState> {
    constructor(props) {
        super(props);
      
      }
      state:IState={
          appList:[{
              name:'数据中台',
              remark:'数据中台数据中台数据中台数据中台数据中台数据中台数据中台',
              url:'http://baidu.com'
          },
          {
            name:'sdfs',
            remark:'this is test',
            url:'http://baidu.com'
        },
        {
          name:'sdfs',
          remark:'this is test',
          url:'http://baidu.com'
      },
      {
        name:'sdfs',
        remark:'this is test',
        url:'http://baidu.com'
    }

        ]
      }
  render() {
      const {appList}=this.state;
    return (
        <div className="home-page">
            <Row gutter={48}>
               {appList.map((item,idx)=>(
                    <Col className="gutter-row" style={{marginTop:`${idx>2?'55px':'auto'}`}} span={8}>
                      <div className="app-box">
                        <div >{item.name}</div>
                        <div >{item.remark}</div>
                      </div>
                    </Col>
               ))}
            </Row>
       </div>
    )}
}
