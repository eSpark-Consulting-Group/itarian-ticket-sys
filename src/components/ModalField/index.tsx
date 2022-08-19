import React, {ReactNode} from 'react';
import {View, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import {useTheme} from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {moderateScale} from 'react-native-size-matters';
import {Checkbox, Switch, TextInput} from 'react-native-paper';

import {Theme} from '../../theme/colors';
import styles from './style';
import CstmMultiLine from '../CstmMultiLineInput';
import GapView from '../GapView';
import { CstmPressable } from '../CstmPressable/indes';

const Stack = createNativeStackNavigator();

const ModalField = ({
  mode,
  headingRight,
  subHeadingRight,
  headingLeft,
  subHeadingLeft,
  iconRight,
  switchRight,
  switch_val,
  pressEnable = true,
  onPress,
  iconLeft,
  pressEnableLeft,
  onPressLeft,
  pressEnableRight,
  onPressRight,
  subIconLeft,
  subIconRight,
  checkBoxRight,
  onToggleSwitch,
  checkBox_Val,
  onCheckPress,
  children,
  fieldPadding = 8,
  contentStyle,
  gap = true,
  border = false,
}: {
  mode: 'inlined' | 'multiline' | 'none';
  headingRight?: string;
  subHeadingRight?: string;
  headingLeft?: string;
  subHeadingLeft?: string;
  iconRight?: string;
  switchRight?: boolean;
  switch_val?: boolean;
  onToggleSwitch?: () => void;
  pressEnable?: boolean;
  onPress?: () => void;
  iconLeft?: string;
  pressEnableLeft?: boolean;
  onPressLeft?: () => void;
  pressEnableRight?: boolean;
  onPressRight?: () => void;
  subIconLeft?: string;
  subIconRight?: string;
  checkBoxRight?: boolean;
  checkBox_Val?: 'checked' | 'unchecked';
  onCheckPress?: () => void;
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
      {mode == 'inlined' && (
        <TouchableOpacity
          disabled={!pressEnable}
          onPress={onPress}
          style={{
            ...styles.inllineDisplay,
            backgroundColor: dark ? '#0000008a' : '#ffffff8a',
          }}>
          <TouchableOpacity disabled={!pressEnableLeft} onPress={onPressLeft}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {iconLeft && <II name={iconLeft} color={colors.text} size={15} />}
              {headingLeft && (
                <Text
                  style={{
                    color: colors.text,
                    fontWeight: 'bold',
                    marginLeft: iconLeft ? 10 : 0,
                  }}>
                  {headingLeft}
                </Text>
              )}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {subIconLeft && (
                <II name={subIconLeft} color={colors.text} size={15} />
              )}
              {subHeadingLeft && (
                <Text
                  style={{
                    color: colors.text,
                    marginLeft: iconLeft ? 25 : subIconLeft ? 5 : 0,
                  }}>
                  {subHeadingLeft}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity disabled={!pressEnableRight} onPress={onPressRight}>
            {headingRight && (
              <Text style={{color: colors.text, fontWeight: 'bold'}}>
                {headingRight}
              </Text>
            )}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {subIconRight && (
                <II name={subIconRight} color={colors.text} size={15} />
              )}
              {subHeadingRight && (
                <Text
                  style={{
                    color: colors.text,
                    marginLeft: subIconRight ? 5 : 0,
                  }}>
                  {subHeadingRight}
                </Text>
              )}
            </View>
            {switchRight && (
              <Switch
                value={switch_val}
                style={{marginRight: 5}}
                color={colors.primary}
                thumbColor={colors.primary}
                onValueChange={onToggleSwitch}
                trackColor={{true: '#5b57578f', false: '#5b57578f'}}
              />
            )}
            {checkBoxRight && (
              <View>
                <Checkbox
                  status={checkBox_Val ? checkBox_Val : 'unchecked'}
                  color={colors.primary}
                  onPress={onCheckPress}
                />
              </View>
            )}
            {iconRight && (
              <TouchableOpacity style={styles.inlineIconBtn}>
                <II
                  name={iconRight}
                  color={colors.text}
                  size={moderateScale(20, 0)}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          {pressEnable && (
            <II name="chevron-forward" color={colors.text} size={20} />
          )}
        </TouchableOpacity>
      )}
      {mode == 'multiline' && (
        <>
          <GapView />
          <View
            style={{
              ...styles.multilineDisplay,
              backgroundColor: dark ? '#000000' : '#ffffff',
            }}>
            <CstmMultiLine title={headingLeft} />
          </View>
        </>
      )}
      {mode == 'none' && (
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
      )}
    </>
  );
};

export default ModalField;
