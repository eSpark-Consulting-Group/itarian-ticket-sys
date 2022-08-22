import React, {useState} from 'react';
import {View, Text, FlatList,} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {Divider, Menu} from 'react-native-paper';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import MI from 'react-native-vector-icons/MaterialIcons';

import styles from './style';
import {Theme} from '../../theme/colors';
import {
  EmptyListMsg,
  FloatButton,
  OutlineBtn,
  RoundedIcon,
} from '../../components';
import {
  activitiesList,
  SchAdditionalButtons,
} from '../../constants/SampleArrays';
import {Activity} from '../../types';
import _ from 'lodash';
import { CstmPressable } from '../../components/CstmPressable/indes';

const MyActivities = ({navigation} : any) => {
  const {colors, dark}: Theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [range, setRange] = useState('Last 30 Days');

  const solidColor = dark ? '#000000' : '#ffffff';

  const showMenu = (): void => setVisible(!visible);
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
              params: {data: item}
            });
          }}
          >
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
              onPress={() => console.log('Phone Pressed')}
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
          <Menu
            visible={visible}
            onDismiss={hideMenu}
            style={{width: moderateScale(170)}}
            contentStyle={{backgroundColor: solidColor}}
            anchor={
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
                    <View style={{padding: 4}}>
                      <MCI name="chevron-down" size={14} color="#fff" />
                    </View>
                  </View>
                }
                onPress={showMenu}
              />
            }>
            <FlatList
              data={menuItems}
              renderItem={({item, index}) => {
                return (
                  <>
                    <MenuItem
                      itemName={item}
                      textColor={colors.text}
                      dark={dark}
                      onPress={() => {
                        hideMenu();
                        setRange(item);
                      }}
                    />
                    {index == 0 && (
                      <Divider
                        style={{backgroundColor: colors.text, opacity: 0.2}}
                      />
                    )}
                  </>
                );
              }}
            />
          </Menu>
        </View>
      </View>
      <View style={styles.container}>
        {activitiesList.length !== 0 ? (
          <FlatList data={activitiesList} renderItem={renderList} />
        ) : (
          <NotFound />
        )}
      </View>
      <FloatButton AdditionalButtons={SchAdditionalButtons} />
    </>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg label="Contacts" />
    </View>
  );
};

//*---------- Helper Components

const menuItems = [
  'All',
  'Last 30 Days',
  'Today',
  'Tomorrow',
  'This Week',
  'Next 30 Days',
];

const MenuItem = ({
  itemName,
  onPress,
  leftIcon,
  rightIcon,
  textColor = '#000',
  checkVisible,
  dark,
}: {
  itemName: string;
  onPress: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textColor?: string;
  checkVisible?: boolean;
  dark?: boolean;
}) => {
  return (
    <CstmPressable
      onPress={onPress}
      android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}>
      <View style={styles.menuItemButtonStyle}>
        <View style={{flexDirection: 'row'}}>
          {leftIcon}
          <Text style={{color: textColor, marginHorizontal: 5}}>
            {itemName}
          </Text>
        </View>
        <View style={styles.menuIconContainer}>
          {checkVisible && rightIcon}
        </View>
      </View>
    </CstmPressable>
  );
};

export default MyActivities;
