import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import {useHookstate, State} from '@hookstate/core';

import {
  NotFound,
  SearchBar,
  SimpleLoader,
  TicketComponent,
} from '../../components';
import styles from './style';
import {globalState} from '../../stores/globalAppState';

import {RenderContacts} from '../Contacts';
import {RenderCompanies} from '../Companies';
import {RenderTickets} from '../Agenda/ListItem';
import {
  companiesList,
  contactsList,
} from '../../constants/SampleArrays';
import {useUpdateEffect} from '../../utils/hooks';
import {searchFromArray} from '../../utils/helperFunctions';
import {userStore} from '../../stores/userStore';
import {companyStore} from '../../stores/companyStore';
import {ticketStore} from '../../stores/ticketStore';
import { getTicketsByUserId } from '../Agenda/utils/functions';

const Search = ({route, navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [clear, setClear] = useState(false);
  const tickets: any = useHookstate(ticketStore.tickets).get();

  const [filteredCompanies, setFilteredCompanies] = useState(companiesList);
  const [filteredContacts, setFilteredContacts] = useState(contactsList);
  const [filteredTickets, setFilteredTickets] = useState(tickets);

  const users = useHookstate(userStore.users).get();
  const companies = useHookstate(companyStore.companies).get();

  const searchTagValue: State<string> = useHookstate(globalState.searchTag);

  useEffect(() => {
    getTicketsByUserId('4')
    setFilteredTickets(tickets)
  }, [])

  useEffect(() => {
    if (route.params) {
      setSearchValue(route.params.data);
      searchTagValue.set('configurations');
      setTimeout(() => setIsSearching(true), 2000);
      setType('configurations');
      searchFilterFunction(route.params.data, 'configurations');
    }
  }, [route.params]);

  const handleSubmit = () => {
    setLoading(true);
    searchFilterFunction(searchValue, searchTagValue.get());
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const searchFilterFunction = async (
    text: string,
    domain: string = 'tickets',
  ) => {
    setIsSearching(true);
    switch (domain) {
      case 'tickets':
        var result = await searchFromArray({
          text: text || '',
          list: tickets,
          keys: ['attributes.detail', 'attributes.subject'],
        });
        console.log('tickets tickets', result);
        setFilteredTickets(result);
      case 'users':
        var result = await searchFromArray({
          text: text,
          list: users,
          keys: ['name', 'company_name'],
        });
        setFilteredContacts(result);
      case 'organizations':
        var result = await searchFromArray({
          text: text,
          list: companies,
          keys: ['name', 'id'],
        });
        setFilteredCompanies(result);
    }
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

  const CenterLabel = (): JSX.Element => {
    return (
      <>
        <Text
          style={{
            color: colors.text,
            ...styles.emptySearchLabel,
          }}>
          What would you like to Search for?
        </Text>
        <Text
          style={{
            color: colors.text,
            ...styles.emptySearchCriteria,
          }}>
          {`Locate Organizations, Users,\n or Tickets.`}
        </Text>
      </>
    );
  };

  useEffect(() => {
    setIsSearching(false);
  }, [searchTagValue.get()]);

  console.log("filteredTickets filteredTickets", filteredTickets);
  
  const handleRenderList = () => {
    switch (searchTagValue.get()) {
      case 'tickets':
        return (
          <FlatList
            data={filteredTickets || []}
            contentContainerStyle={{flex: 1}}
            ListEmptyComponent={
              <View style={{alignSelf: 'center'}}>
                <NotFound label="Tickets" />
              </View>
            }
            renderItem={({item, index}: any) => {
              console.log('item', item);
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
        );
      case 'users':
        return <RenderContacts listData={filteredContacts} />;
      case 'organizations':
        return <RenderCompanies listData={filteredCompanies} />;
      default:
        return;
    }
  };

  // console.log("filteredTickets filteredTickets", filteredTickets, '\n', 'tickets', tickets);
  
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: dark ? '#000000' : '#ffffff',
          ...styles.header,
        }}>
        <SearchBar
          withTag={true}
          searchType={type}
          placeholder={'Search Contacts'}
          fontSize={'small'}
          value={searchValue}
          setChangeText={value => setSearchValue(value)}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />
      </View>
      <View
        style={{
          backgroundColor: colors.background,
          ...styles.content,
        }}>
        {isSearching ? (
          loading ? (
            <SimpleLoader />
          ) : (
            handleRenderList()
          )
        ) : (
          <CenterLabel />
        )}
      </View>
    </View>
  );
};

export default Search;
