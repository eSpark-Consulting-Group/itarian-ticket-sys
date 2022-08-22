import React from 'react';
import {View, Text, FlatList, ToastAndroid} from 'react-native';
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
  opportunitiesList,
  SchAdditionalButtons,
} from '../../constants/SampleArrays';
import {Opportunity} from '../../types';
import {EmptyListMsg, FloatButton, RoundedIcon} from '../../components';
import _ from 'lodash';
import {CstmPressable} from '../../components/CstmPressable';

const Oppurtunities = ({navigation, route}: any) => {
  const {colors, dark}: Theme = useTheme();

  const renderList = ({item, index}: {item: Opportunity; index: number}) => {
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
        <CstmPressable
          onPress={() => navigation.navigate('Stack1', {screen: 'Opportunity'})}
          android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}>
          <View style={styles.listInner}>
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
            <RoundedIcon
              enable={!_.isUndefined(item.contant_phone)}
              icon="phone"
              onPress={() => {
                console.log('Press Phone');
              }}
            />
          </View>
        </CstmPressable>
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
