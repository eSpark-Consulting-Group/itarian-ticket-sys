import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl, Text} from 'react-native';

import {State, useHookstate} from '@hookstate/core';

import styles from './style';
import ListItem from '../ListItem';
import {FloatButton, NotFound} from '../../../components';
import {scheduledList, ticketsList} from '../../../constants/SampleArrays';
import {SchAdditionalButtons} from '../../../constants/ButtonsList';
import {AdditionalButtons, ScheduledList, Ticket} from '../../../types';
import {globalState} from '../../../stores/globalAppState';
import { ticketStore } from '../../../stores/ticketStore';
import { Theme, useTheme } from '@react-navigation/native';
import { getTicketsByUserId } from '../utils/functions';

const ScheduledTab = ({route, navigation}: any) => {
  const activeMember: State<any> = useHookstate(globalState.agendaMember);
  const tickets: any = useHookstate(ticketStore.tickets).get();
  const [filArr, setFilArr] = useState<ScheduledList[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const {colors}: Theme = useTheme();
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
    const schTicks = ticketsList.filter(val => val?.time_dur);
    getTicketsByUserId(activeMember.get()?.id)
    const filTickets = schTicks.filter(
      val => val?.assigned_to == activeMember.get()?.name,
    );
    let aRR: ScheduledList[] = [];
    if (filTickets.length > 0) {
      scheduledList.map(item => {
        let data = {id: item.id, date: item.date, data: filTickets};
        aRR.push(data);
      });
    }
    setFilArr(aRR);
  }, [activeMember.get()?.name]);

  const onRefresh = () => {
    setIsFetching(true);
    setImmediate(() => {
      setIsFetching(false);
    });
  };

  useEffect(() => {
    updatePress();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tickets || []}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={{marginTop: 50}}>
            <NotFound label="Tickets" />
          </View>
        }
        renderItem={({item}) => {
          return (
            <ListItem
              dataSource={{id: scheduledList[0].id, date: scheduledList[0].date, data: [ticketsList[0]]}}
              onPress={iValue => {
                iValue.type == 'Ticket'
                  ? navigation.navigate('Stack1', {
                      screen: 'STickets',
                      params: {
                        title: iValue?.ticket_no?.toString(),
                        ticket_info: {
                          id: iValue.ticket_no?.toString(),
                          summary: iValue.summary,
                        },
                      },
                    })
                  : navigation.navigate('Stack1', {
                      screen: 'Activities',
                      params: {
                        data: iValue,
                      },
                    });
              }}
            />
          );
        }}
      />
      <FloatButton AdditionalButtons={actionButtons} />
    </View>
  );
};

export default ScheduledTab;
