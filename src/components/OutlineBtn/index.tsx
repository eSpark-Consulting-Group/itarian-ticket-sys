import React from 'react';
import {View, Text} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';

import styles from './style';
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
  widthLength,
  highlight = false,
}: {
  text: string;
  onPress: () => void;
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
  textColor?: string;
  backColor?: string;
  border?: boolean;
  pressRipple?: boolean;
  widthLength?: number | string;
  highlight?: boolean;
}) => {
  const {colors, dark}: Theme = useTheme();

  const withBorder = {
    borderWidth: 1.25,
    borderColor: colors.primary,
  };

  const handleBackColor = backColor
    ? highlight
      ? colors.primary
      : backColor
    : colors.background;
  const handleTextColor = textColor
    ? highlight
      ? '#ffffff'
      : textColor
    : colors.text;

  return (
    <View
      style={[
        {
          backgroundColor: handleBackColor,
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
          <View
            style={{
              width: rightIcon ? 100 : widthLength,
              justifyContent: 'center',
              alignItems: rightIcon ? 'flex-start' : 'center',
            }}>
            <Text
              style={{
                textAlignVertical: 'center',
                color: handleTextColor,
                paddingVertical: 5,
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
