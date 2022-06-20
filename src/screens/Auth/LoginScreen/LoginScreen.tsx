import {View, Text, Button, Image, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import styles from './style';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {CstmButton, CstmInput} from '../../../components';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../theme/colors';

const LoginScreen = ({navigation, route}: NativeStackHeaderProps) => {
  const {colors}: Theme = useTheme();
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/Images/logo.png')}
          resizeMode={'contain'}
          style={styles.headerImage}
        />
      </View>
      <View>
        <CstmInput title={'Site'} placeholder={'Your site'} />
        <CstmInput title={'Company'} placeholder={'Your company'} />
        <CstmInput title={'Username'} placeholder={'Your email address'} />
        <CstmInput title={'Password'} placeholder={'Your password'} />
      </View>
      <View style={{marginVertical: 10}}>
        <CstmButton
          title="Sign In"
          onPress={() => {
            navigation.navigate('Draw');
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
