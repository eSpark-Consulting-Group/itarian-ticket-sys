import React, {useState} from 'react';
import {View, Text, FlatList, Linking} from 'react-native';
import {Theme, useNavigation, useTheme} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';
import {RoundedIcon, SearchBar, SimpleLoader} from '../../components';
import {EmptyListMsg} from '../../components';
import {contactsList} from '../../constants/SampleArrays';
import {Contact} from '../../types';
import {useUpdateEffect} from '../../utils/hooks';
import _ from 'lodash';
import {CstmPressable} from '../../components';
import { searchFromArray } from '../../utils/helperFunctions';

const Contacts = () => {
  const {colors, dark}: Theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [clear, setClear] = useState(false);

  const [filteredContacts, setFilteredContacts] = useState(contactsList);

  const handleSubmit = () => {
    setLoading(true);
    searchFilterFunction(searchValue);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const searchFilterFunction = async (text: string) => {
    var result = await searchFromArray({
      text: text || '',
      list: contactsList,
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
          placeholder={'Search Contacts'}
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

  const renderList = ({item, index}: {item: Contact; index: number}) => {
    return (
      <View style={styles.listContainer}>
        <CstmPressable
          onPress={() =>
            navigation.navigate('Stack1', {
              screen: 'Contact1',
            })
          }
          android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}>
          <View style={styles.listItemContainer}>
            <View>
              <Text
                style={{
                  color: colors.text,
                }}>
                {item.name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <MCI
                  name="office-building-marker-outline"
                  size={15}
                  color={colors.text}
                  style={{opacity: 0.5}}
                />
                <Text
                  style={{
                    color: colors.text,
                    ...styles.subtitleStyle,
                  }}>
                  {item.company_name}
                </Text>
              </View>
            </View>
            <View style={styles.iconsContainer}>
              <RoundedIcon
                enable={!_.isNull(item.phone_no)}
                icon={'phone'}
                onPress={() => Linking.openURL(`tel:090078601`)}
              />
              <View style={styles.horizontalAdjuster} />
              <RoundedIcon
                enable={!_.isNull(item.email_address)}
                icon={'email-outline'}
                onPress={() => Linking.openURL('mailto:support@example.com')}
              />
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
      <EmptyListMsg label="Contacts" />
    </View>
  );
};

export default Contacts;
