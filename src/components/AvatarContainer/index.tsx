import {View, Image} from 'react-native';
import React from 'react';
import {Theme, useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';

import styles from './style';
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
          borderColor: colors.primary,
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
