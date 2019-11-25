import React, { Component } from "react";

const geo = new Map([
  ['北京', [116.407526, 39.904030]],
  ['天津', [117.200983, 39.084158]],
  ['上海', [121.473701, 31.230416]],
  ['重庆', [106.551556, 29.563009]],
  ['黑龙江', [126.661669, 45.742347]],
  ['吉林', [125.325990, 43.896536]],
  ['辽宁', [123.429440, 41.835441]],
  ['山东', [117.020359, 36.668530]],
  ['山西', [112.562398, 37.873531]],
  ['河北', [114.468664, 38.037057]],
  ['河南', [113.753602, 34.765515]],
  ['湖北', [114.341861, 30.546498]],
  ['湖南', [112.983810, 28.112444]],
  ['江西', [115.909228, 28.675696]],
  ['安徽', [117.284922, 31.861184]],
  ['江苏', [118.763232, 32.061707]],
  ['浙江', [120.152791, 30.267446]],
  ['福建', [119.295144, 26.100779]],
  ['广东', [113.266530, 23.132191]],
  ['云南', [102.710002, 25.045806]],
  ['贵州', [106.707410, 26.598194]],
  ['四川', [104.075931, 30.651651]],
  ['青海', [101.780199, 36.620901]],
  ['甘肃', [103.826308, 36.059421]],
  ['陕西', [108.954239, 34.265472]],
  ['海南', [110.349228, 20.017377]],
  ['新疆维吾尔自治区', [87.627704, 43.793026]],
  ['西藏自治区', [91.117212, 29.646922]],
  ['内蒙古自治区', [111.765617, 40.817498]],
  ['宁夏回族自治区', [106.258754, 38.471317]],
  ['广西壮族自治区', [108.327546, 22.815478]],
  ['香港特别行政区', [114.163825, 22.276284]],
  ['澳门特别行政区', [113.543028, 22.186835]],
  ['台湾', [121.508903, 25.044319]],
  ['杭州', [120.155070, 30.274084]],
  ['宁波', [121.550357, 29.874556]],
  ['温州', [120.699366, 27.994267]],
  ['绍兴', [120.580232, 30.029752]],
  ['嘉兴', [120.755486, 30.746129]],
  ['金华', [119.647444, 29.079059]],
  ['台州', [121.420757, 28.656386]],
  ['湖州', [120.086823, 30.894348]],
  ['衢州', [118.859457, 28.970079]],
  ['丽水', [119.922796, 28.467630]],
  ['舟山', [122.207215, 29.985295]],
]);
let map, layer;

export default class HeatMap extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    let { option, data } = this.props;
    map = new AMap.Map('container', {
      mapStyle: "amap://styles/whitesmoke",
      // viewMode: '3D',
      // pitch: 30,
      features: ['bg', 'road'],
      zoom: option.zoom,
      center: option.center,
      dragEnable: false,
      doubleClickZoom: false,
      scrollWheel: false
    });
    map.setDefaultCursor("default");
    this.addLayer(map, data, option);
  }

  componentWillReceiveProps (nextProps) {
    let { option, data } = nextProps;
    console.log('map', nextProps);
    map.remove(layer);
    map.setZoomAndCenter(option.zoom, option.center);
    this.addLayer(map, data, option);
  }

  addLayer (map, data, option) {
    data.forEach((item, index) => {
      if (item.key) {
        item.sum = item.value + item.key / 100000000
      } else {
        item.sum = item.value + index / 10000
      }
    });
    data.sort((a, b) => {
      return b.sum - a.sum
    });
    console.log(data);
    // const first = data[0].name;
    // const second = data[1].name;
    // const third = data[2].name;
    layer = new Loca.DistrictLayer({
      map: map,
      eventSupport: true
    });
    layer.setData(data, {
      type: 'json',
      value: 'sum',
      lnglat: function (obj) {
        return geo.get(obj.name.replace('市', ''))
      }
    });
    layer.setOptions({
      mode: 'sum',
      style: {
        color: this.creatColor(data),
        // color: (obj) => {
        //   if (obj.name == first) return '#FDC359';
        //   else if (obj.name == second) return '#54C79C';
        //   else if (obj.name == third) return '#5DD2C2';
        //   else return ['#CAD3FA', '#AAB9FC']
        // },
        // blankFill: '#DEE3FC',
        height: [0, 100000],
        opacity: 0.9
      }
    });
    layer.on('click', function (ev) {
      let originalEv = ev.originalEvent;
      let lnglat = map.containerToLngLat(new AMap.Pixel(originalEv.offsetX, originalEv.offsetY));
      let feature = ev.feature;
      let value = ev.value;
      let property = feature.subFeature.properties;
      let content = [`${property.name}:<span style='margin-left: 5px'>${(option.format == 'percent' ? (value.toFixed(2) + '%') : Math.round(value))}</span>`];
      let infoWin = new AMap.InfoWindow({
        closeWhenClickMap: true
      });
      infoWin.open(map, lnglat);
      infoWin.setContent(content.join(''));
    });
    layer.render();
    if (option.type == 'zhejiang') {
      layer.goto(330000);
    }
  }

  creatColor (data) {
    const allColor = ['#FFB822', '#08BB87', '#1DC9B7', '#98AAFF', '#A2B2FF', '#ADBBFF', '#B6C3FF', '#C1CCFF', '#CBD4FF', '#D6DDFF'];
    const len = data.length;
    // for (let i = 0; i < 7; i++) {
    //   allColor.push(`rgba(93,120,255,${1 - (i * 0.15) ** 2})`);
    // }
    // if (len <= 10) {
    //   return allColor.slice(0, len).reverse();
    // } else {
    //   return allColor.concat(new Array(len - 10).fill('rgba(218, 224, 255, 0.2)')).reverse();
    // } 
    let isEmpty = 0;
    data.forEach(item => {
      item.value == 0 && isEmpty++
    });
    if (len - isEmpty <= 10) {
      return allColor.slice(0, len - isEmpty).concat(new Array(isEmpty).fill('rgba(234, 235, 240, 0.6)')).reverse();
    } else {
      return allColor.concat(new Array(len - 10 - isEmpty).fill('rgba(238, 241, 255, 0.6)')).concat(new Array(isEmpty).fill('rgba(234, 235, 240, 0.6)')).reverse();
    }
  }

  render () {
    return (
      <div id="container" style={{ 'width': '100%', 'height': '100%' }}></div>
    )
  }
}