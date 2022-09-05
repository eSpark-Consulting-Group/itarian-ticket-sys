import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';

import {Theme, useTheme} from '@react-navigation/native';
import {State, useState as useHState} from '@hookstate/core';

import styles from './style';
import ListItem from '../ListItem';
import {
  scheduledList,
  ticketsList,
  unscheduledList,
} from '../../../constants/SampleArrays';
import {UnschAdditionalButtons} from '../../../constants/ButtonsList';
import {FloatButton} from '../../../components';
import {AdditionalButtons, ScheduledList} from '../../../types';
import {globalState} from '../../../utils/globalState';

const UnscheduledTab = ({navigation}: any) => {
  const {colors}: Theme = useTheme();
  const activeMember: State<string> = useHState(globalState.agendaMember);
  const [filArr, setFilArr] = useState<ScheduledList[]>([]);
  const [actionButtons, setActionButtons] = useState<AdditionalButtons[]>(
    UnschAdditionalButtons,
  );

  const updatePress = () => {
    let tempArr = [...actionButtons];
    tempArr[0].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewActivity',
        params: {from: 'agenda'},
      });
    };
    tempArr[1].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'AddMiscSchedule',
        params: {from: 'agenda'},
      });
    };
    setActionButtons(tempArr);
  };

  useEffect(() => {
    console.log('Agenda Member', activeMember.get());
    console.log('Sched lIst', scheduledList);
    const schTicks = ticketsList.filter(val => !val?.schedule_time);
    const filTickets = schTicks.filter(
      val => val?.assigned_to == activeMember.get(),
    );
    console.log('Schedule Tickets', schTicks);
    console.log('Filtered Tickets', filTickets);
    let aRR: ScheduledList[] = [];
    scheduledList.map(item => {
      let data = {id: item.id, date: item.date, data: filTickets};
      aRR.push(data);
    });
    console.log('Filtered List', aRR);
    setFilArr(aRR);
  }, [activeMember.get()]);

  useEffect(() => {
    updatePress();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={filArr}
        renderItem={({item}) => (
          <ListItem
            dataSource={item}
            onPress={iValue =>
              navigation.navigate('Stack1', {
                screen: 'STickets',
                params: {title: iValue.ticket_no},
              })
            }
          />
        )}
      />
      <FloatButton AdditionalButtons={actionButtons} />
    </View>
  );
};

export default UnscheduledTab;
