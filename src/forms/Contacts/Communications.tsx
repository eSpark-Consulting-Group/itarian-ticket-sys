import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';
import {SingleLineField} from '../../components';

export default function Communications() {
  const {colors}: Theme = useTheme();

  return (
    <View style={styles.container}>
      <SingleLineField
        title="johndoe@acme.com"
        subTitle="Email (Primary)"
        rightIconRound="email-outline"
        enable={true}
      />
      <SingleLineField
        title="(218) 262-5575"
        subTitle="Direct (Primary)"
        rightIconRound="phone"
        enable={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
