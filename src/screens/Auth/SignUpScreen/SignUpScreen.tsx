import {Theme, useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';

import styles from './style';

const SignUpScreen = () => {
  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <Text>SignUp Screen</Text>
    </View>
  );
};

export default SignUpScreen;
