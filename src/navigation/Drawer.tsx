import React from 'react';
import {
  Dimensions,
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
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {useTheme} from '@react-navigation/native';

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
} from '../screens';

const {width, height} = Dimensions.get('window');
const Drawer = createDrawerNavigator();

const DrawerContent = (props: any) => {
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
            console.log('Settings');
          }}
        />
        <DrawerItem
          label={'Send Feedback'}
          onPress={() => {
            console.log('Send Feedback');
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

const Draw = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Agenda"
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{drawerType: 'slide', headerTitleAlign: 'center'}}>
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
      <Drawer.Screen name="Time Sheets" component={TimeSheets} />
      <Drawer.Screen name="Stop Watch" component={StopWatch} />
    </Drawer.Navigator>
  );
};

export default Draw;

const styles = StyleSheet.create({
  header: {
    flex: 0.1,
    backgroundColor: 'hsl(344, 100%, 54%)',
    flexDirection: 'row',
  },
  avatarContainer: {
    flex: 0.3,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: '100%',
    width: '80%',
    backgroundColor: 'red',
    borderRadius: 35,
  },
  content: {
    flex: 0.65,
    backgroundColor: 'hsl(35, 100%, 55%)',
  },
  footer: {
    flex: 0.25,
    backgroundColor: 'hsl(197, 93%, 29%)',
  },
});
