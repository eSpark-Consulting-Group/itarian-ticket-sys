import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';

import {Theme, useTheme} from '@react-navigation/native';
import {State, useState as useHState} from '@hookstate/core';

import styles from './style';
import ListItem from '../ListItem';
import {FloatButton, NotFound} from '../../../components';
import {scheduledList, ticketsList} from '../../../constants/SampleArrays';
import {SchAdditionalButtons} from '../../../constants/ButtonsList';
import {AdditionalButtons, ScheduledList, Ticket} from '../../../types';
import {globalState} from '../../../stores/globalAppState';

const ScheduledTab = ({route, navigation}: any) => {
  console.log('route props', route);

  const {colors}: Theme = useTheme();
  const activeMember: State<string> = useHState(globalState.agendaMember);
  const [filArr, setFilArr] = useState<ScheduledList[]>([]);
  const [actionButtons, setActionButtons] =
    useState<AdditionalButtons[]>(SchAdditionalButtons);

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
    tempArr[2].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewTicket',
      });
    };
    setActionButtons(tempArr);
  };

  useEffect(() => {
    console.log('Agenda Member', activeMember.get());
    console.log('Sched lIst', scheduledList);
    const schTicks = ticketsList.filter(val => val?.schedule_time);
    const filTickets = schTicks.filter(
      val => val?.assigned_to == activeMember.get(),
    );
    let aRR: ScheduledList[] = [];
    if (filTickets.length > 0) {
      scheduledList.map(item => {
        let data = {id: item.id, date: item.date, data: filTickets};
        aRR.push(data);
      });
    }
    console.log('Filtered List', aRR);
    setFilArr(aRR);
  }, [activeMember.get()]);

  useEffect(() => {
    updatePress();
  }, []);

  return (
    <View style={styles.container}>
      {filArr.length > 0 ? (
        <FlatList
          data={filArr}
          renderItem={({item}) => {
            // console.log('ITEM', item);
            return (
              <ListItem
                dataSource={item}
                onPress={iValue => {
                  console.log('iValue', iValue);
                  navigation.navigate('Stack1', {
                    screen: 'STickets',
                    params: {
                      title: iValue.ticket_no.toString(),
                      ticket_info: {
                        id: iValue.ticket_no.toString(),
                        summary: iValue.ticket_summary,
                      },
                    },
                  });
                }}
              />
            );
          }}
        />
      ) : (
        <NotFound label="Tickets" />
      )}
      <FloatButton AdditionalButtons={actionButtons} />
    </View>
  );
};

export default ScheduledTab;
