import React, {useState} from 'react';
import {View, Text, FlatList, Linking} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import {Divider, Menu} from 'react-native-paper';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import MI from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import moment from 'moment';

import styles from './style';
import {
  EmptyListMsg,
  FloatButton,
  OutlineBtn,
  RoundedIcon,
} from '../../components';
import {activitiesList} from '../../constants/SampleArrays';
import {Activity} from '../../types';
import {CstmPressable} from '../../components/CstmPressable';
import {CstmMenu} from '../../components/CstmMenu';

const MyActivities = ({navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [range, setRange] = useState('All');
  const [dataSource, setdataSource] = useState<Activity[]>(activitiesList);

  const solidColor = dark ? '#000000' : '#ffffff';

  const showMenu = (): void => setVisible(true);
  const hideMenu = (): void => setVisible(false);

  const renderList = ({item, index}: {item: Activity; index: number}) => {
    return (
      <View
        style={{
          backgroundColor: dark ? '#000' : '#fff',
          ...styles.listContainer,
        }}>
        <CstmPressable
          onPress={() => {
            navigation.navigate('Stack1', {
              screen: 'Activities',
              params: {data: item},
            });
          }}>
          <View style={styles.listInnerContainer}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{...styles.title, color: colors.text}}>
                    {item.name}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <MI
                    name="date-range"
                    color={colors.text}
                    size={12}
                    style={styles.dimIconStyles}
                  />
                  <Text style={{...styles.subTitle, color: colors.text}}>
                    {item.date} | {item.start_time} - {item.end_time}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <MCI
                    name="office-building-marker-outline"
                    color={colors.text}
                    size={12}
                    style={styles.dimIconStyles}
                  />
                  <Text style={{...styles.subTitle, color: colors.text}}>
                    {item.company_name}
                  </Text>
                </View>
              </View>
            </View>
            <RoundedIcon
              enable={!_.isUndefined(item.company_contact)}
              icon="phone"
              onPress={() => Linking.openURL(`tel:090078601`)}
            />
          </View>
        </CstmPressable>
        {index !== activitiesList.length - 1 && (
          <Divider
            style={{backgroundColor: colors.text, ...styles.dividerStyle}}
          />
        )}
      </View>
    );
  };

  const filterData = (value: any) => {
    var arr = [];
    const today = moment(new Date()).format('MMM DD, YYYY');
    switch (value) {
      case 'All':
        setdataSource(activitiesList);
        break;
      case 'Today':
        for (let index = 0; index < activitiesList.length; index++) {
          const element = activitiesList[index];
          if (moment(element.date).format('MMM DD, YYYY') == today) {
            arr.push(element);
          }
        }
        setdataSource(arr);
        break;
      case 'Last 30 Days':
        const lastThirtyDate = moment(today).subtract(30, 'days');
        for (let index = 0; index < activitiesList.length; index++) {
          const element = activitiesList[index];
          if (
            moment(element.date).isBetween(
              lastThirtyDate,
              moment(today).add(1, 'day'),
            )
          ) {
            arr.push(element);
          }
        }
        setdataSource(arr);
        break;
      case 'Tomorrow':
        for (let index = 0; index < activitiesList.length; index++) {
          const element = activitiesList[index];
          if (
            moment(element.date).format('MMM DD, YYYY') ==
            moment(today).subtract(1, 'day').format('MMM DD, YYYY')
          ) {
            arr.push(element);
          }
        }
        setdataSource(arr);
        break;
      case 'This Week':
        const lastWeekDate = moment(today).subtract(7, 'days');
        for (let index = 0; index < activitiesList.length; index++) {
          const element = activitiesList[index];
          if (
            moment(element.date).isBetween(
              lastWeekDate,
              moment(today).add(1, 'day'),
            )
          ) {
            arr.push(element);
          }
        }
        setdataSource(arr);
        break;
      default:
        break;
    }
    setRange(value);
  };

  return (
    <>
      <View
        style={{
          backgroundColor: dark ? '#000000' : '#ffffff',
          ...styles.header,
        }}>
        <View style={{flexDirection: 'row'}}>
          <OutlineBtn
            text="Closed Activities"
            backColor="#fff"
            textColor={'#000'}
            pressRipple
            border
            onPress={() => {
              console.log('Hello');
            }}
          />
          <View style={styles.adjuster} />
          <CstmMenu
            menuItems={menuItems}
            visible={visible}
            hideMenu={hideMenu}
            onChange={filterData}
            children={
              <OutlineBtn
                text={range}
                backColor={colors.primary}
                textColor={'#fff'}
                border
                leftIcon={
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View style={styles.dropDown}>
                      <MCI name="calendar" size={14} color={colors.primary} />
                    </View>
                    <View style={styles.adjuster} />
                  </View>
                }
                rightIcon={
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.adjuster} />
                    <View style={{padding: 4, alignSelf: 'center'}}>
                      <MCI name="chevron-down" size={14} color="#fff" />
                    </View>
                  </View>
                }
                onPress={showMenu}
              />
            }
          />
        </View>
      </View>
      <View style={styles.container}>
        {dataSource.length !== 0 ? (
          <FlatList data={dataSource} renderItem={renderList} />
        ) : (
          <NotFound />
        )}
      </View>
      <FloatButton
        onPress={() => {
          navigation.navigate('Stack1', {
            screen: 'NewActivity',
          });
        }}
      />
    </>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg label="Activities" />
    </View>
  );
};

//*---------- Helper Components

const menuItems = [
  {text: 'All'},
  {text: 'Last 30 Days'},
  {text: 'Today'},
  {text: 'Tomorrow'},
  {text: 'This Week'},
];

export default MyActivities;
