import React, { Component } from 'react';
import { Form, Select, Input, Radio, Modal, message } from 'antd';
import UploadImg from 'components/uploadImg';
import './style.scss';

const { TextArea } = Input;

class ModuleModal extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    confirmLoading: false
  }

  componentDidMount () {
  }

  handleOk = () => {

  }

  handleCancel = () => {
    this.props.form.resetFields();
    this.props.close();
  }

  render () {
    const { actionName, objName, visible } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { confirmLoading } = this.state;
    const formItemLayout = {
      labelCol: { span: 4, offset: 1 },
      wrapperCol: { span: 14, offset: 1 }
    };
    return (
      <Modal
        className='comp-moduleModal'
        title={(actionName === 'add' ? '新增' : '编辑') + objName}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={confirmLoading}
        maskClosable={false}
      >
        <Form>
          <Form.Item label={`${objName}名称`} {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: `未填写${objName}名称`
              }],
              initialValue: ''
            })(<Input placeholder={`请填写${objName}名称，限制10个字符`} maxLength="10" />)}
          </Form.Item>
          <Form.Item label="链接类型" {...formItemLayout}>
            {getFieldDecorator('type', {
              rules: [{
                required: true,
                message: '未选择链接类型'
              }],
              initialValue: ''
            })(<Radio.Group>
              <Radio value="in">内部系统</Radio>
              <Radio value="out">外部链接</Radio>
            </Radio.Group>)}
          </Form.Item>
          <Form.Item label="链接地址" {...formItemLayout}>
            {getFieldDecorator('url', {
              rules: [{
                required: true,
                pattern: /^((https|http)?:\/\/)[^\s]+/,
                message: '未正确填写链接地址'
              }],
              initialValue: ''
            })(<Input placeholder="请填写URL" />)}
          </Form.Item>
          <Form.Item label="排序" {...formItemLayout}>
            {getFieldDecorator('sort', {
              rules: [{
                required: true,
                pattern: /^[0-9]+$/,
                message: '未正确填写排序，只允许输入数字'
              }],
              initialValue: ''
            })(<Input placeholder="请填写排序，数值越大，排序越往后" />)}
          </Form.Item>
          <Form.Item label="是否启用" {...formItemLayout}>
            {getFieldDecorator('enable', {
              rules: [{
                required: true,
                message: '未选择是否启用'
              }],
              initialValue: ''
            })(<Radio.Group>
              <Radio value="false">否</Radio>
              <Radio value="true">是</Radio>
            </Radio.Group>)}
          </Form.Item>
          <Form.Item label="图片" {...formItemLayout} help="建议尺寸：800*800像素，单张图片不能大于2M">
            {getFieldDecorator('pic', {
              rules: [{
                required: true,
                message: '未上传图片'
              }],
              initialValue: ''
            })(<UploadImg/>)}
          </Form.Item>
          <Form.Item label="备注" {...formItemLayout}>
            {getFieldDecorator('remark', {
              rules: [{
                required: false
              }],
              initialValue: ''
            })(<TextArea rows={3} placeholder="请输入备注，限制100个字符" maxLength="100" />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

ModuleModal = Form.create()(ModuleModal);

export default ModuleModal