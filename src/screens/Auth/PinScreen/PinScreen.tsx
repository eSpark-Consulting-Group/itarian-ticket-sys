import {Theme, useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';

import styles from './style';

const PinScreen = () => {
  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <Text>Pin Screen</Text>
    </View>
  );
};

export default PinScreen;
