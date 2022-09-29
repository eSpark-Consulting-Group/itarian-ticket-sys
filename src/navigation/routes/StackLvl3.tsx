import React from 'react';
import {View} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import II from 'react-native-vector-icons/Ionicons';
import MI from 'react-native-vector-icons/MaterialIcons';
import FA from 'react-native-vector-icons/FontAwesome';
import {State, useHookstate} from '@hookstate/core';

import STickets from '../../forms/ServiceTickets';
import {globalState} from '../../stores/globalAppState';
import {Signature} from '../../forms/Signature';
import {BarcodeScanner, SignaturePad} from '../../components';
import {handleStopwatch} from '../utils/headerFunctions';
import {STicketsAdditionalButtons} from '../../constants/ButtonsList';
import NewTimeSheet from '../../forms/NewTimeSheet';
import NewExpenseReport from '../../forms/NewExpenseReport';
import Configuration1 from '../../screens/Configurations/View/Configuration';
import Contact1 from '../../screens/Contacts/View/Contacts';
import AddTask from '../../forms/AddTask';
import {checkValidations} from '../../utils/helperFunctions';
import NewConfiguration from '../../forms/NewConfiguration/CreateConfigurations';
import AddProduct from '../../forms/AddProduct';
import Product from '../../components/ProductListing/View/Product';

const Stack = createNativeStackNavigator();

const StackLvl2 = ({navigation, route}: any) => {
  const {colors}: Theme = useTheme();
  const activeStatus: State<any> = useHookstate(globalState);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
        },
        animation: 'slide_from_bottom',
      }}>
      <Stack.Screen
        name="Signature"
        component={Signature}
        options={({route, navigation}) => ({
          title: 'Sign Off',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="close"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() =>
                navigation.navigate('Stack1', {screen: 'STickets'})
              }
            />
          ),
        })}
      />
      <Stack.Screen
        name="SignaturePad"
        component={SignaturePad}
        options={({route, navigation}: any) => ({
          title: 'Collect Signature',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="close"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <II
              size={30}
              name="checkmark"
              color={'#fff'}
              onPress={() => route?.params?.onCheck()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="STickets"
        component={STickets}
        options={({route, navigation}: any) => ({
          title: route?.params?.title,
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <II
                size={30}
                name="stopwatch-outline"
                color={'#fff'}
                onPress={() => handleStopwatch(route?.params)}
              />
              <View style={{width: 15}} />
              <MI
                onPress={() =>
                  navigation.navigate('Stack2', {
                    screen: 'EditTicket',
                    params: route?.params,
                  })
                }
                size={30}
                name="edit"
                color={'#fff'}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="NewTimeSheet"
        component={NewTimeSheet}
        options={({route, navigation}: any) => ({
          title: route?.params?.title || 'Add Time',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewExpenseReport"
        component={NewExpenseReport}
        options={({route, navigation}: any) => ({
          title: route?.params?.title || 'Add Expense',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTask}
        options={({route, navigation}: any) => ({
          title: 'AddTask',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => checkValidations(navigation, route, activeStatus)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Configure1"
        component={Configuration1}
        options={({route, navigation}) => ({
          title: 'Configuration',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
            size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => <FA size={30} name="save" color={'#fff'} />,
        })}
      />
      <Stack.Screen
        name="Contact1"
        component={Contact1}
        options={({route, navigation}) => ({
          title: 'Contact',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => null,
        })}
      />
       <Stack.Screen
        name="BarcodeScanner"
        component={BarcodeScanner}
        options={({route, navigation}) => ({
          title: 'Barcode Scanner',
          headerShown: false,
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="close"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
              />
              ),
              headerRight: () => (
                <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
            ),
        })}
      />
      <Stack.Screen
        name="NewConfigure"
        component={NewConfiguration}
        options={({route, navigation}) => ({
          title: 'New Configuration',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <>
              <II
                size={30}
                name="barcode-outline"
                color={'#ffffff'}
                onPress={() =>
                  navigation.navigate('Stack3', {
                    screen: 'BarcodeScanner',
                    params: {
                      from: 'NewConfigure',
                      stack: 'Stack3',
                    },
                  })
                }
                style={{right: 10}}
              />
              <FA
                size={30}
                name="save"
                color={'#fff'}
                onPress={() => checkValidations(navigation, route, activeStatus)}
              />
            </>
          ),
        })}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={({route, navigation}: any) => ({
          title: 'New Product',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <>
              <II
              size={30}
              name="barcode-outline"
              color={'#ffffff'}
              onPress={() =>
                navigation.navigate('Stack3', {
                  screen: 'BarcodeScanner',
                  params: {
                    from: 'ConfigurationListing',
                    stack: 'Stack2',
                  },
                })
              }
              style={{right: 10}}
            />
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => checkValidations(navigation, route, activeStatus)}
            />
            </>
          ),
        })}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={({route, navigation}) => ({
          title: 'Product',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => <FA size={30} name="save" color={'#fff'} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default StackLvl2;
