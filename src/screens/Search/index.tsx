import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {SearchBar} from '../../components';
import styles from './style';
import {Theme} from '../../theme/colors';
import {moderateScale} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const Search = () => {
  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar />
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.background,
        }}>
        <Text
          style={{
            color: colors.text,
            fontWeight: 'bold',
            fontSize: 17,
            opacity: 0.6,
          }}>
          What would you like to Search for?
        </Text>
        <Text
          style={{
            color: colors.text,
            fontSize: 15,
            opacity: 0.6,
            textAlign: 'center',
          }}>
          {`Locate Companies, Contacts,\n Configurations, or Tickets.`}
        </Text>
      </View>
    </View>
  );
};

export default Search;
