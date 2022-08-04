import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {Divider} from 'react-native-paper';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';
import {Theme} from '../../theme/colors';
import {SearchBar, SimpleLoader} from '../../components';
import {EmptyListMsg} from '../../components';
import {contactsList} from '../../constants/SampleArrays';
import {Contact} from '../../types';
import {useUpdateEffect} from '../../utils/hooks';

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

  const searchFilterFunction = (text: string) => {
    console.log('kia ha search query', text);
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

  const renderList = ({item, index}: {item: Contact; index: number}) => {
    return (
      <View style={styles.listContainer}>
        <Pressable
          onPress={() => console.log('Hello')}
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
              <View
                style={{
                  borderColor: colors.text,
                  opacity: item.phone_no ? 1 : 0.5,
                  ...styles.iconStyle,
                }}>
                <Pressable
                  onPress={() => {
                    item.phone_no ? console.log('calling') : null;
                  }}
                  android_disableSound
                  android_ripple={{
                    color: item.phone_no
                      ? dark
                        ? '#ffffff1f'
                        : '#0000000e'
                      : 'transparent',
                    borderless: true,
                  }}>
                  <MCI
                    name="phone"
                    size={22}
                    color={colors.text}
                    style={styles.icon}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  borderColor: colors.text,
                  opacity: item.email_address ? 1 : 0.5,
                  ...styles.iconStyle,
                }}>
                <Pressable
                  onPress={() => {
                    item.email_address ? console.log('mailing') : null;
                  }}
                  style={{borderRadius: 100}}
                  android_disableSound
                  android_ripple={{
                    color: item.email_address
                      ? dark
                        ? '#ffffff1f'
                        : '#0000000e'
                      : 'transparent',
                    borderless: true,
                  }}>
                  <MCI
                    name="email-outline"
                    size={22}
                    color={colors.text}
                    style={styles.icon}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </Pressable>
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
