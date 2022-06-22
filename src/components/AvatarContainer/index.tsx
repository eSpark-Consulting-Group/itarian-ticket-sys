import {View, Text, Image} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';

import styles from './style';
import {Theme} from '../../theme/colors';
import {moderateScale} from 'react-native-size-matters';

const AvatarContainer = ({source, size}: {source: any; size: any}) => {
  const {colors}: Theme = useTheme();
  return (
    <View
      style={{
        ...styles.container,
        width: size ? size : moderateScale(70, 0.5),
        height: size ? size : moderateScale(70, 0.5),
      }}>
      <Image
        source={source}
        resizeMode="contain"
        style={{
          ...styles.AvatarImage,
          width: size ? size : moderateScale(70, 0.5),
          height: size ? size : moderateScale(70, 0.5),
        }}
      />
    </View>
  );
};

AvatarContainer.propTypes = {
  source: PropTypes.any,
  size: PropTypes.any,
};

export default AvatarContainer;
