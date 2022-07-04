import React from 'react';
import {View, Text, Dimensions} from 'react-native';

import {useTheme} from '@react-navigation/native';

import styles from './style';
import {Divider} from 'react-native-paper';
import {Theme} from '../../theme/colors';

const {width} = Dimensions.get('window');

const DateSeperator = ({text}: any) => {
  const {colors}: Theme = useTheme();

  return (
    <View style={styles.container}>
      <Divider style={styles.divider_1} />
      <Text style={{paddingHorizontal: 10, color: colors.text}}>{text}</Text>
      <Divider style={styles.divider_2} />
    </View>
  );
};

export default DateSeperator;
