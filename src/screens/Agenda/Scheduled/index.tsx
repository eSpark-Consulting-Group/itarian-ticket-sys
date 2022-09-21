import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';

import {Theme, useTheme} from '@react-navigation/native';
import {State, useHookstate} from '@hookstate/core';

import styles from './style';
import ListItem from '../ListItem';
import {FloatButton, NotFound} from '../../../components';
import {scheduledList, ticketsList} from '../../../constants/SampleArrays';
import {SchAdditionalButtons} from '../../../constants/ButtonsList';
import {AdditionalButtons, ScheduledList, Ticket} from '../../../types';
import {globalState} from '../../../stores/globalAppState';

const ScheduledTab = ({route, navigation}: any) => {
  const activeMember: State<string> = useHookstate(globalState.agendaMember);
  const [filArr, setFilArr] = useState<ScheduledList[]>([]);
  const [isFetching, setIsFetching] = useState(false);
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

  useEffect(() => {
    updatePress();
  }, []);

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
      <FloatButton AdditionalButtons={actionButtons} />
    </View>
  );
};

export default ScheduledTab;
