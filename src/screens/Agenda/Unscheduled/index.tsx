import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';

import {State, useHookstate} from '@hookstate/core';

import styles from './style';
import ListItem from '../ListItem';
import {scheduledList, ticketsList} from '../../../constants/SampleArrays';
import {UnschAdditionalButtons} from '../../../constants/ButtonsList';
import {FloatButton, NotFound} from '../../../components';
import {AdditionalButtons, ScheduledList} from '../../../types';
import {globalState} from '../../../stores/globalAppState';

const UnscheduledTab = ({navigation}: any) => {
  const activeMember: State<any> = useHookstate(globalState.agendaMember);
  const [filArr, setFilArr] = useState<ScheduledList[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [actionButtons, setActionButtons] = useState<AdditionalButtons[]>(
    UnschAdditionalButtons,
  );

  const updatePress = () => {
    let tempArr = [...actionButtons];
    tempArr[0].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewTicket',
      });
    };
    // tempArr[1].onPress = () => {
    //   navigation.navigate('Stack1', {
    //     screen: 'AddMiscSchedule',
    //     params: {from: 'agenda'},
    //   });
    // };
    setActionButtons(tempArr);
  };

  useEffect(() => {
    const schTicks = ticketsList.filter(val => !val?.time_dur);
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
        data={filArr}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={{marginTop: 50}}>
            <NotFound label="Tickets" />
          </View>
        }
        renderItem={({item}) => (
          <ListItem
            dataSource={item}
            onPress={iValue =>
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
