import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';

import {State, useHookstate} from '@hookstate/core';
import {Theme, useTheme} from '@react-navigation/native';

import styles from './styles';
import {NotFound} from '../../components';
import {scheduledList, ticketsList} from '../../constants/SampleArrays';
import {ScheduledList, Ticket} from '../../types';
import {globalState} from '../../stores/globalAppState';
import ListItem from '../../screens/Agenda/ListItem';
import FloatButton from '../FloatButton';
import {searchFromArray} from '../../utils/helperFunctions';
import {useUpdateEffect} from '../../utils/hooks';
import ModalHeader from '../ModalHeader';
import SearchBar from '../SearchBar';
import {Loader} from '../Loader';

const Resources = ({route, navigation}: any) => {
  const activeMember: State<any> = useHookstate(globalState.agendaMember);
  const {colors, dark}: Theme = useTheme();
  const [filArr, setFilArr] = useState<ScheduledList[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loader, setLoader] = useState<boolean>(false);
  const [clear, setClear] = useState(false);

  const filtration = (ticketsListArr: Ticket[]) => {
    const schTicks = ticketsListArr.filter(val => val?.time_dur);

    const filTickets = schTicks.filter(val => {
      return val?.ticket_no == route?.params?.ticket;
    });
    let aRR: ScheduledList[] = [];
    if (filTickets.length > 0) {
      scheduledList.map(item => {
        let data = {id: item.id, date: item.date, data: filTickets};
        aRR.push(data);
      });
    }
    console.log(aRR);
    setFilArr(aRR);
  };

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

  useEffect(() => {
    filtration(ticketsList);
    console.log('what?', ticketsList);
  }, []);

  useUpdateEffect(() => {
    if (clear) {
      handleSubmit();
      setClear(false);
    }
  }, [clear]);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: dark ? '#000000' : '#ffffff',
          ...styles.header,
        }}>
        <SearchBar
          withTag={false}
          placeholder={'Search...'}
          fontSize={'large'}
          value={searchValue}
          setChangeText={value => setSearchValue(value)}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />
      </View>
      <Loader isShow={loader} />
      <FlatList
        contentContainerStyle={{flex: 1}}
        data={filArr}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={{alignSelf: 'center'}}>
            <NotFound label="Tickets" />
          </View>
        }
        renderItem={({item}) => {
          console.log('bta item', item);
          return <ListItem dataSource={item} isResource />;
        }}
      />
      <FloatButton onPress={() => navigation?.navigate('AddResource')} />
    </View>
  );
};

export default Resources;
