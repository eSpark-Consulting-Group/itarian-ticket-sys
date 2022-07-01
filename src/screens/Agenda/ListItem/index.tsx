import React from 'react';
import {View, Text, ViewProps} from 'react-native';

import {useTheme} from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';

import styles from './style';
import {Theme} from '../../../theme/colors';
import {DateSeparator} from '../../../components';
import {moderateScale} from 'react-native-size-matters';
import {Divider} from 'react-native-paper';

const ListItem = ({item, id}: {item: any; id: number}) => {
  const {colors}: Theme = useTheme();
  console.log('KEY KIYA AYA', id);

  return (
    <View key={id} style={styles.itemContainer}>
      <DateSeparator text={item.date} />
      {item.data.map((item2: any, ind: number) => (
        <View key={item2.id}>
          <View style={styles.itemContentContainer}>
            <View style={styles.itemContentIconContainer}>
              <View style={styles.itemContentIcon}>
                <II name="pricetag" size={moderateScale(25, 0)} color="#fff" />
              </View>
            </View>
            <View>
              <Text style={{fontWeight: 'bold', color: colors.text}}>
                {item2.ticket_no}
              </Text>
              <Text style={{fontWeight: 'bold', color: colors.text}}>
                {item2.task}
              </Text>
              <View style={styles.descContentContainer}>
                {item2.schedule_time && (
                  <View style={styles.rowContainer}>
                    <II
                      name="calendar-outline"
                      color={colors.text}
                      style={styles.margin_5}
                    />
                    <Text style={{...styles.margin_5, color: colors.text}}>
                      {item2.schedule_time}
                    </Text>
                    <Text style={{...styles.schedule_dur, color: '#fff'}}>
                      {item2.time_dur}
                    </Text>
                  </View>
                )}
                {item2.company_name && (
                  <View style={styles.rowContainer}>
                    <II
                      name="business"
                      color={colors.text}
                      style={styles.margin_5}
                    />
                    <Text style={{color: colors.text}}>
                      {item2.company_name}
                    </Text>
                  </View>
                )}
                {item2.location && (
                  <View style={styles.rowContainer}>
                    <II
                      name="location-outline"
                      color={colors.text}
                      style={styles.margin_5}
                    />
                    <Text style={{color: colors.text}}>{item2.location}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          {item.data.length === ind + 1 ? null : (
            <Divider style={styles.divider} />
          )}
        </View>
      ))}
    </View>
  );
};

export default ListItem;
