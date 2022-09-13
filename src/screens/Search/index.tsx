import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import {useHookstate, State} from '@hookstate/core';

import {SearchBar, SimpleLoader} from '../../components';
import styles from './style';
import {globalState} from '../../stores/globalAppState';

import {RenderContacts} from '../Contacts';
import {RenderCompanies} from '../Companies';
import {RenderConfigurations} from '../Configurations';
import {RenderTickets} from '../Agenda/ListItem';
import {
  companiesList,
  contactsList,
  configurationsList,
  ticketsList,
} from '../../constants/SampleArrays';
import {useUpdateEffect} from '../../utils/hooks';
import {searchFromArray} from '../../utils/helperFunctions';

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
  const [filteredTickets, setFilteredTickets] = useState(ticketsList);

  const searchTagValue: State<string> = useHookstate(globalState.searchTag);

  useEffect(() => {
    if (route.params) {
      setSearchValue(route.params.data);
      setType('configurations');
      handleSubmit(route.params.data);
    }
  }, [route.params]);

  const handleSubmit = (val?: string) => {
    setIsSearching(true);
    setLoading(true);
    searchFilterFunction(val ?? searchValue, searchTagValue.get());
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const searchFilterFunction = async (
    text: string,
    domain: string = 'tickets',
  ) => {
    switch (domain) {
      case 'tickets':
        var result = await searchFromArray({
          text: text || '',
          list: ticketsList,
          keys: [
            'ticket_no',
            'ticket_summary',
            'contact',
            'company',
            'project',
          ],
        });
        setFilteredTickets(result);
      case 'contacts':
        var result = await searchFromArray({
          text: text || '',
          list: contactsList,
          keys: ['name', 'company_name'],
        });
        setFilteredContacts(result);
      case 'companies':
        var result = await searchFromArray({
          text: text || '',
          list: companiesList,
          keys: ['name', 'id'],
        });
        setFilteredCompanies(result);
      case 'configurations':
        var result = await searchFromArray({
          text: text || '',
          list: configurationsList,
          keys: ['name', 'company_name', 'model', 'serial', 'tag'],
        });
        setFilteredConfigurations(result);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    setClear(true);
  };

  useUpdateEffect(() => {
    if (clear) {
      console.log('done');
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
          {`Locate Companies, Contacts,\n Configurations, or Tickets.`}
        </Text>
      </>
    );
  };

  useEffect(() => {
    console.log('kia hai value', searchTagValue.get());
    setIsSearching(false);
  }, [searchTagValue.get()]);

  const handleRenderList = () => {
    switch (searchTagValue.get()) {
      case 'tickets':
        return <RenderTickets listData={filteredTickets} />;
      case 'contacts':
        return <RenderContacts listData={filteredContacts} />;
      case 'companies':
        return <RenderCompanies listData={filteredCompanies} />;
      case 'configurations':
        return <RenderConfigurations listData={filteredConfigurations} />;
      default:
        return;
    }
  };

  console.log('Getting search value', searchValue);
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
