import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { State, useHookstate } from '@hookstate/core';
import { Theme, useNavigation, useTheme } from '@react-navigation/native';

import styles from './style';
import { FloatButton, NotFound, TicketComponent } from '../../../components';
import { ticketsList } from '../../../constants/SampleArrays';
import { SchAdditionalButtons } from '../../../constants/ButtonsList';
import { AdditionalButtons } from '../../../types';
import { globalState } from '../../../stores/globalAppState';
import { ticketStore } from '../../../stores/ticketStore';
import { getTicketsByUserId } from '../utils/functions';
import { Divider } from 'react-native-paper';

const ScheduledTab = ({ route }: any) => {
  const { colors }: Theme = useTheme();
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
      {tickets.length > 0 ? (
        <FlatList
          data={tickets || []}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
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
          ItemSeparatorComponent={() => (
            <Divider
              style={{
                backgroundColor: colors.text,
                height: 1.5,
                opacity: 0.2,
              }}
            />
          )}
        />
      ) : (
        <NotFound label="Tickets" />
      )}
      <FloatButton AdditionalButtons={actionButtons} />
    </View>
  );
};

export default ScheduledTab;
