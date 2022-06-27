import React from 'react';
import {View, Text, FlatList, Dimensions} from 'react-native';

import {useTheme} from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';

import styles from './style';
import {Theme} from '../../../theme/colors';
import {DateSeparator} from '../../../components';
import {moderateScale} from 'react-native-size-matters';

const {width} = Dimensions.get('window');

const ScheduledTab = () => {
  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {tNo: 'Ticket #4163', date: 'Monday, November 13'},
          {tNo: 'Ticket #4163', date: 'Monday, November 14'},
        ]}
        renderItem={({item}) => (
          <View
            style={{
              width: width,
              marginVertical: 10,
              marginHorizontal: 20,
            }}>
            <DateSeparator text={item.date} />
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 100,
                  width: '10%',
                  marginRight: 10,
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 1000,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: moderateScale(40, 0),
                    height: moderateScale(40, 0),
                    backgroundColor: '#0000aa',
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
                  {item.tNo}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ScheduledTab;
