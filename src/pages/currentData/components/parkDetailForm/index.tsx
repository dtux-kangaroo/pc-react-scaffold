import * as React from 'react';

import {Table} from 'antd';

export default class ParkDetailForm extends React.Component {
  constructor(props) {
    super(props);
  }

  static getDeriveStateFromProps(props, state) {
    return null;
  }

  render() {
    const dataSource = [
      {
        parkingName: "停车场1",
        profit: 4500,
        remainParkingNum: 25,
        saturation: '80%',
        totalParkingNum: 125
      },
      {
        parkingName: "停车场2",
        profit: 3000,
        remainParkingNum: 16,
        saturation: '84%',
        totalParkingNum: 100
      },
    ];

    const columns = [
      {
        title: '停车场名称',
        dataIndex: 'parkingName',
        key: 'parkingName',
        width: 200,
        align: 'center' as 'center',
      },
      {
        title: '总车位',
        dataIndex: 'totalParkingNum',
        key: 'totalParkingNum',
        width: 200,
        align: 'center' as 'center',
      },
      {
        title: '当前余位数',
        dataIndex: 'remainParkingNum',
        key: 'remainParkingNum',
        width: 200,
        align: 'center' as 'center',
      },
      {
        title: '当前饱和度',
        dataIndex: 'saturation',
        key: 'saturation',
        width: 200,
        align: 'center' as 'center',
      },
      {
        title: '当前收益',
        dataIndex: 'profit',
        key: 'profit',
        width: 200,
        align: 'center' as 'center',
      },
    ];
    return (
      <Table dataSource={dataSource} columns={columns} />
    )
  }
}
