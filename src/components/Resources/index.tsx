import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';

import {State, useHookstate} from '@hookstate/core';

import styles from './styles';
import {NotFound} from '../../components';
import {scheduledList, ticketsList} from '../../constants/SampleArrays';
import { ScheduledList, Ticket} from '../../types';
import {globalState} from '../../stores/globalAppState';
import ListItem from '../../screens/Agenda/ListItem';
import FloatButton from '../FloatButton';
import { searchFromArray } from '../../utils/helperFunctions';
import { useUpdateEffect } from '../../utils/hooks';
import ModalHeader from '../ModalHeader';
import SearchBar from '../SearchBar';
import { Loader } from '../Loader';


const Resources = ({route, navigation}: any) => {
  const activeMember: State<string> = useHookstate(globalState.agendaMember);
  const [filArr, setFilArr] = useState<ScheduledList[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loader, setLoader] = useState<boolean>(false);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    filtration(ticketsList)
  }, [activeMember.get()]);

  const filtration = (ticketsListArr: Ticket[]) => {
    const schTicks = ticketsListArr.filter(val => val?.time_dur);
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
  }

  const onRefresh = () => {
    setIsFetching(true);
    setImmediate(() => {
      setIsFetching(false);
    });
  };

  const searchFilterFunction = async (text: string) => {
    var result = await searchFromArray({
      text: text || '',
      list: ticketsList.filter(val => val?.type == 'Ticket'),
      keys: ['ticket_no', 'summary', 'contact', 'company', 'project'],
    });
    filtration(result);
  };

  const handleSubmit = async () => {
    setLoader(true);
    await searchFilterFunction(searchValue);
    setLoader(false);
  };


  const handleClear = () => {
    setSearchValue('');
    setClear(true);
  };

  useUpdateEffect(() => {
    if (clear) {
      handleSubmit();
      setClear(false);
    }
  }, [clear]);


  return (
    <View style={styles.container}>
       <ModalHeader empty searchHeader>
        <SearchBar
          withTag={false}
          placeholder={'Search...'}
          fontSize={'large'}
          value={searchValue}
          setChangeText={value => setSearchValue(value)}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />
      </ModalHeader>
      <Loader isShow={loader} />
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
