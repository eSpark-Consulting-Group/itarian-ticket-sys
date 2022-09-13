import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Theme, useTheme} from '@react-navigation/native';
import DatePicker from '@react-native-community/datetimepicker';
import {State, useHookstate} from '@hookstate/core';

// @ts-ignore
import EventCalendar from '../../components/react-native-events-calendar/src/EventCalendar';

import styles from './style';
import {WINDOW_WIDTH} from '../../constants';
import {SchAdditionalButtons} from '../../constants/ButtonsList';
import {FloatButton} from '../../components';
import {AdditionalButtons} from '../../types';
import {globalState} from '../../stores/globalAppState';

const Calendar = ({navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const activeMember: State<string> = useHookstate(globalState.calendarMember);
  const [showDate, setShowDate] = useState(false);
  const [currDate, setCurrDate] = useState(new Date());
  const [toggle, setToggle] = useState<any>(false);
  const [filArr, setFilArr] = useState<any>([]);
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

  const onChangeDate = (event: any, date: any) => {
    setShowDate(false);

    if (event?.type == 'set') {
      setCurrDate(date);
    }
  };

  useEffect(() => {
    if (activeMember.get() == 'John Doe') {
      setFilArr(events);
    } else {
      setFilArr([]);
    }
  }, [activeMember]);

  useEffect(() => {
    updatePress();
  }, []);

  useEffect(() => {
    setToggle(!toggle);
  }, [dark]);

  const events = [
    {
      start: '2022-09-07 10:00:00',
      end: '2022-09-07 12:00:00',
      title: 'Ticket #15378',
      summary: 'The System is down',
      eventType: 'Service Ticket',
    },
    {
      start: '2022-09-07 12:30:00',
      end: '2022-09-07 13:30:00',
      title: 'Lunch',
      eventType: 'Activity',
    },
    {
      start: '2022-09-07 16:10:00',
      end: '2022-09-07 16:40:00',
      title: 'Ticket #15490',
      summary: 'Printer not working',
      eventType: 'Service Ticket',
    },
    {
      start: '2022-09-07 14:30:00',
      end: '2022-09-07 16:00:00',
      title: 'Ticket #15490',
      summary: 'Reception workstation install',
      eventType: 'Service Ticket',
    },

    {
      start: '2022-09-06 16:10:00',
      end: '2022-09-06 16:40:00',
      title: 'Ticket #14645',
      summary: '3412 Piedmont Rd NE, GA 3032',
      eventType: 'Service Ticket',
    },
    {
      start: '2022-09-06 12:45:00',
      end: '2022-09-06 13:45:00',
      title: 'Ticket #12420',
      summary: '3412 Piedmont Rd NE, GA 3032',
      eventType: 'Service Ticket',
    },
    {
      start: '2022-09-06 11:30:00',
      end: '2022-09-06 12:30:00',
      title: 'Ticket #16456',
      summary: '3412 Piedmont Rd NE, GA 3032',
      eventType: 'Service Ticket',
    },

    {
      start: '2022-07-09 15:10:00',
      end: '2022-07-09 15:40:00',
      title: 'Ticket #13675',
      summary: '3412 Piedmont Rd NE, GA 3032',
      eventType: 'Service Ticket',
    },
    {
      start: '2022-07-09 13:10:00',
      end: '2022-07-09 14:45:00',
      title: 'Ticket #15673',
      summary: '3412 Piedmont Rd NE, GA 3032',
      eventType: 'Service Ticket',
    },
  ];

  return (
    <View style={styles.container}>
      <EventCalendar
        eventTapped={(item: any) => console.log('EVENT TAPPED', item)}
        events={filArr}
        width={WINDOW_WIDTH}
        initDate={currDate}
        scrollToCurrentTime={true}
        selectDate={() => setShowDate(true)}
        styles={{
          eventTitle: {color: colors.text},
          eventSummary: {color: colors.text + 'e7'},
          eventTimes: {color: colors.text},
          contentStyle: {backgroundColor: dark ? '#000' : '#fff'},
          header: {
            backgroundColor: dark ? colors.background : '#F5F5F6',
            borderColor: dark ? '#000' : 'transparent',
          },
          headerText: {color: dark ? '#fff' : '#000'},
        }}
      />
      <FloatButton AdditionalButtons={actionButtons} />
      {showDate && (
        <DatePicker
          mode={'date'}
          value={currDate}
          onChange={onChangeDate}
          positiveButtonLabel={'Set Date'}
        />
      )}
    </View>
  );
};

export default Calendar;
