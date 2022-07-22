import {View, Text, FlatList, TouchableOpacity, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import FA from 'react-native-vector-icons/FontAwesome';
import II from 'react-native-vector-icons/Ionicons';

import styles from './style';
import {Theme} from '../../theme/colors';
import {FloatButton} from '../../components';
import {
  expReportList,
  SchAdditionalButtons,
  scheduledList,
} from '../../constants/SampleArrays';
import ListItem from '../Agenda/ListItem';
import DatePicker from '@react-native-community/datetimepicker';

const ExpenseReportsScreen = () => {
  const {colors, dark}: Theme = useTheme();
  const [showDate, setShowDate] = useState(false);

  const openDatePicker = () => {
    setShowDate(true);
  };

  const closeDatePicker = (event: any, date: any) => {
    setShowDate(false);
  };

  return (
    <View style={styles.container}>
      {showDate && (
        <DatePicker
          mode="date"
          value={new Date()}
          minimumDate={new Date(2022, 7, 5)}
          maximumDate={new Date(2022, 7, 25)}
          onChange={closeDatePicker}
        />
      )}
      <Pressable
        onPress={openDatePicker}
        android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}
        style={{
          height: '10%',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f5f5f5',
          elevation: 2,
          paddingHorizontal: 20,
        }}>
        <View>
          <Text>Jul 28 - Aug 3</Text>
          <Text style={{color: '#28648f', fontWeight: 'bold'}}>144.00</Text>
        </View>
        <FA name="chevron-down" size={15} />
      </Pressable>
      <FlatList
        data={expReportList}
        renderItem={({item}) => <ListItem id={item.id} item={item} />}
      />
      <FloatButton AdditionalButtons={SchAdditionalButtons} />
      {/* <Text style={{color: colors.text}}>Expense Reports Screen</Text> */}
    </View>
  );
};

export default ExpenseReportsScreen;
