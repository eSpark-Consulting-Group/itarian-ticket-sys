import React, {useState} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {Divider, Menu} from 'react-native-paper';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import MI from 'react-native-vector-icons/MaterialIcons';

import styles from './style';
import {Theme} from '../../theme/colors';
import {EmptyListMsg, OutlineBtn} from '../../components';
import {
  activitiesList,
  Activity as ActivityType,
} from '../../constants/SampleArrays';

const MyActivities = () => {
  const {colors, dark}: Theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [range, setRange] = useState('Last 30 Days');

  const showMenu = (): void => setVisible(!visible);
  const hideMenu = (): void => setVisible(false);

  const renderList = ({item, index}: {item: ActivityType; index: number}) => {
    return (
      <View
        style={{
          backgroundColor: dark ? '#000' : '#fff',
          ...styles.listContainer,
        }}>
        <Pressable
          onPress={() => console.log('Hello')}
          android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}>
          <View
            style={{
              padding: moderateScale(10),
              paddingHorizontal: moderateScale(15),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
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
                    style={{opacity: 0.5, alignSelf: 'center', paddingRight: 5}}
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
                    style={{opacity: 0.5, alignSelf: 'center', paddingRight: 5}}
                  />
                  <Text style={{...styles.subTitle, color: colors.text}}>
                    {item.company_name}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                borderColor: colors.text,
                opacity: item.company_contact ? 1 : 0.5,
                ...styles.iconStyle,
                alignSelf: 'center',
              }}>
              <Pressable
                onPress={() => {
                  item.company_contact ? console.log('calling') : null;
                }}
                android_disableSound
                android_ripple={{
                  color: item.company_contact
                    ? dark
                      ? '#ffffff1f'
                      : '#0000000e'
                    : 'transparent',
                  borderless: true,
                }}>
                <MCI name="phone" size={22} color={colors.text} />
              </Pressable>
            </View>
          </View>
        </Pressable>
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
            contentStyle={{backgroundColor: colors.background}}
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
                    <View
                      style={{
                        padding: 4,
                        backgroundColor: '#fff',
                        borderRadius: 100,
                      }}>
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
            <MenuItem
              itemName="All"
              textColor={colors.text}
              onPress={() => {
                hideMenu();
                setRange('All');
              }}
            />
            <Divider
              style={{backgroundColor: colors.text, transform: [{scaleY: 1.5}]}}
            />
            <MenuItem
              itemName="Last 30 Days"
              textColor={colors.text}
              onPress={() => {
                hideMenu();
                setRange('Last 30 Days');
              }}
            />
            <MenuItem
              itemName="Today"
              textColor={colors.text}
              onPress={() => {
                hideMenu();
                setRange('Today');
              }}
            />
            <MenuItem
              itemName="Tomorrow"
              textColor={colors.text}
              onPress={() => {
                hideMenu();
                setRange('Tomorrow');
              }}
            />
            <MenuItem
              itemName="This Week"
              textColor={colors.text}
              onPress={() => {
                hideMenu();
                setRange('This Week');
              }}
            />
            <MenuItem
              itemName="Next 30 Days"
              textColor={colors.text}
              onPress={() => {
                hideMenu();
                setRange('Next 30 Days');
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

const MenuItem = ({
  itemName,
  onPress,
  leftIcon,
  rightIcon,
  textColor = '#000',
  checkVisible,
}: {
  itemName: string;
  onPress: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textColor?: string;
  checkVisible?: boolean;
}) => {
  return (
    <Pressable onPress={onPress} android_ripple={{color: '#635a5a5c'}}>
      <View style={styles.menuItemButtonStyle}>
        <View style={{flexDirection: 'row'}}>
          {leftIcon}
          <Text style={{color: textColor, marginHorizontal: 5}}>
            {itemName}
          </Text>
        </View>
        <View
          style={{
            width: moderateScale(30),
            flexDirection: 'row-reverse',
          }}>
          {checkVisible && rightIcon}
        </View>
      </View>
    </Pressable>
  );
};

export default MyActivities;
