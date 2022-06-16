import {View, Text, Button} from 'react-native';
import React from 'react';
import styles from './style';

const LoginScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      <Button
        title="Go to SignUp"
        onPress={() => {
          console.log('SignUp');
        }}
      />
      <Button
        title="Go to Agenda"
        onPress={() => {
          console.log('Agenda');
        }}
      />
    </View>
  );
};

export default LoginScreen;
