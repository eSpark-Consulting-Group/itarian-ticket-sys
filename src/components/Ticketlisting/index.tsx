import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';

import {State, useHookstate} from '@hookstate/core';

import {NotFound} from '../../components';
import {scheduledList, ticketsList} from '../../constants/SampleArrays';
import {ScheduledList, Ticket} from '../../types';
import {globalState} from '../../stores/globalAppState';
import ListItem from '../../screens/Agenda/ListItem';
import {searchFromArray} from '../../utils/helperFunctions';
import {useUpdateEffect} from '../../utils/hooks';
import ModalHeader from '../ModalHeader';
import ModalView from '../ModalView';
import SearchBar from '../SearchBar';
import {Loader} from '../Loader';

const TicketListing = ({route, navigation}: any) => {
  const activeMember: State<any> = useHookstate(globalState.agendaMember);
  const [filArr, setFilArr] = useState<ScheduledList[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loader, setLoader] = useState<boolean>(false);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    filteration(ticketsList)
  }, [activeMember.get()?.name]);

  const filteration = (ticketsListArr: Ticket[]) => {
    const schTicks = ticketsListArr.filter(val => val?.time_dur);
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
  };

  const searchFilterFunction = async (text: string) => {
    var result = await searchFromArray({
      text: text || '',
      list: ticketsList,
      keys: ['ticket_no', 'summary', 'contact', 'company', 'project'],
    });
    filteration(result);
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

  const onRefresh = () => {
    setIsFetching(true);
    setImmediate(() => {
      setIsFetching(false);
    });
  };

  return (
    <ModalView>
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
              onPress={iValue => {
                iValue.type == 'Ticket'
                  ? navigation.navigate('Stack3', {
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
    </ModalView>
  );
};

export default TicketListing;
