import React from 'react';
import {View, Text, FlatList, Dimensions} from 'react-native';

import {useTheme} from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';

import styles from './style';
import {Theme} from '../../../theme/colors';
import {DateSeparator} from '../../../components';
import {moderateScale} from 'react-native-size-matters';
import {Divider} from 'react-native-paper';

const {width} = Dimensions.get('window');

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
                schedule: '10:00AM - 10:30AM',
                dur: '0.5h',
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
            ],
          },
        ]}
        renderItem={({item}) => (
          <View
            style={{
              width: width,
              marginVertical: 10,
              marginHorizontal: 20,
            }}>
            <DateSeparator text={item.date} />
            {item.data.map((item2, ind) => (
              <>
                <View style={{flexDirection: 'row', marginVertical: 15}}>
                  <View
                    style={{
                      height: 100,
                      width: '10%',
                      marginRight: 10,
                    }}>
                    <View
                      style={{
                        borderRadius: 1000,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: moderateScale(40, 0),
                        height: moderateScale(40, 0),
                        backgroundColor: '#28648f',
                      }}>
                      <II
                        name="pricetag"
                        size={moderateScale(25, 0)}
                        color="#fff"
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      height: 100,
                    }}>
                    <Text style={{fontWeight: 'bold', color: colors.text}}>
                      {item2.tNo}
                    </Text>
                    <Text style={{fontWeight: 'bold', color: colors.text}}>
                      {item2.task}
                    </Text>
                    <View style={{marginTop: 5}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <II name="calendar-outline" style={{marginRight: 5}} />
                        <Text style={{marginRight: 5}}>{item2.schedule}</Text>
                        <Text
                          style={{
                            backgroundColor: 'black',
                            color: 'white',
                            borderRadius: 1000,
                            paddingHorizontal: 5,
                          }}>
                          {item2.dur}
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <II name="business" style={{marginRight: 5}} />
                        <Text>{item2.company}</Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <II name="location-outline" style={{marginRight: 5}} />
                        <Text>{item2.locate}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                {item.data.length === ind + 1 ? null : (
                  <Divider style={{width: width, transform: [{scaleY: 4}]}} />
                )}
              </>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default ScheduledTab;
