import React from 'react';
import {View, Text} from 'react-native';

import {useTheme} from '@react-navigation/native';

import styles from './style';
import {Theme} from '../../../theme/colors';

const UnscheduledTab = () => {
  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <Text>Unscheduled Tab</Text>
    </View>
  );
};

export default UnscheduledTab;
