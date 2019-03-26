import * as React from 'react'
import { Form, Input, Button,message,Row,Col } from 'antd';
const FormItem = Form.Item;
import {API} from 'api/index'

interface IProps {
  form:any,
  cancel:()=>void,
  userData:any
}
interface IState{
  confirmDirty:boolean,
  autoCompleteResult:any
}
 class ModifyPwd extends React.Component <IProps,IState>{
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
        const{id,userPwd}=this.props.userData;
        if(userPwd==values.oldPwd &&values.newPwd==values.confirmPwd){
          this.updateUsingPost({id,userPwd:values.newPwd});
        }else{
          message.warning("旧密码或确认密码输入有误，请重新输入")
        }
      }
    });
  }
  updateUsingPost=(params)=>{
    API.updateUsingPost(params)
    .then(ret=>{
      if(ret.success){
        message.success('密码修改成功')
        this.props.cancel();
      }else{
        message.success('密码修改失败')
      }
    })
  }
  render() {
    //const {cancel}=this.props
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
      <div className="model-title">修改密码</div>
      <Form   onSubmit={this.handleSubmit}>
        <Row>
             <Col span={24}>
              <FormItem {...formItemLayout} label="请输入就密码:">
                {getFieldDecorator('oldPwd', {
                    rules: [{ required: true, message: '请输入旧密码!' }],
                })(
                    <Input type="password" placeholder="请输入旧密码" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="请输入新密码：">
                {getFieldDecorator('newPwd', {
                    rules: [{ required: true, message: '请输入新密码!' }],
                })(
                    <Input  type="password" placeholder="请输入新密码" />
                )}
             </FormItem>
             <FormItem {...formItemLayout} label="请确认新密码：">
                {getFieldDecorator('confirmPwd', {
                    rules: [{ required: true, message: '请输入确认密码!' }],
                })(
                    <Input  type="password" placeholder="请输入确认密码" />
                )}
             </FormItem>
            </Col>
        </Row>
        <Row style={{marginTop:"5px"}}>
             <Col span={24} style={{ textAlign: 'center' }}>
                {/* <Button onClick={cancel} style={{ marginLeft: 8 }}>取消</Button>&nbsp;&nbsp; */}
                <Button type="primary" htmlType="submit">确认修改</Button>
             </Col>
        </Row>
      </Form>
      </div>
    );
  }
}
export default  Form.create()(ModifyPwd);
