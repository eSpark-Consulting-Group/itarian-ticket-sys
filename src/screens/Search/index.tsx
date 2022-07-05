import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {SearchBar} from '../../components';
import styles from './style';
import {Theme} from '../../theme/colors';
import {moderateScale} from 'react-native-size-matters';

const Search = () => {
  const {colors, dark}: Theme = useTheme();
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
        />
      </View>
      <View
        style={{
          backgroundColor: colors.background,
          ...styles.content,
        }}>
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
      </View>
    </View>
  );
};

export default Search;
