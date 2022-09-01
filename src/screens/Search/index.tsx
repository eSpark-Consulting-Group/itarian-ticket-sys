import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useState as useHState, State} from '@hookstate/core';

import {SearchBar, SimpleLoader} from '../../components';
import styles from './style';
import {Theme} from '../../theme/colors';
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

const Search = () => {
  const {colors, dark}: Theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [clear, setClear] = useState(false);

  const [filteredCompanies, setFilteredCompanies] = useState(companiesList);
  const [filteredContacts, setFilteredContacts] = useState(contactsList);
  const [filteredConfigurations, setFilteredConfigurations] =
    useState(configurationsList);
  const [filteredTickets, setFilteredTickets] = useState(ticketsList);

  const searchTagValue: State<string> = useHState(globalState.searchTag);

  const handleSubmit = () => {
    setIsSearching(true);
    setLoading(true);
    searchFilterFunction(searchValue, searchTagValue.get());
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const searchFilterFunction = (text: string, domain: string = 'tickets') => {
    console.log('kia ha search query', text);
    switch (domain) {
      case 'tickets':
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource
          // Update FilteredDataSource
          const newData = ticketsList.filter(item => {
            const itemData = `${
              item.ticket_no
            } ${item.ticket_summary.toUpperCase()} ${item.contact?.toUpperCase()} ${item.company.toUpperCase()} ${item.project?.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredTickets(newData);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setFilteredTickets(ticketsList);
        }
      case 'contacts':
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource
          // Update FilteredDataSource
          const newData = contactsList.filter(item => {
            const itemData = `${item.name.toUpperCase()} ${item.company_name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredContacts(newData);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setFilteredContacts(contactsList);
        }
      case 'companies':
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource
          // Update FilteredDataSource
          const newData = companiesList.filter(item => {
            const itemData = `${item.name.toUpperCase()} ${item.id.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredCompanies(newData);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setFilteredCompanies(companiesList);
        }
      case 'configurations':
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource
          // Update FilteredDataSource
          const newData = configurationsList.filter(item => {
            const itemData = `
              ${item.name.toUpperCase()} 
              ${item.company_name.toUpperCase()} 
              ${item.model?.toUpperCase()} 
              ${item.serial?.toUpperCase()} 
              ${item.tag?.toUpperCase()}
            `;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredConfigurations(newData);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
          setFilteredConfigurations(configurationsList);
        }
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
