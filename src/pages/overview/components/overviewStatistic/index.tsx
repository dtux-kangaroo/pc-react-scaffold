import * as React from 'react';

import StatisticPanel from '@/components/statisticPanel'

const OverviewStatistic: React.FC = (props) => {
  return (
    <div>
      <StatisticPanel
        statistics={[
          { title: '停车场总资源', value: 64 },
          { title: '停车位总资源', value: 1000 },
          { title: '历史停车位', value: 1289372 },
          { title: '历史总收益', value: 12839720 },
          // { title: '历史总收益', value: 12839720 },
          // { title: '历史总收益', value: 12839720 },
        ]}
        gutter={20}
      />
    </div>
  )
}

export default OverviewStatistic;
