import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import styles from './style';
import {LightTheme, DarkTheme} from '../../theme/colors';

const Splash: React.FC<{}> = () => {
  const {colors} = LightTheme;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={colors.primary} />
      <Text style={styles.textStyle}>Loading...</Text>
    </View>
  );
};

export default Splash;
