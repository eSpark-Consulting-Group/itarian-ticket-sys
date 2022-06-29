import React from 'react';
import {View, Text} from 'react-native';

import {useTheme} from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';

import styles from './style';
import {Theme} from '../../../theme/colors';
import {DateSeparator} from '../../../components';
import {moderateScale} from 'react-native-size-matters';
import {Divider} from 'react-native-paper';

const ListItem = ({item, keys}: any) => {
  const {colors}: Theme = useTheme();
  return (
    <View key={keys} style={styles.itemContainer}>
      <DateSeparator text={item.date} />
      {item.data.map((item2: any, ind: number) => (
        <>
          <View style={styles.itemContentContainer}>
            <View style={styles.itemContentIconContainer}>
              <View style={styles.itemContentIcon}>
                <II name="pricetag" size={moderateScale(25, 0)} color="#fff" />
              </View>
            </View>
            <View>
              <Text style={{fontWeight: 'bold', color: colors.text}}>
                {item2.tNo}
              </Text>
              <Text style={{fontWeight: 'bold', color: colors.text}}>
                {item2.task}
              </Text>
              <View style={styles.descContentContainer}>
                {item2.schedule && (
                  <View style={styles.rowContainer}>
                    <II name="calendar-outline" style={styles.margin_5} />
                    <Text style={styles.margin_5}>{item2.schedule}</Text>
                    <Text style={styles.schedule_dur}>{item2.dur}</Text>
                  </View>
                )}
                {item2.company && (
                  <View style={styles.rowContainer}>
                    <II name="business" style={styles.margin_5} />
                    <Text>{item2.company}</Text>
                  </View>
                )}
                {item2.locate && (
                  <View style={styles.rowContainer}>
                    <II name="location-outline" style={styles.margin_5} />
                    <Text>{item2.locate}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          {item.data.length === ind + 1 ? null : (
            <Divider style={styles.divider} />
          )}
        </>
      ))}
    </View>
  );
};

export default ListItem;
