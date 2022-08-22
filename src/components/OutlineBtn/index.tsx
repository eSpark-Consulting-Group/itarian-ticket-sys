import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

import styles from './style';

import {Theme} from '../../theme/colors';
import {moderateScale} from 'react-native-size-matters';
import {CstmPressable} from '../CstmPressable';

const OutlineBtn = ({
  text,
  onPress,
  rightIcon,
  leftIcon,
  textColor,
  backColor,
  border,
  pressRipple,
}: {
  text: string;
  onPress: () => void;
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
  textColor?: string;
  backColor?: string;
  border?: boolean;
  pressRipple?: boolean;
}) => {
  const {colors, dark}: Theme = useTheme();

  const withBorder = {
    borderWidth: 1.25,
    borderColor: colors.primary,
  };

  return (
    <View
      style={[
        {
          backgroundColor: backColor ?? colors.background,
          ...styles.container,
          alignItems: 'center',
          justifyContent: 'center',
        },
        border ? withBorder : null,
      ]}>
      <CstmPressable
        onPress={onPress}
        android_disableSound
        android_ripple={
          pressRipple
            ? {color: '#00000021', borderless: true}
            : {
                color: dark ? '#ffffff1f' : '#0000000e',
                borderless: true,
              }
        }>
        <View style={styles.content}>
          {leftIcon}
          <View style={{width: rightIcon && 100, justifyContent: 'center'}}>
            <Text
              style={{
                textAlignVertical: 'center',
                color: textColor ?? colors.text,
                ...styles.textStyle,
              }}>
              {text}
            </Text>
          </View>
          {rightIcon}
        </View>
      </CstmPressable>
    </View>
  );
};

export default OutlineBtn;
