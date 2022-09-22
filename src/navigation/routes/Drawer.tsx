import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
  useTheme,
  DrawerActions,
  useNavigation,
  useRoute,
  Theme,
} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import AD from 'react-native-vector-icons/AntDesign';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import {State, useHookstate} from '@hookstate/core';
import {moderateVerticalScale} from 'react-native-size-matters';
import {Avatar} from 'react-native-paper';
// @ts-ignore
import store from 'react-native-simple-store';

import {globalState} from '../../stores/globalAppState';
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
  StopWatch,
  TimeSheets,
  Settings,
  SendFeedback,
  Profile,
} from '../../screens';
import {ParamList} from '../../types';
import {BUILD_VERSION} from '../../constants';
import {
  contactsList,
  opportunityFilterList,
  pBoardFilterList,
  sBoardFiterList,
} from '../../constants/SampleArrays';
import CstmBadge from '../../components/CtsmBadge';
import Images from '../../assets/images';
import {userStore} from '../../stores/userStore';

const Drawer = createDrawerNavigator<ParamList>();

const DrawerContent = (props: DrawerContentComponentProps) => {
  const currStatus: State<boolean> = useHookstate(userStore.currentStatus);
  const user: State<any> = useHookstate(userStore.user);
  const dScreen: State<string> = useHookstate(globalState.defaultScreenId);
  const dSName: State<string> = useHookstate(globalState.defaultScreenName);
  const dNavName: State<string> = useHookstate(
    globalState.defaultnNavigationName,
  );

  const {colors}: Theme = useTheme();

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: colors.primary}}>
      <TouchableOpacity
        style={styles.header}
        onPress={() =>
          props.navigation.navigate({
            name: 'Profile',
            params: {prevScreen: 'Agenda'},
          })
        }>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Avatar.Image
              size={moderateVerticalScale(65, 0.5)}
              source={Images.Avatar}
            />
          </View>
        </View>
        <View style={{flex: 0.7}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.drawerTitleStyle}>{user.get()?.user_name}</Text>
            <Text style={styles.drawerTitleStyle}>iTarian LLC</Text>
            <Text style={styles.drawerTitleStyle}>
              {currStatus.get() ? 'Out of the Office' : 'In Office'}
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
        <View>
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
              user.set(false);
              dSName.set('Agenda');
              dScreen.set('Agenda');
              dNavName.set('');
              store.delete(['user', 'dSName', 'dNavName']);
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'sans-serif-medium',
            color: '#ffffff',
          }}>
          Build version ({BUILD_VERSION})
        </Text>
      </View>
    </SafeAreaView>
  );
};

const Draw = () => {
  const dScreen: State<any> = useHookstate(globalState.defaultScreenId);
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const shortCutScreen: State<any> = useHookstate(globalState.shortCutScreen);
  const [currMember, setcurrMember] = useState<any>(contactsList[0]);
  const [calCurrMember, setCalCurrMember] = useState<any>(contactsList[0]);
  const [filterCount, setFilterCount] = useState<any>('0');
  const {colors}: Theme = useTheme();

  const noHeader = (): null => null;

  useEffect(() => {
    var filterVariables = route?.params?.params?.filter?.filter((val: any) => {
      if (val?.key && val?.value != null)
        return {key: val.key, value: val?.value};
    });
    setFilterCount(filterVariables?.length || '0');
    if (route?.params?.item) {
      if (route?.params?.from == 'Agenda') {
        setcurrMember(route?.params?.selected);
      } else if (route?.params?.from == 'Calendar') {
        setCalCurrMember(route?.params?.selected);
      } else {
        setcurrMember(currMember);
        setCalCurrMember(calCurrMember);
      }
    }
  }, [route?.params]);

  useEffect(() => {
    if (route?.params?.selected) {
      setcurrMember(route?.params?.selected);
      setCalCurrMember(route?.params?.selected);
    } else {
      setcurrMember(currMember);
      setCalCurrMember(calCurrMember);
    }
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName={shortCutScreen?.get() || dScreen.get()}
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
      }}>
      <Drawer.Screen
        name="FSLoader"
        component={FSLoader}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{
          headerRight: () => (
            <Ionicons
              size={30}
              name="barcode-outline"
              color={'#ffffff'}
              onPress={() =>
                navigation.navigate('Stack1', {
                  screen: 'BarcodeScanner',
                  params: {
                    from: 'Search',
                    stack: 'Draw',
                  },
                })
              }
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
          headerTitle: () => (
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontFamily: 'sans-serif-medium',
                  textAlign: 'center',
                }}>
                Agenda
              </Text>
              <Text style={{textAlign: 'center', color: '#fff', fontSize: 14}}>
                {currMember?.name}
              </Text>
            </View>
          ),
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Agenda</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <MCI name="calendar" size={size} color={color} />
          ),
          headerRight: () => (
            <FA
              size={30}
              name="user"
              color={'#fff'}
              onPress={() =>
                navigation.navigate('Stack2', {
                  screen: 'CstmItemSelector',
                  params: {
                    from: 'Agenda',
                    item: 'GoneTo',
                    data: contactsList,
                    selected: currMember,
                    stack: 'Draw',
                    headerTitle: 'Select Member',
                    searchable: true,
                  },
                })
              }
              style={{right: 10}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerTitle: () => (
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontFamily: 'sans-serif-medium',
                  textAlign: 'center',
                }}>
                Calendar
              </Text>
              <Text style={{textAlign: 'center', color: '#fff', fontSize: 14}}>
                {calCurrMember?.name}
              </Text>
            </View>
          ),
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Calendar</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
          headerRight: () => (
            <FA
              size={30}
              name="user"
              color={'#fff'}
              onPress={() =>
                navigation.navigate('Stack2', {
                  screen: 'CstmItemSelector',
                  params: {
                    from: 'Calendar',
                    item: 'GoneTo',
                    data: contactsList,
                    selected: calCurrMember,
                    stack: 'Draw',
                    headerTitle: 'Select Member',
                    searchable: true,
                  },
                })
              }
              style={{right: 10}}
            />
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
              onPress={() =>
                navigation.navigate('Stack1', {
                  screen: 'BarcodeScanner',
                  params: {
                    from: 'Configurations',
                    stack: 'Draw',
                  },
                })
              }
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
        name="SBoard"
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
                onPress={() => {
                  navigation.navigate('Stack1', {
                    screen: 'Filters',
                    params: {
                      dataSource: sBoardFiterList,
                      FilterStack: 'Draw',
                      FilterFrom: 'SBoard',
                    },
                  });
                }}
              />
              {/* {console.log(
                'filterVariables filterVariables filterVariables',
                route?.params?.filter?.filter((val: any) => {
                  if (val?.key && val?.value != null)
                    return {key: val.key, value: val?.value};
                })?.length,
              )} */}
              <CstmBadge qty={filterCount || '0'} />
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
        name="PBoard"
        component={ProjectBoard}
        options={({route, navigation}) => ({
          title: 'Project Board',
          headerRight: () => (
            <View style={{flexDirection: 'row', right: 10}}>
              <AD
                size={30}
                name="filter"
                color={'#ffffff'}
                onPress={() => {
                  navigation.navigate('Stack1', {
                    screen: 'Filters',
                    params: {
                      dataSource: pBoardFilterList,
                      FilterStack: 'Draw',
                      FilterFrom: 'PBoard',
                    },
                  });
                }}
              />
              <CstmBadge qty={filterCount || '0'} />
            </View>
          ),
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Project Board</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <AD name="areachart" size={size} color={color} />
          ),
        })}
      />
      <Drawer.Screen
        name="MyActivities"
        component={MyActivities}
        options={{
          title: 'My Activities',
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
        options={({navigation, route}) => ({
          headerRight: () => (
            <View style={{flexDirection: 'row', right: 10}}>
              <AD
                size={30}
                name="filter"
                color={'#ffffff'}
                onPress={() =>
                  navigation.navigate('Stack1', {
                    screen: 'Filters',
                    params: {
                      dataSource: opportunityFilterList,
                      title: '30 Dec 2022',
                      FilterStack: 'Draw',
                      FilterFrom: 'PBoard',
                    },
                  })
                }
              />
              <CstmBadge qty={filterCount || '0'} />
            </View>
          ),
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Opportunities</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <MCI name="briefcase-outline" size={size} color={color} />
          ),
        })}
      />
      <Drawer.Screen
        name="IOBoard"
        component={InOutBoard}
        options={{
          title: 'In/Out Board',
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
        name="ExpReports"
        component={ExpenseReports}
        options={{
          title: 'Expense Reports',
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Expense Reports</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <FA5 name="coins" size={size} color={color} />
          ),
          headerRight: noHeader,
        }}
      />
      <Drawer.Screen
        name="TimeSheets"
        component={TimeSheets}
        options={{
          title: 'Time Sheets',
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Time Sheets</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <MCI name="clipboard-clock-outline" size={size} color={color} />
          ),
          headerRight: noHeader,
        }}
      />
      <Drawer.Screen
        name="StopWatch"
        component={StopWatch}
        options={{
          headerTitle: 'Stopwatch',
          drawerLabel: ({color, focused}) => (
            <Text style={{right: 20, color}}>Stopwatch</Text>
          ),
          drawerIcon: ({color, size, focused}) => (
            <Ionicons name="ios-stopwatch" size={size} color={color} />
          ),
          headerRight: noHeader,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        initialParams={{status: false}}
        options={{
          headerLeft: () => (
            <Ionicons
              size={30}
              name="close"
              color={'#fff'}
              onPress={() => navigation.navigate('Agenda')}
              style={{left: 10}}
            />
          ),
          headerRight: noHeader,
          drawerItemStyle: {display: 'none'},
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

const FSLoader = () => {
  const {colors} = useTheme();
  return (
    <View style={{backgroundColor: colors.background, ...styles.loading}}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default Draw;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#fff',
    paddingVertical: 5,
  },
  avatar: {
    height: moderateVerticalScale(65, 0.5),
    width: moderateVerticalScale(65, 0.5),
    borderRadius: 100,
  },
  avatarContainer: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#fff',
    justifyContent: 'flex-end',
  },
  footerDrawerStyle: {
    opacity: 0.75,
    right: 20,
  },
  drawerTitleStyle: {
    fontWeight: '700',
    color: '#fff',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
