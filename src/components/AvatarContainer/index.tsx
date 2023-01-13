import React from 'react';
import { View, Image, ImageURISource } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';

import styles from './style';

const AvatarContainer = ({
  source,
  size,
}: {
  source: ImageURISource;
  size?: number;
}) => {
  const { colors }: Theme = useTheme();
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

export default AvatarContainer;
