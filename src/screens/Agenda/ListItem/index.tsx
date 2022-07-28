import React from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';

import {useTheme} from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';

import styles from './style';
import {Theme} from '../../../theme/colors';
import {DateSeparator} from '../../../components';
import {moderateScale} from 'react-native-size-matters';
import {Divider} from 'react-native-paper';

export type dates = {
  date: Date;
};

const ListItem = ({
  item,
  id,
  dateRange,
}: {
  item: any;
  id: number;
  dateRange?: Array<dates>;
}) => {
  const {colors, dark}: Theme = useTheme();

  const renderData = (item2: any, ind: number) => {
    return (
      <Pressable
        style={{paddingHorizontal: 20}}
        key={item2.id}
        android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}>
        <View style={styles.itemContentContainer}>
          <View style={styles.itemContentIconContainer}>
            <View style={styles.itemContentIcon}>
              <II name="pricetag" size={22} color="#fff" />
            </View>
          </View>
          <View style={{width: '75%'}}>
            <Text style={{fontWeight: 'bold', color: colors.text}}>
              {item2.ticket_no}
            </Text>
            <Text style={{fontWeight: 'bold', color: colors.text}}>
              {item2.task}
            </Text>
            <View style={styles.descContentContainer}>
              {item2.expType && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Text style={{color: colors.text}}>{item2.expType}</Text>
                  <Text style={{...styles.schedule_dur, color: '#fff'}}>
                    {item2.totExp}
                  </Text>
                </View>
              )}
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
                  <Text style={{color: colors.text}}>{item2.company_name}</Text>
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
      </Pressable>
    );
  };

  return (
    <View key={id} style={styles.itemContainer}>
      {dateRange ? (
        item.date > dateRange[0].date &&
        item.date < dateRange[1].date && (
          <>
            <DateSeparator text={item.date.toString()} />
            <FlatList
              data={item.data}
              renderItem={({item, index}) => renderData(item, index)}
            />
          </>
        )
      ) : (
        <>
          <DateSeparator text={item.date.toString()} />
          <FlatList
            data={item.data}
            renderItem={({item, index}) => renderData(item, index)}
          />
        </>
      )}
    </View>
  );
};

export default ListItem;
