import * as React from 'react'
import { Form, Icon, Input, Button } from 'antd';
import { NavLink } from "react-router-dom"; 
import './style.scss';
const FormItem = Form.Item;

interface IProps {
  history:any,
  form:any
}
interface IState{
  confirmDirty:boolean,
  autoCompleteResult:any
}
 class Login extends React.Component <IProps,IState>{
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
        console.log('Received values of form: ', values,this.props);
        this.props.history.push('/index');
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ minHeight: "1200px"}} className="login-bg">
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入登陆账号!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入登陆密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
          <NavLink to="/register">Or 注册!</NavLink>  <NavLink className="login-form-forgot" to="/register">忘记密码</NavLink>
        </FormItem>
      </Form>
      </div>
    );
  }
}
export default  Form.create()(Login);
