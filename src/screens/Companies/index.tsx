import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import {SearchBar} from '../../components';
import styles from './style';
import {Theme} from '../../theme/colors';
import {EmptyListMsg} from '../../components';

const Companies = () => {
  const {colors, dark}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: dark ? '#000000' : '#ffffff',
          ...styles.header,
        }}>
        <SearchBar withTag={false} placeholder={'Search Companies'} />
      </View>
      <View style={styles.content}>
        <EmptyListMsg label="Companies" />
      </View>
    </View>
  );
};

export default Companies;
