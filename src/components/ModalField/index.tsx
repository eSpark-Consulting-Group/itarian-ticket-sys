import React, {ReactNode} from 'react';
import {View, ViewStyle} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';

import styles from './style';
import GapView from '../GapView';
import {CstmPressable} from '../CstmPressable';

const ModalField = ({
  pressEnable = true,
  onPress,
  children,
  fieldPadding = 8,
  contentStyle,
  gap = true,
  border = false,
}: {
  pressEnable?: boolean;
  onPress?: () => void;
  children?: ReactNode;
  fieldPadding?: number;
  contentStyle?: ViewStyle;
  gap?: boolean;
  border?: boolean;
}) => {
  const {colors, dark}: Theme = useTheme();
  const pressColor = dark ? '#ffffff1a' : '#0000001a';

  return (
    <>
      {gap && <GapView />}
      <View
        style={{
          backgroundColor: dark ? '#000000' : '#ffffff',
          elevation: 2,
          borderTopWidth: 1,
          borderBottomWidth: border ? 1 : 0,
          borderColor: border ? '#7575754a' : 'transparent',
          borderRadius: border ? 5 : 0,
        }}>
        <CstmPressable
          android_ripple={{color: pressColor}}
          disabled={!pressEnable}
          style={{
            ...styles.emptyFieldStyle,
            padding: fieldPadding,
            ...contentStyle,
          }}
          onPress={onPress}>
          {children}
        </CstmPressable>
      </View>
    </>
  );
};

export default ModalField;
