import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';

import {State, useHookstate} from '@hookstate/core';

import styles from './styles';
import {FloatButton, NotFound} from '../../components';
import {scheduledList, ticketsList} from '../../constants/SampleArrays';
import {AdditionalButtons, ScheduledList, Ticket} from '../../types';
import {globalState} from '../../stores/globalAppState';
import ListItem from '../../screens/Agenda/ListItem';

const TicketListing = ({route, navigation}: any) => {
  const activeMember: State<string> = useHookstate(globalState.agendaMember);
  const [filArr, setFilArr] = useState<ScheduledList[]>([]);
  const [isFetching, setIsFetching] = useState(false);



  useEffect(() => {
    const schTicks = ticketsList.filter(val => val?.time_dur);
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
    setFilArr(aRR);
  }, [activeMember.get()]);

  const onRefresh = () => {
    setIsFetching(true);
    setImmediate(() => {
      setIsFetching(false);
    });
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={filArr}
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
              dataSource={item}
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
    </View>
  );
};

export default TicketListing;
