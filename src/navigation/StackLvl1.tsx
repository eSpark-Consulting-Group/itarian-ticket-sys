import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import II from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';
import {Theme, useTheme} from '@react-navigation/native';
import {
  backStatus,
  saveGoneTo,
  saveStatus,
} from '../forms/utils/headerFunctions';

import MyStatus from '../forms/MyStatus';
import STickets from '../forms/ServiceTickets';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  MyStatus: undefined;
  STickets: {title: string};
};

const StackLvl1 = ({navigation}: any) => {
  const {colors}: Theme = useTheme();

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
        name="MyStatus"
        component={MyStatus}
        initialParams={{status: false}}
        options={{
          title: 'My Status',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: props => {
            console.log('Stack Props', props);
            return (
              <II
                size={30}
                name="close"
                style={{right: 6}}
                color={'#fff'}
                onPress={() => backStatus(navigation)}
              />
            );
          },
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => saveStatus(navigation)}
            />
          ),
        }}
      />
      <Stack.Screen
        name="STickets"
        component={STickets}
        options={({route}) => ({
          title: route?.params?.title,
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II size={30} name="close" style={{right: 6}} color={'#fff'} />
          ),
          headerRight: () => <FA size={27} name="save" color={'#fff'} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default StackLvl1;
