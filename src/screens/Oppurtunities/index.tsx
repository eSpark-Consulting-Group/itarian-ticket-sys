import React from 'react';
import {View, Text, Pressable, FlatList, ToastAndroid} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {Divider} from 'react-native-paper';

import FA from 'react-native-vector-icons/FontAwesome';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Fthr from 'react-native-vector-icons/Feather';
import MI from 'react-native-vector-icons/MaterialIcons';
import FD from 'react-native-vector-icons/Foundation';

import styles from './style';
import {Theme} from '../../theme/colors';
import {
  Opportunities as OpportunityType,
  opportunitiesList,
  SchAdditionalButtons,
} from '../../constants/SampleArrays';
import {EmptyListMsg, FloatButton} from '../../components';

const Oppurtunities = () => {
  const {colors, dark}: Theme = useTheme();

  const renderList = ({
    item,
    index,
  }: {
    item: OpportunityType;
    index: number;
  }) => {
    const renderColor = () => {
      switch (item.priority) {
        case 'low':
          return 'teal';
        case 'normal':
          return 'gold';
        case 'high':
          return 'darkorange';
        case 'critical':
          return 'red';
      }
    };

    return (
      <View style={styles.listContainer}>
        <Pressable
          onPress={() => console.log('Hello')}
          android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}>
          <View
            style={{
              padding: moderateScale(15),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <View style={{flexDirection: 'row'}}>
              <FA name="exclamation-circle" color={renderColor()} size={44} />
              <View style={{paddingHorizontal: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{...styles.title, color: colors.text}}>
                    {item.name}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{...styles.title, color: colors.text}}>
                    {item.contact}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{...styles.subTitle, color: colors.text}}>
                    Priority ({item.priority})
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Fthr
                    name="user"
                    color={colors.text}
                    size={12}
                    style={{opacity: 0.5, alignSelf: 'center', paddingRight: 5}}
                  />
                  <Text style={{...styles.subTitle, color: colors.text}}>
                    {item.sales_Rep}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <MCI
                    name="office-building-marker-outline"
                    color={colors.text}
                    size={12}
                    style={{opacity: 0.5, alignSelf: 'center', paddingRight: 5}}
                  />
                  <Text style={{...styles.subTitle, color: colors.text}}>
                    {item.company}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <FD
                    name="wrench"
                    color={colors.text}
                    size={12}
                    style={{opacity: 0.5, alignSelf: 'center', paddingRight: 7}}
                  />
                  <Text style={{...styles.subTitle, color: colors.text}}>
                    {item.status}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <MI
                    name="date-range"
                    color={colors.text}
                    size={12}
                    style={{opacity: 0.5, alignSelf: 'center', paddingRight: 5}}
                  />
                  <Text style={{...styles.subTitle, color: colors.text}}>
                    {item.close_date}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                borderColor: colors.text,
                opacity: item.contant_phone ? 1 : 0.5,
                ...styles.iconStyle,
              }}>
              <Pressable
                onPress={() => {
                  item.contant_phone ? console.log('calling') : null;
                }}
                android_disableSound
                android_ripple={{
                  color: item.contant_phone
                    ? dark
                      ? '#ffffff1f'
                      : '#0000000e'
                    : 'transparent',
                  borderless: true,
                }}>
                <MCI
                  name="phone"
                  size={22}
                  color={colors.text}
                  style={styles.icon}
                />
              </Pressable>
            </View>
          </View>
        </Pressable>
        {index !== opportunitiesList.length - 1 && (
          <Divider
            style={{backgroundColor: colors.text, ...styles.dividerStyle}}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {opportunitiesList.length !== 0 ? (
        <FlatList data={opportunitiesList} renderItem={renderList} />
      ) : (
        <NotFound />
      )}
      <FloatButton AdditionalButtons={SchAdditionalButtons} />
    </View>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg label="Opportunities" />
    </View>
  );
};

export default Oppurtunities;
