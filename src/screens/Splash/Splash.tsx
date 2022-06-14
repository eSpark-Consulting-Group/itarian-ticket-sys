import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import styles from './style';

const Splash: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color="rgb(231, 110, 80)" />
      <Text style={styles.textStyle}>Loading...</Text>
    </View>
  );
};

export default Splash;
