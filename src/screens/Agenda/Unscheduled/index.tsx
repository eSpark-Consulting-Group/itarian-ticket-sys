import React from 'react';
import {View, FlatList} from 'react-native';

import {useTheme} from '@react-navigation/native';

import styles from './style';
import {Theme} from '../../../theme/colors';
import ListItem from '../ListItem';
import {
  UnschAdditionalButtons,
  unscheduledList,
} from '../../../constants/SampleArrays';
import {FloatButton} from '../../../components';

const UnscheduledTab = ({navigation}: any) => {
  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <FlatList
        data={unscheduledList}
        renderItem={({item}) => (
          <ListItem
            dataSource={item}
            onPress={iValue =>
              navigation.navigate('Stack1', {
                screen: 'STickets',
                params: {title: iValue.ticket_no},
              })
            }
          />
        )}
      />
      <FloatButton AdditionalButtons={UnschAdditionalButtons} />
    </View>
  );
};

export default UnscheduledTab;
