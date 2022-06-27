import React from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {Divider} from 'react-native-paper';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';
import {Theme} from '../../theme/colors';
import {SearchBar} from '../../components';
import {EmptyListMsg} from '../../components';
import {
  contactsList,
  Contacts as ContactsType,
} from '../../constants/SampleArrays';

const Contacts = () => {
  const {colors, dark}: Theme = useTheme();

  const renderList = ({item, index}: {item: ContactsType; index: number}) => {
    return (
      <View style={styles.listContainer}>
        <Pressable
          onPress={() => console.log('Hello')}
          android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}>
          <View
            style={{
              flexDirection: 'row',
              padding: moderateScale(15),
              justifyContent: 'space-between',
            }}>
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
                    fontSize: 10,
                    opacity: 0.75,
                    marginLeft: 3,
                    textAlignVertical: 'bottom',
                  }}>
                  {item.company_name}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: moderateScale(80),
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.text,
                  borderRadius: 100,
                  padding: 5,
                  opacity: item.phone_no ? 1 : 0.5,
                }}>
                <Pressable
                  style={{zIndex: 1}}
                  disabled={item.phone_no ? false : true}
                  android_ripple={{
                    color: dark ? '#ffffff1f' : '#0000000e',
                    borderless: true,
                  }}>
                  <MCI name="phone" size={22} color={colors.text} />
                </Pressable>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.text,
                  borderRadius: 100,
                  padding: 5,
                  opacity: item.email_address ? 1 : 0.5,
                }}>
                <Pressable
                  disabled={item.email_address ? false : true}
                  style={{borderRadius: 100}}
                  android_ripple={{
                    color: dark ? '#ffffff1f' : '#00000026',
                    borderless: true,
                  }}>
                  <MCI name="email-outline" size={22} color={colors.text} />
                </Pressable>
              </View>
            </View>
          </View>
        </Pressable>
        {index !== contactsList.length - 1 && (
          <Divider
            style={{
              backgroundColor: colors.text,
              opacity: 0.2,
              transform: [{scale: 2}],
            }}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: dark ? '#000000' : '#ffffff',
          ...styles.header,
        }}>
        <SearchBar withTag={false} placeholder={'Search Contacts'} />
      </View>
      {contactsList.length !== 0 ? (
        <FlatList data={contactsList} renderItem={renderList} />
      ) : (
        <NotFound />
      )}
    </View>
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
