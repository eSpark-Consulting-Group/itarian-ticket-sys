import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { State, useHookstate } from '@hookstate/core';
import { useNavigation } from '@react-navigation/native';

import styles from './style';
import { FloatButton, NotFound, TicketComponent } from '../../../components';
import { scheduledList, ticketsList } from '../../../constants/SampleArrays';
import { SchAdditionalButtons } from '../../../constants/ButtonsList';
import { AdditionalButtons, ScheduledList } from '../../../types';
import { globalState } from '../../../stores/globalAppState';
import { ticketStore } from '../../../stores/ticketStore';
import { getTicketsByUserId } from '../utils/functions';

const ScheduledTab = ({ route }: any) => {
  const activeMember: State<any> = useHookstate(globalState.agendaMember);
  const tickets: any = useHookstate(ticketStore.tickets).get();
  const [isFetching, setIsFetching] = useState(false);
  const navigation = useNavigation<any>();
  const [actionButtons, setActionButtons] =
    useState<AdditionalButtons[]>(SchAdditionalButtons);

  const updatePress = () => {
    let tempArr = [...actionButtons];
    tempArr[0].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewTicket',
      });
    };
    setActionButtons(tempArr);
  };

  const fetchRecord = () => {
    const schTicks = ticketsList.filter(val => val?.time_dur);
    getTicketsByUserId(activeMember.get()?.id);
    const filTickets = schTicks.filter(
      val => val?.assigned_to == activeMember.get()?.name,
    );
    let aRR: ScheduledList[] = [];
    if (filTickets.length > 0) {
      scheduledList.map(item => {
        let data = { id: item.id, date: item.date, data: filTickets };
        aRR.push(data);
      });
    }
    setIsFetching(false);
  };
  useEffect(() => {
    fetchRecord();
  }, [activeMember.get()?.name]);

  useEffect(() => {
    updatePress();
  }, []);

  const onRefresh = () => {
    setIsFetching(true);
    setImmediate(() => {
      setIsFetching(false);
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tickets || []}
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={{ alignSelf: 'center' }}>
            <NotFound label="Tickets" />
          </View>
        }
        renderItem={({ item, index }) => {
          return (
            <TicketComponent
              item2={item}
              ind={index}
              onPress={() => {
                navigation.navigate('Stack1', {
                  screen: 'STickets',
                  params: {
                    title: `Ticket# ${item?.id?.toString()}`,
                    ticket_info: {
                      id: item.id?.toString(),
                      summary: item?.attributes?.detail,
                      data: item,
                    },
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
