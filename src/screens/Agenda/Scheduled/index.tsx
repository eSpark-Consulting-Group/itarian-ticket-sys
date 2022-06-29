import React from 'react';
import {View, Text, FlatList, Dimensions} from 'react-native';

import {useTheme} from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';

import styles from './style';
import {Theme} from '../../../theme/colors';
import {DateSeparator} from '../../../components';
import {moderateScale} from 'react-native-size-matters';
import {Divider} from 'react-native-paper';
import {WINDOW_WIDTH} from '../../../constants/Dimensions';
import ListItem from '../ListItem';

const ScheduledTab = () => {
  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {
            date: 'Monday, November 13',
            data: [
              {
                tNo: 'Ticket #4163',
                task: 'New Server Installation',
                schedule: '10:00AM - 11:30AM',
                dur: '1.5h',
                company: 'Acme IT Solutions',
                locate: 'Remote',
              },
              {
                tNo: 'Ticket #4164',
                task: 'New Server Installation',
                schedule: '10:00AM - 10:30AM',
                dur: '0.5h',
                company: 'Acme IT Solutions',
                locate: 'Remote',
              },
              {
                tNo: 'Ticket #4164',
                task: 'New Server Installation',
                // schedule: '10:00AM - 10:30AM',
                dur: '0.5h',
                company: 'Acme IT Solutions',
                locate: 'Remote',
              },
            ],
          },
          {
            date: 'Monday, November 14',
            data: [
              {
                tNo: 'Ticket #5264',
                task: 'Products for Exchange Server',
                schedule: '10:00AM - 10:30AM',
                dur: '0.5h',
                company: 'Acme IT Solutions',
                locate: 'Remote',
              },
              {
                tNo: 'Ticket #5267',
                task: 'Products for Exchange Server',
                schedule: '10:00AM - 10:30AM',
                dur: '0.5h',
                company: 'Acme IT Solutions',
                locate: 'Remote',
              },
              {
                tNo: 'Ticket #5270',
                task: 'Products for Exchange Server',
                schedule: '10:00AM - 12:30PM',
                dur: '2.5h',
                company: 'Acme IT Solutions',
                locate: 'Remote',
              },
            ],
          },
        ]}
        renderItem={({item, index}) => <ListItem item={item} keys={index} />}
      />
    </View>
  );
};

export default ScheduledTab;
