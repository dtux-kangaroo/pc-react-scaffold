import React from 'react';

const Bar = (width, height, backgrounds, marginTop = '0px', justifyContent = 'flex-start') => {
  return (ratio, text) => {
    const widthRatio = (ratio < 100 ? Math.abs(ratio) : 100) + '%';
    return (
      <div style={{ display: 'flex', justifyContent, marginTop }}>
        <div style={{ display: 'inline-block', width, background: backgrounds[0], height, marginTop: '6px' }}>
          <div style={{ background: backgrounds[1], width: widthRatio, height: '100%' }} />
        </div>
        {
          text || text == 0 ? (
            <div
              style={{ marginLeft: '12px' }}
            >
              <span
                style={{
                  fontSize: '14px',
                  fontFamily: 'PingFangSC-Regular,PingFangSC',
                  fontWeight: 400,
                  color: 'rgba(46,46,52,1)',
                  lineHeight: '22px',
                  verticalAlign: marginTop
                }}
              >{text}</span>
            </div>
          ) : ''
        }
      </div>
    )
  }
}

export default Bar;
