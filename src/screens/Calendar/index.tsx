import {View, Text} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../theme/colors';
import {WINDOW_WIDTH} from '../../constants/Dimensions';

// @ts-ignore
import EventCalendar from 'react-native-events-calendar';

const Calendar = () => {
  const {colors}: Theme = useTheme();

  const events = [
    {
      start: '2022-07-07 00:30:00',
      end: '2022-07-07 01:30:00',
      title: 'Ticket #15378',
      summary: 'The System is down',
    },
    {
      start: '2022-07-07 01:30:00',
      end: '2022-07-07 02:20:00',
      title: 'Lunch',
    },
    {
      start: '2022-07-07 04:10:00',
      end: '2022-07-07 04:40:00',
      title: 'Ticket #15490',
      summary: 'Printer not working',
    },
    {
      start: '2022-07-07 14:30:00',
      end: '2022-07-07 16:30:00',
      title: 'Ticket #15490',
      summary: 'Reception workstation install',
    },
    {
      start: '2022-07-08 01:20:00',
      end: '2022-07-08 02:20:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2022-07-08 04:10:00',
      end: '2022-07-08 04:40:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2022-07-08 00:45:00',
      end: '2022-07-08 01:45:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2022-07-08 11:30:00',
      end: '2022-07-08 12:30:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2022-07-09 01:30:00',
      end: '2022-07-09 02:00:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2022-07-09 03:10:00',
      end: '2022-07-09 03:40:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: '2022-07-09 00:10:00',
      end: '2022-07-09 01:45:00',
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
  ];

  return (
    <View style={styles.container}>
      {/* <Text style={{color: colors.text}}>Calendar Screen</Text> */}
      <EventCalendar
        eventTapped={(item: any) => console.log('EVENT TAPPED', item)}
        events={events}
        width={WINDOW_WIDTH}
        initDate={'2022-07-07'}
      />
    </View>
  );
};

export default Calendar;
