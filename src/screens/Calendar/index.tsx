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
import {events} from '../../constants/SampleArrays';

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
