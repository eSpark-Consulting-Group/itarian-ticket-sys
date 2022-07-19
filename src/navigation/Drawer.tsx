import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerHeaderProps,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {useTheme, DrawerActions} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import AD from 'react-native-vector-icons/AntDesign';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import {State, useState as hookState} from '@hookstate/core';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {Avatar, Badge} from 'react-native-paper';

import {Theme} from '../theme/colors';
import {globalState} from '../utils/globalState';
import {
  Agenda,
  Calendar,
  Companies,
  Configurations,
  Contacts,
  ExpenseReports,
  InOutBoard,
  MyActivities,
  Oppurtunities,
  ProjectBoard,
  Search,
  ServiceBoard,
  ServiceTickets,
  StopWatch,
  TimeSheets,
  Settings,
  SendFeedback,
  Profile,
} from '../screens';
import {ModalField, ModalForm} from '../components';
import {GoneToFormArray, StatusFormArray} from '../constants/SampleArrays';
import Stacks from './Stacks';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const {width, height} = Dimensions.get('window');

const DrawerContent = (props: DrawerContentComponentProps) => {
  const currStatus: State<boolean> = hookState(globalState.currentStatus);
  const switchValue: State<boolean> = hookState(globalState.statusSwitch);

  const {colors, dark}: Theme = useTheme();
  const Modals = [{name: 'My Status'}, {name: 'Gone To'}];

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => props.navigation.navigate('My Profile')}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Avatar.Image
              size={moderateScale(65, 0.5)}
              source={require('../assets/images/avatar.png')}
            />
          </View>
        </View>
        <View style={{flex: 0.7}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.drawerTitleStyle}>Johnny Bravo</Text>
            <Text style={styles.drawerTitleStyle}>iTarian LLC</Text>
            <Text style={styles.drawerTitleStyle}>
              {currStatus.get() ? 'In Office' : 'Out of the Office'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.content}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <DrawerItemList {...props} />
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <DrawerItem
          label={'Settings'}
          inactiveTintColor={'#fff'}
          icon={({color, size, focused}) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          )}
          labelStyle={styles.footerDrawerStyle}
          onPress={() => {
            props.navigation.navigate('Settings');
          }}
        />
        <DrawerItem
          label={'Send Feedback'}
          inactiveTintColor={'#fff'}
          labelStyle={styles.footerDrawerStyle}
          icon={({color, size, focused}) => (
            <MCI name="message-text" size={size} color={color} />
          )}
          onPress={() => {
            props.navigation.navigate('Feedback');
          }}
        />
        <DrawerItem
          label={'Logout'}
          inactiveTintColor={'#fff'}
          labelStyle={styles.footerDrawerStyle}
          icon={({color, size, focused}) => (
            <MCI name="logout" size={size} color={color} />
          )}
          onPress={() => {
            console.log('Logout');
            props.navigation.navigate('Login');
          }}
        />
        <Text style={{fontSize: 12, fontFamily: 'sans-serif-medium'}}>
          Build version (0.02.6)
        </Text>
      </View>
    </SafeAreaView>
  );
};

const FormScreen = ({navigation}: NativeStackHeaderProps) => {
  const {colors}: Theme = useTheme();

  const switchValue: State<boolean> = hookState(globalState.statusSwitch);
  const currStatus: State<boolean> = hookState(globalState.currentStatus);
  const oldGoneToValue: State<string> = hookState(globalState.prevGoneTo);
  const goneToValue: State<string> = hookState(globalState.currentGoneTo);
  const oldInputVal: State<string> = hookState(globalState.oldAddInputVal);
  const inputVal: State<string> = hookState(globalState.additionalInputVal);

  const saveStatus = () => {
    console.log('Save Value', oldInputVal.get(), inputVal.get());
    if (switchValue.get() == true) {
      currStatus.set(false);
      oldInputVal.set(inputVal.get());
      navigation.navigate('My Profile');
    } else {
      currStatus.set(true);
      navigation.navigate('My Profile');
    }
  };

  const backStatus = () => {
    console.log('Back Value', oldInputVal.get(), inputVal.get());
    if (currStatus.get() == false && switchValue.get() == false) {
      inputVal.set(oldInputVal.get());
      switchValue.set(true);
      navigation.navigate('My Profile');
    } else if (currStatus.get() == true && switchValue.get() == true) {
      inputVal.set(oldInputVal.get());
      switchValue.set(false);
      navigation.navigate('My Profile');
    } else {
      inputVal.set(oldInputVal.get());
      navigation.navigate('My Profile');
    }
  };

  const saveGoneTo = () => {
    console.log('Save Status', goneToValue.get(), oldGoneToValue.get());
    oldGoneToValue.set(goneToValue.get());
    navigation.navigate('My Status');
  };

  const backGoneTo = () => {
    console.log('Back Status', goneToValue.get(), oldGoneToValue.get());
    goneToValue.set(oldGoneToValue.get());
    navigation.navigate('My Status');
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
        },
        animation: 'slide_from_bottom',
        presentation: 'modal',
      }}>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
        }}>
        <Stack.Screen
          name={'My Status'}
          options={{
            animation: 'slide_from_bottom',
            headerLeft: () => (
              <Ionicons
                size={30}
                name="close"
                style={{right: 6}}
                color={'#fff'}
                onPress={backStatus}
              />
            ),
            headerRight: () => (
              <FA
                size={27}
                name="save"
                color={'#fff'}
                onPress={saveStatus}
                // style={{right: 10}}
              />
            ),
          }}>
          {() => (
            <ModalForm fieldsArray={StatusFormArray} navigation={navigation}>
              <ModalField
                mode="inlined"
                headingLeft="Are you out of office"
                switchRight={true}
              />
              <ModalField
                mode="inlined"
                headingLeft="Gone To"
                subHeadingLeft="Please Select"
                onPressLeft={() => navigation.navigate('Gone To')}
                pressEnableLeft
              />
              <ModalField mode="multiline" headingLeft="Additional Info" />
              <ModalField
                mode="inlined"
                headingLeft="Date Back"
                subHeadingLeft="--"
                subIconLeft="calendar-outline"
                pressEnableLeft
                headingRight="Time Back"
                subHeadingRight="--"
                subIconRight="timer-outline"
                pressEnableRight
              />
            </ModalForm>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={'Gone To'}
          options={{
            animation: 'slide_from_bottom',
            headerLeft: () => (
              <Ionicons
                size={30}
                name="close"
                style={{right: 6}}
                color={'#fff'}
                onPress={backGoneTo}
              />
            ),
            headerRight: () => (
              <FA
                size={27}
                name="check"
                color={'#fff'}
                onPress={saveGoneTo}
                // style={{right: 10}}
              />
            ),
          }}>
          {() => <ModalForm fieldsArray={GoneToFormArray} />}
        </Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
};

const Draw = ({navigation, route}: DrawerHeaderProps) => {
  const {colors}: Theme = useTheme();

  const noHeader = (): null => null;

  return (
    <Drawer.Navigator
      initialRouteName="Agenda"
      useLegacyImplementation={true}
      backBehavior="history"
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerType: 'slide',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colors.primary,
          borderBottomWidth: 1,
          elevation: 1,
        },
        headerTitleStyle: {
          color: '#ffffff',
        },
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
        drawerItemStyle: {
          opacity: 0.8,
        },

        headerLeft: () => (
          <Ionicons
            size={30}
            name="menu"
            color={'#fff'}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{left: 10}}
          />
        ),
        headerRight: () => (
          <FA
            size={30}
            name="user"
            color={'#fff'}
            onPress={() => console.log('Hello User')}
            style={{right: 10}}
          />
        ),
      }}>
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{
          headerRight: () => (
            <Ionicons
              size={30}
              name="barcode-outline"
              color={'#ffffff96'}
              onPress={() => console.log('Hello User')}
              style={{right: 10}}
            />
          ),
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Search</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Agenda"
        component={Agenda}
        options={{
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Agenda</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <MCI name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Calendar"
        component={Calendar}
        options={{
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Calendar</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Companies"
        component={Companies}
        options={{
          headerRight: noHeader,
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Companies</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <MCI
              name="office-building-marker-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Contacts"
        component={Contacts}
        options={{
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Contacts</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <AD name="contacts" size={size} color={color} />
          ),
          headerRight: noHeader,
        }}
      />
      <Drawer.Screen
        name="Configurations"
        component={Configurations}
        options={{
          headerRight: () => (
            <Ionicons
              size={30}
              name="barcode-outline"
              color={'#ffffff'}
              onPress={() => console.log('Hello User')}
              style={{right: 10}}
            />
          ),
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Configurations</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <MCI name="puzzle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Service Board"
        component={ServiceBoard}
        options={{
          headerTitle: () => (
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontFamily: 'sans-serif-medium',
                }}>
                Service Board
              </Text>
              <Text style={{textAlign: 'center', color: '#fff', fontSize: 14}}>
                My Services
              </Text>
            </View>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row', right: 10}}>
              <AD
                size={30}
                name="filter"
                color={'#ffffff'}
                onPress={() => console.log('Filter')}
              />
              <Badge
                size={15}
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  right: -5,
                  top: -5,
                  backgroundColor: '#dc1e1e',
                  fontWeight: 'bold',
                }}>
                99
              </Badge>
            </View>
          ),
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Service Board</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <MCI name="headset" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Project Board"
        component={ProjectBoard}
        options={{
          headerRight: () => (
            <View style={{flexDirection: 'row', right: 10}}>
              <AD
                size={30}
                name="filter"
                color={'#ffffff'}
                onPress={() => console.log('Filter')}
              />
              <Badge
                size={15}
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  right: -5,
                  top: -5,
                  backgroundColor: '#dc1e1e',
                  fontWeight: 'bold',
                }}>
                33
              </Badge>
            </View>
          ),
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Project Board</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <AD name="areachart" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Activities"
        component={MyActivities}
        options={{
          headerRight: noHeader,
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>My Activities</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <MCI name="clipboard-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Opportunities"
        component={Oppurtunities}
        options={{
          headerRight: () => (
            <View style={{flexDirection: 'row', right: 10}}>
              <AD
                size={30}
                name="filter"
                color={'#ffffff'}
                onPress={() => console.log('Filter')}
              />
              <Badge
                size={15}
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  right: -5,
                  top: -5,
                  backgroundColor: '#dc1e1e',
                  fontWeight: 'bold',
                }}>
                99
              </Badge>
            </View>
          ),
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Opportunities</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <MCI name="briefcase-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="In Out Board"
        component={InOutBoard}
        options={{
          headerRight: noHeader,
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>In/Out Board</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <MCI name="checkbox-marked-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Expense Reports"
        component={ExpenseReports}
        options={{
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Expense Reports</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <FA5 name="coins" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="TimeSheets"
        component={TimeSheets}
        options={{
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Time Sheets</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <MCI name="clipboard-clock-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="StopWatch"
        component={StopWatch}
        options={{
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Stopwatch</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <Ionicons name="ios-stopwatch" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Profile"
        component={Profile}
        options={{
          swipeEnabled: false,
          headerLeft: () => (
            <Ionicons
              size={30}
              name="close"
              color={'#fff'}
              onPress={() => navigation.goBack()}
              style={{left: 10}}
            />
          ),
          headerRight: noHeader,
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="Forms"
        component={Stacks}
        options={{
          headerShown: false,
          drawerItemStyle: {display: 'none'},
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          headerRight: noHeader,
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={SendFeedback}
        options={{
          headerRight: noHeader,
          drawerItemStyle: {display: 'none'},
        }}
      />
    </Drawer.Navigator>
  );
};

export default Draw;

const styles = StyleSheet.create({
  header: {
    // flex: 0.5,
    height: moderateVerticalScale(80, 0.5),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#fff',
    paddingVertical: 5,
  },
  avatarContainer: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: moderateScale(65, 0.5),
    width: moderateScale(65, 0.5),
    borderRadius: 100,
  },
  content: {
    // flex: 2.5,
    height: moderateVerticalScale(390, 1.55),
  },
  footer: {
    // flex: 3.5,
    height: moderateVerticalScale(185, 0.2),
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderColor: '#fff',
  },
  footerDrawerStyle: {
    opacity: 0.75,
    right: 20,
  },
  drawerTitleStyle: {
    fontWeight: '700',
    color: '#fff',
  },
});
