import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';

import {Theme, useTheme} from '@react-navigation/native';

import styles from './style';
import ListItem from '../ListItem';
import {
  UnschAdditionalButtons,
  unscheduledList,
} from '../../../constants/SampleArrays';
import {FloatButton} from '../../../components';
import {AdditionalButtons} from '../../../types';

const UnscheduledTab = ({navigation}: any) => {
  const {colors}: Theme = useTheme();
  const [actionButtons, setActionButtons] = useState<AdditionalButtons[]>(
    UnschAdditionalButtons,
  );

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
    setActionButtons(tempArr);
  };

  useEffect(() => {
    updatePress();
  }, []);

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
      <FloatButton AdditionalButtons={actionButtons} />
    </View>
  );
};

export default UnscheduledTab;
