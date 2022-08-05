import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../theme/colors';

const Details = () => {
  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{color: colors.text}}>Service Tickets Details Form</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
