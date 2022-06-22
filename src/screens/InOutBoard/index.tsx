import {View, Text} from 'react-native';
import React from 'react';
import styles from './style';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../theme/colors';

const InOutBoardScreen = () => {
  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{color: colors.text}}>In/Out Board Screen</Text>
    </View>
  );
};

export default InOutBoardScreen;
