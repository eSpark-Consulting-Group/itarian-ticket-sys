import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {useTheme, Theme, useRoute } from '@react-navigation/native';
import { SingleLineField} from '../../../../components';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import II from 'react-native-vector-icons/Ionicons'
import { Activity } from '../../../../types';
const Overview = () => {
  const {colors}: Theme = useTheme();
  const route: any = useRoute()
  const item: Activity = route?.params?.data

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      <SingleLineField
        title={item?.name}
        subTitle="Summary"
        inputable
      />
      <SingleLineField
        title={item?.company_name}
        subTitle="Company"
        rightIcon="chevron-right"
      />
      <SingleLineField
        title={item?.date}
        subTitle="Due Date"
        rightChild={<MCI name="calendar" size={26} color={colors.primary} />}
      />
      <SingleLineField
          title={item?.start_time}
          subTitle="Start Time"
          rightChild={<II name="ios-stopwatch" size={26} color={colors.primary} />}
        />
      <SingleLineField
          title={item?.end_time}
          subTitle="End Time"
          rightChild={<II name="ios-stopwatch" size={26} color={colors.primary} />}
          gap={false}
        />
      <SingleLineField
        title={"Kyle Coney"}
        subTitle="Contact"
        rightIcon="chevron-right"
      />
      <SingleLineField
        title={"Inquiry"}
        subTitle="Type"
        rightIcon="chevron-right"
      />
      <SingleLineField
        title={"Remote"}
        subTitle="Where"
        rightIcon="chevron-right"
      />
      <SingleLineField
        title={"Status"}
        subTitle="Status"
        rightIcon="chevron-right"
      />
       <SingleLineField
        title={"Resource"}
        subTitle="Resource"
        rightIcon="chevron-right"
      />
      <SingleLineField
        title={"Visit potential prospect"}
        subTitle="Notes"
        inputable
        mode="multiline"
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
