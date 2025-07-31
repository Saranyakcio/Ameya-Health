import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CurvedTabBarBackground = () => {
  return (
    <Svg width={400} height={75} viewBox="0 0 400 75" style={{ position: 'absolute', bottom: 0 }}>
      <Path
        fill="#DCEEF5"
        d="M0,0 H150 C170,0 170,60 200,60 C230,60 230,0 250,0 H400 V75 H0 Z"
      />
    </Svg>
  );
};

export default CurvedTabBarBackground;