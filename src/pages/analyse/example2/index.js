// import React, { Component } from 'react';
import React, { useState, useEffect, useCallback } from "react";
// import { useDispatch, useMappedState } from 'redux-react-hook'
import { API } from '@/api';
import PageHeader from 'components/pageHeader';
import './style.scss';

// export default class ExamplePage2 extends Component {
//   constructor(props) {
//     super(props);
//   }

//   state = {
//   }

//   componentDidMount () {
//   }

//   render () {
//     return (
//       <div>
//         <PageHeader title="示例页二" hasTimeSelect={true} />
//       </div>
//     )
//   }
// }

export default () => {
  // const mapState = useCallback(
  //   state => ({ ...state.global }),
  //   [],
  // );
  // console.log(useMappedState(mapState));
  // const dispatch = useDispatch();
  const [data, setData] = useState('初始值');
  useEffect(() => {
    API.getNavData().then(res => {
      if (res && res.result) {
        setData(res.message);
      }
    })
  }, []);
  return (
    <div>
      <PageHeader title="示例页二" hasTimeSelect={true} />
      <p>HOOK模拟数据:{data}</p>
    </div>
  )
}