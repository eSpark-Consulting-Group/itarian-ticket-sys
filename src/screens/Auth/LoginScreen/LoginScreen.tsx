import {View, Text, Button} from 'react-native';
import React from 'react';
import styles from './style';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

const LoginScreen = ({navigation, route}: NativeStackHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      <Button
        title="Go to SignUp"
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      />
      <Button
        title="Go to Agenda"
        onPress={() => {
          navigation.navigate('Agenda');
        }}
      />
    </View>
  );
};

export default LoginScreen;
