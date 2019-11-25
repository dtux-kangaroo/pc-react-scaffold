import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import './style.scss'

function getBase64 (img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload (file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isJpgOrPng) {
    message.error('仅支持jpg、png格式');
  } else if (!isLt2M) {
    message.error('图片不能大于2M');
  }
  return isJpgOrPng && isLt2M;
}

export default class UploadImg extends Component {
  state = {
    imageUrl: '',
    imageSize: '',
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      let imageSize = Math.round(info.file.size / 1024 * 100) / 100;
      if (imageSize >= 1024) {
        imageSize = (imageSize / 1024).toFixed(2) + 'M' 
      } else {
        imageSize = imageSize.toFixed(2) + 'K' 
      }
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          imageSize,
          loading: false,
        }),
      );
    }
  };

  render () {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">
          上传图片
        </div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <>
        <Upload
          name="avatar"
          className="comp-uploadImg"
          listType="picture-card"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        {
          this.state.imageSize ? <span>图片大小：{this.state.imageSize}</span> : null
        }        
      </>
    );
  }
}