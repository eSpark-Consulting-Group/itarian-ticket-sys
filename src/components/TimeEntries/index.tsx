import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';

import styles from './styles';
import {EmptyListMsg, FloatButton} from '../../components';
import {timeSheetList} from '../../constants/SampleArrays';
import {TimeSheetAdditionalButtons} from '../../constants/ButtonsList';
import {AdditionalButtons, TimeSheet} from '../../types';
import ListItem from '../../screens/Agenda/ListItem';

const TimeEntries = ({navigation}: any) => {
  const {colors}: Theme = useTheme();
  const [isDate, setIsDate] = useState(false);
  const [totHrs, setTotHrs] = useState(0);
  const [actionButtons, setActionButtons] = useState<AdditionalButtons[]>(
    TimeSheetAdditionalButtons,
  );

  const updatePress = () => {
    let tempArr = [...actionButtons];
    tempArr[0].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewTimeSheet',
      });
    };
    setActionButtons(tempArr);
  };

  useEffect(() => {
    updatePress();
  }, []);


  const clearTotal = () => {
    setTotHrs(0);
    setIsDate(false);
  };

  return (
    <View style={styles.container}>
       {timeSheetList.length > 0 ? (
          <FlatList
            data={timeSheetList}
            renderItem={({item}) => (
              <ListItem
                onPress={ticket => {
                  navigation.navigate('Stack3', {
                    screen: 'NewTimeSheet',
                    params: {
                      title: 'Edit Time Sheet',
                      data: {
                        ticket: ticket,
                        date: item.date.toDateString(),
                        totHrs: item.totHrs,
                        from: 'TimeSheet',
                      },
                    },
                  });
                }}
                dataSource={item}
                renderDate={true}
              />
            )}
          />
        ) : (
          <NotFound />
        )}
      <FloatButton AdditionalButtons={actionButtons} />
    </View>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg label="Data" />
    </View>
  );
};

export default TimeEntries;
