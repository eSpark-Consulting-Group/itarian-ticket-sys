import React, {ReactNode} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';
import {Switch} from 'react-native-paper';
import {Theme, useTheme} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  CstmTitleInput,
  GapView,
  ModalField,
  RoundedIcon,
  CstmMultiLine,
} from '..';

interface Props {
  leftIcon?: string;
  subTitle?: string;
  title: string;
  placeholder?: string;
  rightIcon?: string;
  rightIconRound?: string;
  enable?: boolean;
  onPress?: () => void;
  titleWidth?: number;
  gap?: boolean;
  inputable?: boolean;
  onChangeText?: (text: string) => void;
  showRightSwitch?: boolean;
  rightSwitchVal?: boolean;
  onChangeSwitch?: (value: boolean) => void;
  roundedIconEnable?: boolean;
  onRoundedIconPress?: () => void;
  rightChild?: ReactNode;
  leftChild?: ReactNode;
  border?: boolean;
  mode?: 'none' | 'multiline';
  leftIconStyles?: ViewStyle;
  fieldPadding?: number;
  halfWidth?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  inputWidth?: number | undefined;
  roundIconStyle?: ViewStyle;
}

const SingleLineField = ({
  leftIcon,
  subTitle,
  title,
  placeholder,
  rightIcon,
  rightIconRound,
  enable = true,
  onPress,
  titleWidth,
  rightChild,
  leftChild,
  gap = true,
  inputable = false,
  onChangeText,
  showRightSwitch,
  rightSwitchVal,
  onChangeSwitch,
  roundedIconEnable,
  onRoundedIconPress,
  border = false,
  mode = 'none',
  leftIconStyles = {},
  fieldPadding = 10,
  halfWidth = false,
  keyboardType = 'default',
  inputWidth = undefined,
  roundIconStyle = {},
}: Props) => {
  const {colors}: Theme = useTheme();
  return (
    <ModalField
      pressEnable={enable}
      onPress={onPress}
      gap={gap}
      border={border}
      fieldPadding={fieldPadding}
      halfWidth={halfWidth}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          {subTitle ? (
            <>
              <Text style={{...styles.subTitle, color: colors.text, textTransform: 'capitalize'}}>
                {subTitle}
              </Text>
              <GapView mode="vertical" length={4} />
            </>
          ) : null}
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {leftIcon && (
                <>
                  <MCI
                    name={leftIcon}
                    size={22}
                    color={colors.text}
                    style={{
                      ...styles.subTitle,
                      ...leftIconStyles,
                      alignSelf: 'center',
                    }}
                  />
                  <GapView mode="horizontal" />
                </>
              )}
              {inputable ? (
                mode == 'none' ? (
                  <CstmTitleInput
                    width={inputWidth}
                    value={title}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                  />
                ) : (
                  <CstmMultiLine
                    value={title}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                  />
                )
              ) : (
                <>
                  {leftChild && (
                    <>
                      {leftChild}
                      <GapView mode="horizontal" />
                    </>
                  )}
                  <Text
                    style={{
                      color: colors.text,
                      ...styles.title,
                      width: titleWidth,
                    }}>
                    {title}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
        {rightIcon && (
          <MCI
            name={rightIcon}
            size={30}
            color={colors.text}
            style={{...styles.subTitle}}
          />
        )}
        {showRightSwitch && (
          <Switch
            value={rightSwitchVal}
            onValueChange={onChangeSwitch}
            color={colors.primary}
            trackColor={{true: '#5b57578f', false: '#5b57578f'}}
          />
        )}
        {rightIconRound && (
          <RoundedIcon
            iconStyle={roundIconStyle}
            enable={roundedIconEnable ?? false}
            onPress={onRoundedIconPress}
            icon={rightIconRound}
          />
        )}
        {rightChild && rightChild}
      </View>
    </ModalField>
  );
};

export default SingleLineField;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.8,
  },
  subTitle: {
    opacity: 0.6,
  },
});
