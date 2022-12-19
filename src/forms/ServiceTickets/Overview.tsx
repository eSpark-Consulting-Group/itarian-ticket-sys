import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import DatePicker from '@react-native-community/datetimepicker';
import {SingleLineField} from '../../components';
import {DataItem as Item} from '../../types/index';
import {useHookstate} from '@hookstate/core';
import {globalState} from '../../stores/globalAppState';
import {userStore} from '../../stores/userStore';
import {SelectItems} from '../../utils/helperFunctions';

const Overview = ({ticketDetails}: any) => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const ticketPriorities: any = useHookstate(globalState?.ticketPriorities);
  const slaPlans: any = useHookstate(globalState?.slaPlans);
  const helpTopics: any = useHookstate(globalState?.helpTopics);
  const users: any = useHookstate(userStore?.users);
  const [showDate, setShowDate] = useState(false);
  console.log("ticketDetails ticketDetails", ticketDetails);
  
  const [Ds, setDs] = useState<Item[]>([
    {
      title: ticketDetails?.attributes?.subject,
      subTitle: 'Subject',
      inputable: true,
      enable: false,
      isRequired: true,
      key: 'subject',
    },
    {
      title: ticketDetails?.attributes?.detail,
      subTitle: 'Details',
      inputable: true,
      enable: false,
      mode: 'multiline',
      isRequired: true,
      key: 'detail',
    },
    {
      title: ticketDetails?.attributes?.duedate,
      subTitle: 'Due Date ',
      rightIcon: 'calendar',
      onPress: () => {
        setShowDate(true);
      },
      key: 'duedate',
    },
    {
      title: 'Please Select',
      subTitle: 'User',
      list: users?.get() ?? [],
      selectedItem: undefined,
      headerTitle: 'Member',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'user',
    },
    {
      title: 'Please Select',
      subTitle: 'Help Topic',
      list:
        helpTopics.get().map((value: any) => {
          return {
            ...value?.attributes,
            id: value?.id,
          };
        }) || [],
      selectedItem: undefined,
      headerTitle: 'Parent Topic',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'helptopic',
    },
    {
      title: 'Please Select',
      subTitle: 'Staff',
      list: users.get() || [],
      selectedItem: undefined,
      headerTitle: 'Member',
      rightIcon: 'chevron-right',
      isRequired: false,
      key: 'staff',
    },
    {
      title: 'Please Select',
      subTitle: 'Sla Plan',
      list:
        slaPlans.get().map((value: any) => {
          return {
            ...value?.attributes,
            id: value?.id,
          };
        }) || [],
      selectedItem: undefined,
      headerTitle: 'SLA Plan',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'slaplan',
    },
    {
      title: 'Please Select',
      subTitle: 'Ticket Priority',
      list: ticketPriorities.get() || [],
      selectedItem: undefined,
      headerTitle: 'Ticket Priority',
      rightIcon: 'chevron-right',
      isRequired: true,
      key: 'ticketpriority',
    },
  ]);

  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      var obj: any = [...Ds];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDs([...obj]);
    }
  }, [route?.params]);

  const onChangeDate = (event: any, date: any) => {
    setShowDate(false);
    let time = date?.toString()?.substring(16, 21);
    if (event?.type == 'set') {
      Ds[2].title = date?.toDateString();
      setDs([...Ds]);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      {showDate && (
        <DatePicker
          mode={'date'}
          value={new Date()}
          minimumDate={new Date()}
          onChange={onChangeDate}
          positiveButtonLabel={'Set Due Date'}
        />
      )}
      {Ds.map((item: Item, index: number) => (
        <SingleLineField
          key={index}
          title={item.title}
          subTitle={item.isRequired ? item.subTitle + '*' : item.subTitle}
          onPress={
            item?.onPress
              ? item.onPress
              : () =>
                  SelectItems(
                    item,
                    index,
                    navigation,
                    route,
                    'STickets',
                    'Stack1',
                  )
          }
          enable={item.enable}
          inputable={item.inputable}
          mode={item.mode}
          rightIcon={item.rightIcon}
          rightIconRound={item.rightIconRound}
          roundedIconEnable={item.roundedIconEnable}
          onRoundedIconPress={item.onRoundIconPress}
          leftIcon={item.leftIcon}
        />
      ))}
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
