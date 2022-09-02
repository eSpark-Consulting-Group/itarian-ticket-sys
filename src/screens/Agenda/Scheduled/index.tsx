import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';

import {useTheme} from '@react-navigation/native';

import styles from './style';
import {Theme} from '../../../theme/colors';
import ListItem from '../ListItem';
import {FloatButton} from '../../../components';
import {scheduledList} from '../../../constants/SampleArrays';
import {SchAdditionalButtons} from '../../../constants/ButtonsList';
import {AdditionalButtons} from '../../../types';

const ScheduledTab = ({navigation}: any) => {
  const {colors}: Theme = useTheme();
  const [actionButtons, setActionButtons] =
    useState<AdditionalButtons[]>(SchAdditionalButtons);

  const updatePress = () => {
    let tempArr = [...actionButtons];
    tempArr[0].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewActivity',
        params: {from: 'agenda'},
      });
    };
    tempArr[1].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'AddMiscSchedule',
        params: {from: 'agenda'},
      });
    };
    tempArr[2].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewTicket',
      });
    };
    setActionButtons(tempArr);
  };

  useEffect(() => {
    updatePress();
  }, []);

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
      <FloatButton AdditionalButtons={actionButtons} />
    </View>
  );
};

export default ScheduledTab;
