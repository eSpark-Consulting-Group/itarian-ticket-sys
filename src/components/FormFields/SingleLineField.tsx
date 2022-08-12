import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import {GapView, ModalField} from '..';

const SingleLineField = ({
  leftIcon,
  subTitle,
  title,
  rightIcon,
  enable = true,
  onPress,
  titleWidth,
  rightChild,
}: {
  leftIcon?: string;
  subTitle?: string;
  title: string;
  rightIcon?: string;
  enable?: boolean;
  onPress?: () => void;
  titleWidth?: number;
  rightChild?: ReactNode;
}) => {
  const {colors, dark}: Theme = useTheme();
  return (
    <ModalField
      mode="none"
      pressEnable={enable}
      onPress={onPress}
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
                    name={leftIcon} // "clipboard-list-outline"
                    size={20}
                    color={colors.text}
                    style={{...styles.subTitle}}
                  />
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
            </View>
          </View>
        </View>
        {rightIcon && (
          <MCI
            name={rightIcon} // "chevron-right"
            size={30}
            color={colors.text}
            style={{...styles.subTitle}}
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
});
