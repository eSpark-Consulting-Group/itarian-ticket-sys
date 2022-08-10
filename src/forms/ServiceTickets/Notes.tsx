import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';

const Notes = () => {
  const {colors}: Theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{color: colors.text}}>Notes</Text>
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
