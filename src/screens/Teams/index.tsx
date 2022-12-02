import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Linking, Alert} from 'react-native';
import {Theme, useNavigation, useTheme} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';

import styles from './style';
import {
  RoundedIcon,
  SearchBar,
  SimpleLoader,
  EmptyListMsg,
  CstmPressable,
} from '../../components';
import {contactsList} from '../../constants/SampleArrays';
import {Contact} from '../../types';
import {useUpdateEffect} from '../../utils/hooks';
import {searchFromArray} from '../../utils/helperFunctions';
import {userStore} from '../../stores/userStore';
import {State, useHookstate} from '@hookstate/core';
import { getAllTeams } from './utils/functions';
import { teamStore } from '../../stores/teamStore';

const Teams = () => {
  const {colors, dark}: Theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [clear, setClear] = useState(false);
  const users = useHookstate(teamStore.teams);
  const [filteredContacts, setFilteredContacts] = useState(users.get());
  console.log("result getAllTeams", filteredContacts)

  useEffect(() => {
    getAllTeams()
  }, [])

  useEffect(() => {
    setFilteredContacts(users.get())
  }, [users])

  const handleSubmit = () => {
    setLoading(true);
    searchFilterFunction(searchValue);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const searchFilterFunction = async (text: string) => {
    var result = await searchFromArray({
      text: text,
      list: users,
      keys: ['name', 'company_name'],
    });
    setFilteredContacts(result);
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

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: dark ? '#000000' : '#ffffff',
          ...styles.header,
        }}>
        <SearchBar
          withTag={false}
          placeholder={'Search Users'}
          fontSize={'large'}
          value={searchValue}
          setChangeText={value => setSearchValue(value)}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />
      </View>
      {loading ? (
        <SimpleLoader />
      ) : (
        <RenderContacts listData={filteredContacts} />
      )}
    </View>
  );
};

export const RenderContacts = ({
  listData = contactsList,
}: {
  listData?: Contact[];
}) => {
  const {colors, dark}: Theme = useTheme();
  const navigation: any = useNavigation();

  const renderList = ({item, index}: {item: any; index: number}) => {
    console.log("item item item", item)
    return (
      <View style={styles.listContainer}>
        <CstmPressable
          onPress={() =>
            navigation.navigate('Stack1', {
              screen: 'TeamDetails',
              params: {teamDetails: item},
            })
          }
          android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}>
          <View style={styles.listItemContainer}>
            <View>
              <Text
                style={{
                  color: colors.text,
                }}>
                {item?.attributes?.name}
              </Text>
            </View>
          </View>
        </CstmPressable>
        {index !== listData.length - 1 && (
          <Divider
            style={{
              backgroundColor: colors.text,
              ...styles.dividerStyle,
            }}
          />
        )}
      </View>
    );
  };

  return (
    <>
      {listData.length !== 0 ? (
        <FlatList data={listData} renderItem={renderList} />
      ) : (
        <NotFound />
      )}
    </>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg label="Teams" />
    </View>
  );
};

export default Teams;
