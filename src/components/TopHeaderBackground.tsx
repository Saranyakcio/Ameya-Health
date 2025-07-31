import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const height = 180;

const TopHeaderBackground = () => {
  const path = `
    M0,0 
    H${width}
    V${height - 60}
    C${width * 0.75},${height + 20} ${width * 0.25},${height + 20} 0,${height - 60}
    Z
  `;

  return (
    <Svg
      width={width}
      height={height}
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <Path d={path} fill="#1f66c1" />
    </Svg>
  );
};

export default TopHeaderBackground;