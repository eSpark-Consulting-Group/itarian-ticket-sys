import React from 'react';
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
import {useState as useHookState, State} from '@hookstate/core';
import {moderateScale} from 'react-native-size-matters';
import {Avatar} from 'react-native-paper';

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
  Status,
} from '../screens';
import {TransitionPresets} from '@react-navigation/stack';
import {ModalForm, ModalStack} from '../components';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const {width, height} = Dimensions.get('window');

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {colors}: Theme = useTheme();
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
        <View
          style={{
            flex: 0.7,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={{fontWeight: '700', color: '#fff'}}>Johnny Bravo</Text>
            <Text style={{fontWeight: '700', color: '#fff'}}>iTarian LLC</Text>
            <View>
              <Text style={{fontWeight: '700', color: '#fff'}}>
                Out of Office
              </Text>
            </View>
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
          labelStyle={{
            opacity: 0.75,
            right: 20,
          }}
          onPress={() => {
            props.navigation.navigate('Settings');
          }}
        />
        <DrawerItem
          label={'Send Feedback'}
          inactiveTintColor={'#fff'}
          labelStyle={{
            opacity: 0.75,
            right: 20,
          }}
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
          labelStyle={{
            opacity: 0.75,
            right: 20,
          }}
          icon={({color, size, focused}) => (
            <MCI name="logout" size={size} color={color} />
          )}
          onPress={() => {
            console.log('Logout');
            props.navigation.navigate('Login');
          }}
        />
        <Text>Build v0.31.1c</Text>
      </View>
    </SafeAreaView>
  );
};

const FormScreen = ({navigation}: NativeStackHeaderProps) => {
  const {colors}: Theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: colors.background,
        },
        animation: 'slide_from_bottom',
        presentation: 'modal',
      }}>
      {/* <Stack.Group>
        <Stack.Screen
          name="My Profile"
          component={Profile}
          options={{
            headerLeft: () => (
              <Ionicons
                size={30}
                name="close"
                style={{right: 5}}
                color={colors.background}
                onPress={() => navigation.navigate('Agenda')}
              />
            ),
          }}
        />
      </Stack.Group> */}
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
        }}>
        <Stack.Screen
          name="My Status"
          component={ModalForm}
          options={{
            animation: 'slide_from_bottom',
            headerLeft: () => (
              <Ionicons
                size={30}
                name="close"
                style={{right: 5}}
                color={colors.background}
                onPress={() => navigation.navigate('My Profile')}
              />
            ),
          }}
        />
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
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerType: 'slide',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colors.primary,
          borderBottomWidth: 1,
          // borderBottomColor: '#ffffff66',
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
        }}
      />
      <Drawer.Screen
        name="Configurations"
        component={Configurations}
        options={{
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
          headerLeft: () => (
            <Ionicons
              size={30}
              name="close"
              color={colors.background}
              onPress={() => navigation.navigate('Agenda')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Forms"
        component={FormScreen}
        options={{headerShown: false}}
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
    // height: moderateScale(height * 0.2, 0.5),
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
    height: moderateScale(height * 0.5, 0.5),
  },
  footer: {
    height: moderateScale(height * 0.1, 0),
    borderTopWidth: 1,
    borderColor: '#fff',
  },
});
