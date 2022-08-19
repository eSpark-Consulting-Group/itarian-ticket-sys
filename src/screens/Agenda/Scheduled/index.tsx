import React from 'react';
import {View, FlatList} from 'react-native';

import {useTheme} from '@react-navigation/native';

import styles from './style';
import {Theme} from '../../../theme/colors';
import ListItem from '../ListItem';
import {FloatButton} from '../../../components';
import {
  SchAdditionalButtons,
  scheduledList,
} from '../../../constants/SampleArrays';

const ScheduledTab = ({navigation}: any) => {
  const {colors}: Theme = useTheme();

  return (
    <View style={styles.container}>
      <FlatList
        data={scheduledList}
        renderItem={({item}) => {
          return (
            <ListItem
              dataSource={item}
              onPress={iValue => {
                navigation.navigate('Stack1', {
                  screen: 'STickets',
                  params: {title: iValue.ticket_no.toString()},
                });
              }}
            />
          );
        }}
      />
      <FloatButton AdditionalButtons={SchAdditionalButtons} />
    </View>
  );
};

export default ScheduledTab;
