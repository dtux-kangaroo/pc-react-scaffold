import { IField } from './types'

const fieldsMap: IField[] = [
  { key: 'systemCode', value: '系统代号' },
  { key: 'systemType', value: '系统分类' },
  { key: 'systemName', value: '自建系统名称' },
  { key: 'subordinateDepartments', value: '所属部门' },
  { key: 'accessSituation', value: '接入情况' },
  { key: 'databaseProperties', value: '数据库属性' },
  { key: 'accessMode', value: '接入方式' },
  { key: 'updateFrequency', value: '数据更新频率' },
  { key: 'lastUpdated', value: '最后更新时间' },
  { key: 'accessTime', value: '接入时间' },
  { key: 'systemDescription', value: '系统描述' },
  { key: 'surfaceName', value: '表' },
  { key: 'haveDictionary', value: '有无注释/字典' },
  { key: 'dataType', value: '数据类型' },
  { key: 'currentSituation', value: '目前情况' },
  { key: 'analysisIndex', value: '可分析指标' },
]

export default fieldsMap;
