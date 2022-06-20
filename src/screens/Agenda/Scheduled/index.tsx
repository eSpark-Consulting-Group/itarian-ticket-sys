import React from 'react';
import {View, Text} from 'react-native';

import {useTheme} from '@react-navigation/native';

import styles from './style';
import {Theme} from '../../../theme/colors';

const ScheduledTab = () => {
  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <Text>Scheduled Tab</Text>
    </View>
  );
};

export default ScheduledTab;
