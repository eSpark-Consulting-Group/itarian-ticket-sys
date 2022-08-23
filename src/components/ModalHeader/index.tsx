import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

const ModalHeader = ({
  right,
  title,
  subTitle,
  icon,
  subIcon,
  empty = false,
  children,
}: {
  icon?: string;
  right?: ReactNode;
  title?: string;
  subTitle?: string;
  subIcon?: string;
  empty?: boolean;
  children?: ReactNode;
}) => {
  const {colors, dark}: Theme = useTheme();

  const solidColor = dark ? '#000000' : '#ffffff';

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: solidColor,
      }}>
      <View
        style={{
          flexDirection: !empty ? 'row' : 'column',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {empty
            ? children
            : icon && (
                <MCI
                  name={icon as string}
                  size={16}
                  color={colors.text}
                  style={{paddingTop: 6}}
                />
              )}
          <View>
            <Text style={{...styles.title, color: colors.text}}>{title}</Text>
            <View style={{flexDirection: 'row'}}>
              {subIcon && (
                <MCI
                  name={subIcon as string}
                  size={14}
                  color={colors.text}
                  style={{paddingTop: 6, opacity: 0.5}}
                />
              )}
              {subTitle && (
                <Text style={{...styles.subTitle, color: colors.text}}>
                  {subTitle}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.rightContainer}>{right}</View>
      </View>
    </View>
  );
};

export default ModalHeader;
