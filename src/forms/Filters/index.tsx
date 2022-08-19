import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';
import {SingleLineField} from '../../components';
import {Filter} from '../../types';

export default function App({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const {colors}: Theme = useTheme();
  const [dataSource, setDataSource] = useState(route?.params?.dataSource);

  useEffect(() => {
    console.log('route?.params.dataSource:', dataSource);
  }, []);

  // const dataSource: Filter[] = [
  //   {
  //     title: 'My Tickets Only',
  //     showRightSwitch: true,
  //     enable: false,
  //     rightSwitchVal: ticketSwitch,
  //     onChangeSwitch: value => setTicketSwitch(value),
  //   },
  //   {
  //     title: 'All',
  //     subTitle: 'Service Board',
  //     rightIcon: 'chevron-right',
  //   },
  //   {
  //     title: 'All',
  //     subTitle: 'Service Board',
  //     enable: false,
  //   },
  //   {
  //     title: 'Please Select',
  //     subTitle: 'Priority',
  //     rightIcon: 'chevron-right',
  //   },
  //   {
  //     title: 'Please Select',
  //     subTitle: 'Company',
  //     rightIcon: 'chevron-right',
  //   },
  //   {
  //     title: 'Please Select',
  //     subTitle: 'Site',
  //     enable: false,
  //   },
  //   {
  //     title: 'Contact',
  //     subTitle: 'Please Select',
  //     rightIcon: 'chevron-right',
  //   },
  //   {
  //     title: 'All',
  //     subTitle: 'Type',
  //     enable: false,
  //   },
  //   {
  //     title: 'All',
  //     subTitle: 'Subtype',
  //     enable: false,
  //   },
  //   {
  //     title: 'All',
  //     subTitle: 'Item',
  //     enable: false,
  //   },
  // ];

  const updateSwitch = (index: number) => {
    let tempArr: Filter[] = [...dataSource];
    tempArr[index].rightSwitchVal = !tempArr[index].rightSwitchVal;
    console.log('tempArr', tempArr);
    setDataSource(tempArr);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      {dataSource.map((item: Filter, index: number) => (
        <SingleLineField
          key={index}
          subTitle={item.subTitle}
          title={item.title}
          enable={item.enable}
          titleWidth={item.titleWidth}
          rightIcon={item.rightIcon}
          showRightSwitch={item.showRightSwitch}
          rightSwitchVal={item.rightSwitchVal}
          onChangeSwitch={() => updateSwitch(index)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
