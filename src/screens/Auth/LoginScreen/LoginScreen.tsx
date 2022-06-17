import {View, Text, Button} from 'react-native';
import React from 'react';
import styles from './style';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {CstmButton, CstmInput} from '../../../components';
const LoginScreen = ({navigation, route}: NativeStackHeaderProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>LoginScreen</Text>
      </View>
      <CstmInput title={'Email'} placeholder={'Your email address'} />
      <CstmInput title={'Password'} placeholder={'Your password'} />
      <CstmButton
        title="Sign In"
        onPress={() => {
          navigation.navigate('Agenda');
        }}
      />
    </View>
  );
};

export default LoginScreen;
