import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb,Row,Col } from "antd";
import * as home  from "./aciton"; 
import { isEmpty } from "lodash";
import moment from "moment";
moment.locale("zh-cn");
import assign from "object-assign";
import "./style.scss";
import BarChart from '../../components/charts/barChart';
import LineChart from '../../components/charts/lineChart';
import MapChart from '../../components/charts/mapChart';
import ScatterChart from '../../components/charts/scatterChart';
import PieChart from '../../components/charts/pieChart';
import ReactResizeDetector from 'react-resize-detector'
import {barOption,lineOption,mapOption,scatterOption,pieOption} from '../../constants/option';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";

@connect(
  state => ({ ...state.home }),
  dispatch => bindActionCreators({ ...home}, dispatch)
)
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barOption:barOption,
      config:{}
    };
  }
  componentDidMount() {
    this.props.getHomeData({});
    this.setChart();
  }
 setChart=()=>{
  this.setState({barOption,
    config:{
    height:'301px',
    handle:this.clickBar
  }})
 }
  componentWillReceiveProps(nextProps) {

  }
  clickBar=(data)=>{
    console.log('点击触发啦',data)
  }
  render() {
    const {barOption,config}=this.state;
    const data = [
      {
        year: "1951 年",
        sales: 38
      },
      {
        year: "1952 年",
        sales: 52
      },
      {
        year: "1956 年",
        sales: 61
      },
      {
        year: "1957 年",
        sales: 145
      },
      {
        year: "1958 年",
        sales: 48
      },
      {
        year: "1959 年",
        sales: 38
      },
      {
        year: "1960 年",
        sales: 38
      },
      {
        year: "1962 年",
        sales: 38
      }
    ];
    const cols = {
      sales: {
        tickInterval: 20
      }
    };
    return (
        <div className="content">
           恭喜，home主页新建成功,DIY YOUE CODE!!!. 
           <div>
          <Chart height={400} data={data} scale={cols} forceFit>
            <Axis name="year" />
            <Axis name="sales" />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="interval" position="year*sales" />
          </Chart>
        </div>
           <a href="/noauth">noauth</a>&nbsp; <a href="/noexite">noexite</a>
           <BarChart option={barOption} config={config}/>
           <br/>
           <LineChart option={lineOption} config={config}/>
           <br/>
           <MapChart option={mapOption} conifg={config}/>
           <br/>
           <ScatterChart option={scatterOption} conifg={config}/>
           <br/>
           <PieChart option={pieOption} conifg={config}/>

       </div>
    );
  }
}
