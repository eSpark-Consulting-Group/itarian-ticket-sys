import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';

const Details = () => {
  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{color: colors.text}}>Details</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
