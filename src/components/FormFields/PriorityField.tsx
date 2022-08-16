import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';

import {GapView, ModalField} from '..';

const PriorityField = () => {
  const {colors}: Theme = useTheme();
  return (
    <ModalField mode="none" pressEnable={false}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.priorityBox} />
        <GapView mode="horizontal" />
        <Text style={{color: colors.text, ...styles.subTitle}}>
          Priority 3 - Medium
        </Text>
      </View>
      <GapView />
      <Text style={{color: colors.text, ...styles.title}}>
        Decomissioning Old Laptop
      </Text>
      <GapView length={8} />
      <Text style={{color: colors.text, ...styles.subTitle}}>
        Submitted 70 days ago.
      </Text>
    </ModalField>
  );
};

export default PriorityField;

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
