import {View, Text} from 'react-native';
import React from 'react';
import styles from './style';
import {Theme} from '../../theme/colors';
import {useTheme} from '@react-navigation/native';

const StopWatchScreen = () => {
  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <Text>StopWatch Screen</Text>
    </View>
  );
};

export default StopWatchScreen;
