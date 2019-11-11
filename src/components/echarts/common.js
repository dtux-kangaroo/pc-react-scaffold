import React from 'react'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'zrender/lib/svg/svg';
import { fromJS } from 'immutable'
import ReactResizeDetector from 'react-resize-detector';

import { lz_theme } from '../../constants/echartTheme'
import throttle from '@/utils/throttle';

const REGISTED_THEME = 'lz_theme';

echarts.registerTheme(REGISTED_THEME, lz_theme);
export default class Chart extends React.Component {

  constructor(props) {
    super(props)
  }

  initChart = () => {
    const { option = {}, config = { handle: '', notMerge: true } } = this.props;
    const { chart } = this.state;
    chart.showLoading();
    chart.off('click');
    if (typeof config.handle == 'function') {
      chart.on('click', config.handle.bind(this));
    }
    chart.setOption(option, config.notMerge);
    chart.hideLoading();
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (fromJS(nextProps) == fromJS(this.props)) {
      return false
    } else {
      return true;
    }
  }

  componentDidMount() {
    console.log(this.id)
    let chart = echarts.init(this.id, REGISTED_THEME);
    this.setState({ chart }, () => {
      this.initChart();
    });
  }

  componentDidUpdate() {
    this.initChart()
  }

  componentWillUnmount() {
    const { chart } = this.state;
    chart.dispose();
  }

  chartResize = throttle(() => {
    const { chart } = this.state;
    if (chart) chart.resize();
  }, 1000)

  render() {
    let { height = "200px", width = "100%" } = this.props.config;
    return <div>
      <div ref={id => (this.id = id)} style={{ width, height }} />
      <ReactResizeDetector handleWidth handleHeight onResize={this.chartResize.bind(this)} />
    </div>
  }
}
