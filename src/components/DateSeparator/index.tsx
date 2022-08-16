import React from 'react';
import {View, Text} from 'react-native';

import {useTheme} from '@react-navigation/native';

import styles from './style';
import {Divider} from 'react-native-paper';
import {Theme} from '../../theme/colors';

const DateSeperator = ({text}: any) => {
  const {colors}: Theme = useTheme();

  return (
    <View style={styles.container}>
      <Divider style={styles.divider_1} />
      <Text style={{...styles.centerContent, color: colors.text}}>{text}</Text>
      <Divider style={styles.divider_2} />
    </View>
  );
};

export default DateSeperator;
