import {Theme, useTheme} from '@react-navigation/native';
import React from 'react';
import {
  Pressable,
  PressableAndroidRippleConfig,
  StyleProp,
  StyleSheetProperties,
  ViewStyle,
} from 'react-native';

export const CstmPressable = ({
  android_disableSound = false,
  children,
  onPress = () => {},
  style = {},
  disabled = false,
  android_ripple = {},
}: {
  android_disableSound?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  android_ripple?: null | PressableAndroidRippleConfig;
}) => {
  const {dark}: Theme = useTheme();
  return (
    <Pressable
      disabled={disabled}
      style={style}
      onPress={onPress}
      android_disableSound={android_disableSound}
      android_ripple={{
        color: dark ? '#ffffff0e' : '#0000000e',
        ...android_ripple,
      }}>
      {children}
    </Pressable>
  );
};
