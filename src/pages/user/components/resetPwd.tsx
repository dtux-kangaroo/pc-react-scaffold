import * as React from 'react'
import { Form, Icon, Input, Button,message,Row,Col } from 'antd';
const FormItem = Form.Item;

interface IProps {
  form:any,
  cancel:()=>void
}
interface IState{
  confirmDirty:boolean,
  autoCompleteResult:any
}
 class ResetPwd extends React.Component <IProps,IState>{
  constructor(IProps:any) {
    super(IProps);
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let flag:boolean=  (values.userName||'').length
                 &&(values.password||'').length;
          if(flag){
              //this.props.history.push('/');
              this.props.cancel();
              //API.Login()
          }else{
            message.warning("账号密码输入有误，请重新输入")
          }
        console.log('Received values of form: ', values,this.props);
      
      }
    });
  }
  render() {
    const {cancel}=this.props
    const { getFieldDecorator } = this.props.form;
    const formItemLayout:any = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
        },
      };
    return (
      <div  className="model">
      <div className="model-title">创建账号</div>
      <Form   onSubmit={this.handleSubmit}>
        <Row>
             <Col span={24}>
              <FormItem {...formItemLayout} label="用户名称:">
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入登陆账号!' }],
                })(
                    <Input  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入登录账号" />
                )}
                </FormItem>
                <FormItem {...formItemLayout} label="创建账号：">
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入登陆密码!' }],
                })(
                    <Input   prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入登录密码" />
                )}
             </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
              <span style={{fontSize:"12px"}}> 登录密码：初始密码默认xihu123456，创建完成后请及时修改</span>
            </Col>
        </Row>
        <Row style={{marginTop:"5px"}}>
             <Col span={24} style={{ textAlign: 'right' }}>
                <Button onClick={cancel} style={{ marginLeft: 8 }}>取消</Button>&nbsp;&nbsp;
                <Button type="primary" htmlType="submit">确定</Button>
             </Col>
        </Row>
      </Form>
      </div>
    );
  }
}
export default  Form.create()(ResetPwd);
