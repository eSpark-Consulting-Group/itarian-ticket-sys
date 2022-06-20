import React from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerHeaderProps,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {useTheme, DrawerActions} from '@react-navigation/native';
import {Theme} from '../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';
import {useState as useHookState, State} from '@hookstate/core';
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
} from '../screens';
import {moderateScale} from 'react-native-size-matters';

const Drawer = createDrawerNavigator();

const DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>{/*Avatar Container */}</View>
        </View>
        <View style={{flex: 0.7, backgroundColor: 'blue'}}>
          {/*User Info */}
        </View>
      </View>
      <View style={styles.content}>
        <ScrollView style={{flex: 1}}>
          <DrawerItemList {...props} />
        </ScrollView>
      </View>
      <View style={styles.footer}>
        {/* Footer Container */}
        <DrawerItem
          label={'Settings'}
          onPress={() => {
            props.navigation.navigate('Settings');
          }}
        />
        <DrawerItem
          label={'Send Feedback'}
          onPress={() => {
            props.navigation.navigate('Feedback');
          }}
        />
        <DrawerItem
          label={'Logout'}
          onPress={() => {
            console.log('Logout');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const Draw = ({navigation, route}: DrawerHeaderProps) => {
  const {colors}: Theme = useTheme();
  const themeValue: State<string> = useHookState(globalState.theme);

  const noHeader = (): null => null;

  console.log('What is the current value of State', themeValue.get());

  return (
    <Drawer.Navigator
      initialRouteName="Agenda"
      useLegacyImplementation={true}
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerType: 'slide',
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: colors.primary},
        headerTitleStyle: {color: colors.background},
        headerLeft: () => (
          <Ionicons
            size={30}
            name="menu"
            color="#fff"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{left: 10}}
          />
        ),
        headerRight: () => (
          <FA
            size={30}
            name="user"
            color="#fff"
            onPress={() => console.log('Hello User')}
            style={{right: 10}}
          />
        ),
      }}>
      <Drawer.Screen name="Agenda" component={Agenda} />
      <Drawer.Screen name="Search" component={Search} />
      <Drawer.Screen name="Calendar" component={Calendar} />
      <Drawer.Screen name="Companies" component={Companies} />
      <Drawer.Screen name="Contacts" component={Contacts} />
      <Drawer.Screen name="Configurations" component={Configurations} />
      <Drawer.Screen name="Service Board" component={ServiceBoard} />
      <Drawer.Screen name="Project Board" component={ProjectBoard} />
      <Drawer.Screen name="My Activities" component={MyActivities} />
      <Drawer.Screen name="Opportunities" component={Oppurtunities} />
      <Drawer.Screen name="In Out Board" component={InOutBoard} />
      <Drawer.Screen name="Expense Reports" component={ExpenseReports} />
      <Drawer.Screen name="Service Tickets" component={ServiceTickets} />
      <Drawer.Screen name="TimeSheets" component={TimeSheets} />
      <Drawer.Screen name="StopWatch" component={StopWatch} />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{headerRight: noHeader, drawerItemStyle: {display: 'none'}}}
      />
      <Drawer.Screen
        name="Feedback"
        component={SendFeedback}
        options={{headerRight: noHeader, drawerItemStyle: {display: 'none'}}}
      />
    </Drawer.Navigator>
  );
};

export default Draw;

const styles = StyleSheet.create({
  header: {
    flex: 0.12,
    backgroundColor: 'hsl(344, 100%, 54%)',
    flexDirection: 'row',
  },
  avatarContainer: {
    flex: 0.35,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: moderateScale(65, 0.5),
    width: moderateScale(65, 0.5),
    backgroundColor: 'red',
    borderRadius: 100,
  },
  content: {
    flex: 0.63,
    backgroundColor: 'hsl(35, 100%, 55%)',
  },
  footer: {
    flex: 0.25,
    backgroundColor: 'hsl(197, 93%, 29%)',
  },
});
