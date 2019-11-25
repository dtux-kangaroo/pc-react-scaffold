import React, { Component } from 'react';
import { Tree, Input } from 'antd';
import './style.scss';

const { Search } = Input;
const { TreeNode } = Tree;

export default class SideTree extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    treeList: [{
      id: 0,
      title: 1111,
      key: '0-1'
    }, {
      id: 1,
      title: 2222,
      key: '0-2',
      children: [{
        id: 2,
        title: 2233,
        key: '0-2-1'
      }]
    }, {
      id: 3,
      title: 3333,
      key: '0-3'
    }],
    searchValue: '',
    activeItem: {},
  }

  componentDidMount () {
    // this.getList();
  }

  static getDerivedStateFromProps (nextProps, prevState) {
  }

  getList = async (name) => {
    // try {
    //   let data = await this.props.getTreeList(name);
    //   let keys = [];
    //   let transData = this.recursion(data, '0', keys);
    //   this.setState({
    //     data: transData
    //   });
    // } catch {
    //   console.log('error');
    // }
  }

  // 递归为原数据添加key值
  recursion = (data, str, keys) => {
    data.forEach((item, index) => {
      item.title = item.permissionName;
      item.key = `${str}-${index}`;
      if (item.children.length > 0) {
        return this.recursion(item.children, item.key, keys)
      }
    });
    return data
  }

  inputChange = e => {
    const { value } = e.target;
    this.setState({
      searchValue: value
    });
  }

  // 设置选择的目录
  handleClick = item => {
    this.setState({
      activeItem: item
    });
    this.props.updateActiveItem(item);
  }

  render () {
    const { placeholder, topTitle, hasSearch = true } = this.props;
    const { treeList, searchValue } = this.state;
    const iTitle = item => {
      const index = item.title.toString().indexOf(searchValue);
      const beforeStr = item.title.toString().substr(0, index);
      const afterStr = item.title.toString().substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;
      return (
        <span
          style={{ color: item.id == this.state.activeItem.id ? '#5D78FF' : '#333333' }}
          onClick={this.handleClick.bind(this, item)}>
          {title}
        </span>
      )
    }
    const loop = data =>
      data.map(item => {
        if (item.children && item.children.length) {
          return (
            <TreeNode key={item.key} title={iTitle(item)}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.key} title={iTitle(item)} />;
      });
    return (
      <div className="comp-sideTree">
        {
          hasSearch &&
          <Search
            placeholder={placeholder}
            onChange={this.inputChange}
          />
        }
        {
          treeList.length > 0 &&
          <div style={{ marginTop: '20px' }}>
            <Tree defaultExpandAll>
              <TreeNode key="0" title={<span
                style={{ color: this.state.activeItem.id == null ? '#5D78FF' : '#333333' }}
                onClick={this.handleClick.bind(this, {})}>
                {topTitle || "总菜单"}
              </span>}>
                {loop(treeList)}
              </TreeNode>
            </Tree>
          </div>
        }
      </div>
    )
  }
}