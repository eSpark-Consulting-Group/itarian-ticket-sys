import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import {Theme, useTheme} from '@react-navigation/native';
import {WINDOW_WIDTH} from '../../constants';

// @ts-ignore
import EventCalendar from '../../components/react-native-events-calendar/src/EventCalendar';

import {SchAdditionalButtons} from '../../constants/SampleArrays';
import {FloatButton} from '../../components';
import {AdditionalButtons} from '../../types';

const Calendar = ({navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const [toggle, setToggle] = useState<any>(false);
  const [actionButtons, setActionButtons] =
    useState<AdditionalButtons[]>(SchAdditionalButtons);

  const updatePress = () => {
    let tempArr = [...actionButtons];
    tempArr[0].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewActivity',
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

  useEffect(() => {
    console.log('useEffect');
    setToggle(!toggle);
  }, [dark]);

  const events = [
    {
      start: '2022-08-26 10:00:00',
      end: '2022-08-26 12:00:00',
      title: 'Ticket #15378',
      summary: 'The System is down',
    },
    {
      start: '2022-07-07 12:30:00',
      end: '2022-07-07 13:30:00',
      title: 'Lunch',
    },
    {
      start: '2022-07-07 16:10:00',
      end: '2022-07-07 16:40:00',
      title: 'Ticket #15490',
      summary: 'Printer not working',
    },
    {
      start: '2022-07-07 14:30:00',
      end: '2022-07-07 16:00:00',
      title: 'Ticket #15490',
      summary: 'Reception workstation install',
    },

    {
      start: '2022-07-08 16:10:00',
      end: '2022-07-08 16:40:00',
      title: 'Ticket #14645',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2022-07-08 12:45:00',
      end: '2022-07-08 13:45:00',
      title: 'Ticket #12420',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2022-07-08 11:30:00',
      end: '2022-07-08 12:30:00',
      title: 'Ticket #16456',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },

    {
      start: '2022-07-09 15:10:00',
      end: '2022-07-09 15:40:00',
      title: 'Ticket #13675',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2022-07-09 13:10:00',
      end: '2022-07-09 14:45:00',
      title: 'Ticket #15673',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
  ];

  return (
    <View style={styles.container}>
      <EventCalendar
        eventTapped={(item: any) => console.log('EVENT TAPPED', item)}
        events={events}
        width={WINDOW_WIDTH}
        initDate={new Date()}
        styles={{
          contentStyle: {backgroundColor: dark ? '#000' : '#fff'},
          header: {
            backgroundColor: dark ? colors.background : '#F5F5F6',
            borderColor: dark ? '#000' : 'transparent',
          },
          headerText: {color: dark ? '#fff' : '#000'},
        }}
      />
      <FloatButton AdditionalButtons={actionButtons} />
    </View>
  );
};

export default Calendar;
