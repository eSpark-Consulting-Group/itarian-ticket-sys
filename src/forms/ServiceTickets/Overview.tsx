import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';
import {PriorityField, SingleLineField} from '../../components';
import {moderateScale} from 'react-native-size-matters';

const Overview = () => {
  const {colors}: Theme = useTheme();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      <PriorityField />
      <SingleLineField
        title="Custom Fields"
        leftIcon="clipboard-text-outline"
        rightIcon="chevron-right"
      />
      <SingleLineField title="Main" subTitle="Site" rightIcon="chevron-right" />
      <SingleLineField
        title="123 Elm Street Tampa, Fl 32364 United States"
        titleWidth={moderateScale(130)}
        subTitle="Address"
        rightIcon="chevron-right"
      />
      <SingleLineField
        title="Sales - Existing"
        subTitle="Board"
        rightIcon="chevron-right"
      />
      <SingleLineField
        title="New"
        subTitle="Status"
        rightIcon="chevron-right"
      />
      <SingleLineField
        title="Sales - Existing"
        subTitle="Board"
        rightIcon="chevron-right"
      />
      <SingleLineField
        title="The Sale of Agreements"
        subTitle="Agreement"
        enable={false}
      />
      <SingleLineField
        title="Type 3"
        subTitle="Type"
        rightIcon="chevron-right"
      />
      <SingleLineField
        title="Subtype 2"
        subTitle="Subtype"
        rightIcon="chevron-right"
      />
      <SingleLineField
        title="Item XYZ"
        subTitle="Item"
        rightIcon="chevron-right"
        onPress={() => {
          console.log('Pressed Item');
        }}
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
