import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import {useHookstate, State} from '@hookstate/core';

import {SearchBar, SimpleLoader} from '../../components';
import styles from './style';
import {globalState} from '../../stores/globalAppState';

import {RenderContacts} from '../Contacts';
import {RenderCompanies} from '../Companies';
import {RenderTickets} from '../Agenda/ListItem';
import {
  companiesList,
  contactsList,
  configurationsList,
  ticketsList,
} from '../../constants/SampleArrays';
import {useUpdateEffect} from '../../utils/hooks';
import {searchFromArray} from '../../utils/helperFunctions';
import {userStore} from '../../stores/userStore';
import {companyStore} from '../../stores/companyStore';

const Search = ({route}: any) => {
  const {colors, dark}: Theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [clear, setClear] = useState(false);

  const [filteredCompanies, setFilteredCompanies] = useState(companiesList);
  const [filteredContacts, setFilteredContacts] = useState(contactsList);
  const [filteredConfigurations, setFilteredConfigurations] =
    useState(configurationsList);
  const [filteredTickets, setFilteredTickets] = useState(
    ticketsList.filter(val => val?.type == 'Ticket'),
  );
  const users = useHookstate(userStore.users).get();
  const companies = useHookstate(companyStore.companies).get();

  const searchTagValue: State<string> = useHookstate(globalState.searchTag);

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
          list: ticketsList.filter(val => val?.type == 'Ticket'),
          keys: ['ticket_no', 'summary', 'contact', 'company', 'project'],
        });
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

  const handleRenderList = () => {
    switch (searchTagValue.get()) {
      case 'tickets':
        return <RenderTickets listData={filteredTickets} />;
      case 'users':
        return <RenderContacts listData={filteredContacts} />;
      case 'organizations':
        return <RenderCompanies listData={filteredCompanies} />;
      default:
        return;
    }
  };

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
