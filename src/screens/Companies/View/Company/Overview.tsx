import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';
import {
  PriorityField,
  RoundedIcon,
  SingleLineField,
} from '../../../../components';
import {moderateScale} from 'react-native-size-matters';

const Overview = () => {
  const {colors}: Theme = useTheme();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      <SingleLineField
        title="(815)-555-1234"
        subTitle="Company Phone No."
        rightChild={<RoundedIcon icon="phone" />}
        enable={false}
      />
      <SingleLineField
        title="645 Elm Street Tampa, Fl 32364"
        titleWidth={moderateScale(130)}
        subTitle="Company Address"
        rightChild={<RoundedIcon icon="map-marker-outline" />}
        enable={false}
      />
      <SingleLineField title="Tim Smith" leftIcon="account" enable={false} />
      <SingleLineField
        title="TSmith@AcmeItSolutions.com"
        subTitle="Email (Primary)"
        rightChild={<RoundedIcon icon="email-outline" />}
        enable={false}
      />
    </ScrollView>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  priorityBox: {
    backgroundColor: 'yellow',
    borderWidth: 1,
    height: 10,
    width: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.8,
  },
  subTitle: {
    opacity: 0.6,
  },
});
