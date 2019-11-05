export const transCNData = (data: [{
  name: string,
  value: number
}]) => {
  const CN = ['北京', '天津', '上海', '重庆', '黑龙江', '吉林', '辽宁', '山东', '山西', '河北', '河南', '湖北', '湖南', '江西', '安徽', '江苏', '浙江', '福建', '广东', '云南', '贵州', '四川', '青海', '甘肃', '陕西', '海南', '新疆维吾尔自治区', '西藏自治区', '内蒙古自治区', '宁夏回族自治区', '广西壮族自治区', '香港特别行政区', '澳门特别行政区', '台湾'].reverse();
  for (let i = 0; i < data.length; i++) {
    let j = CN.indexOf(data[i].name.replace('市', ''));
    if (j > -1) {
      CN.splice(j, 1);
    }
  }
  for (let i = 0; i < CN.length; i++) {
    data.push({
      name: CN[i],
      value: 0
    });
  }
  return data
}

export const transZJData = (data: [{
  name: string,
  value: number
}]) => {
  const ZJ = ['杭州市', '宁波市', '温州市', '绍兴市', '湖州市', '嘉兴市', '金华市', '衢州市', '台州市', '丽水市', '舟山市'].reverse();
  for (let i = 0, j; i < data.length; i++) {
    if (data[i].name.lastIndexOf('市')) {
      j = ZJ.indexOf(data[i].name);
    } else {
      j = ZJ.indexOf(data[i].name + '市');
    }
    if (j > -1) {
      ZJ.splice(j, 1);
    }
  }
  for (let i = 0; i < ZJ.length; i++) {
    data.push({
      name: ZJ[i],
      value: 0
    });
  }
  return data
}