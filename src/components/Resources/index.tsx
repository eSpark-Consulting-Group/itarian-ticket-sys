import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';

import {State, useHookstate} from '@hookstate/core';

import styles from './styles';
import {NotFound} from '../../components';
import {scheduledList, ticketsList} from '../../constants/SampleArrays';
import { ScheduledList} from '../../types';
import {globalState} from '../../stores/globalAppState';
import ListItem from '../../screens/Agenda/ListItem';
import FloatButton from '../FloatButton';

const Resources = ({route, navigation}: any) => {
  const activeMember: State<string> = useHookstate(globalState.agendaMember);
  const [filArr, setFilArr] = useState<ScheduledList[]>([]);
  const [isFetching, setIsFetching] = useState(false);
 
  useEffect(() => {
    const schTicks = ticketsList.filter(val => val?.time_dur);
    const filTickets = schTicks.filter((val) => {
        return (val?.ticket_no == route?.params?.ticket)
    });
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
              isResource
            />
          );
        }}
      />
       <FloatButton
        onPress={() => navigation?.navigate('AddResource')}
      />
    </View>
  );
};

export default Resources;
