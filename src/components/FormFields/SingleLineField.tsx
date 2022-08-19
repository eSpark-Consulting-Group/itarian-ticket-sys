import React, {ReactNode} from 'react';
import {StyleSheet, Text, View, TextInput, PixelRatio} from 'react-native';
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

const SingleLineField = ({
  leftIcon,
  subTitle,
  title,
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
}: {
  leftIcon?: string;
  subTitle?: string;
  title: string;
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
}) => {
  const {colors, dark}: Theme = useTheme();
  return (
    <ModalField
      mode="none"
      pressEnable={enable}
      onPress={onPress}
      gap={gap}
      border={border}
      fieldPadding={20}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          {subTitle && (
            <Text style={{...styles.subTitle, color: colors.text}}>
              {subTitle}
            </Text>
          )}
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
                    size={20}
                    color={colors.text}
                    style={{...styles.subTitle}}
                  />
                  <GapView mode="horizontal" />
                </>
              )}
              {inputable ? (
                mode == 'none' ? (
                  <CstmTitleInput value={title} onChangeText={onChangeText} />
                ) : (
                  <CstmMultiLine value={title} onChangeText={onChangeText} />
                )
              ) : (
                <>
                  {leftChild && leftChild}
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
          />
        )}
        {rightIconRound && (
          <RoundedIcon
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
  container: {
    flex: 1,
  },
  priorityBox: {
    backgroundColor: 'yellow',
    borderWidth: 1,
    height: 10,
    width: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.8,
  },
  subTitle: {
    opacity: 0.6,
  },
  input: {
    height: 40,
    borderWidth: 2,
    borderRadius: 6,
    padding: 10,
    width: '100%',
  },
});
