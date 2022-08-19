import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Linking,
  Keyboard
} from 'react-native';

import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import styles from './style';
import {Theme} from '../../../theme/colors';
import {CstmButton, CstmInput, CstmErrorText} from '../../../components';
import QuickActions, {ShortcutItem} from 'react-native-quick-actions';
import {WINDOW_HEIGHT} from '../../../constants';
import {useState as useHookState, State} from '@hookstate/core';
import {globalState} from '../../../utils/globalState';
// @ts-ignore
import store from 'react-native-simple-store';
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

const LoginScreen = ({navigation}: NativeStackHeaderProps) => {
  const user: State<any> = useHookState(globalState.user);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const {colors}: Theme = useTheme();

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleColdBoot = (data: ShortcutItem) => {
    const {userInfo} = data;
    console.log('chala coldboot', userInfo?.url);
    Linking.openURL(userInfo?.url);
  };

  QuickActions.popInitialAction()
    .then(data => {
      if (data != null) handleColdBoot(data);
    })
    .catch(err => console.log('err', err));

  return (
    <View style={{height: WINDOW_HEIGHT}}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/images/ITarian_Logo_Clear.png')}
          resizeMode={'contain'}
          style={styles.headerImage}
        />
      </View>
      <ScrollView>
        <KeyboardAvoidingView style={keyboardStatus ? styles.container : {}} behavior="padding">
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={values => {
              navigation.navigate('Draw');
              console.log('HAHAH');
            }}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleSubmit,
              errors,
              setFieldTouched,
              touched,
              values,
            }) => (
              <>
                <View>
                  <CstmInput title={'Site'} placeholder={'Your site'} />
                  <CstmInput title={'Company'} placeholder={'Your company'} />
                  <CstmInput
                    title={'Username'}
                    placeholder={'Your email address'}
                    value={values.email}
                    keyType={'email-address'}
                    onChangeText={handleChange('email')}
                    onChange={() => {}}
                    onBlur={() => setFieldTouched('email')}
                  />
                  {touched.email && errors.email ? (
                    <CstmErrorText errorMsg={errors.email} />
                  ) : (
                    <View />
                  )}
                  <CstmInput
                    title={'Password'}
                    placeholder={'Your password'}
                    value={values.password}
                    textHidden
                    onChangeText={handleChange('password')}
                    onChange={() => {}}
                    onBlur={() => setFieldTouched('password')}
                  />
                  {touched.password && errors.password ? (
                    <CstmErrorText errorMsg={errors.password} />
                  ) : (
                    <View />
                  )}
                  <View style={{marginVertical: 10}}>
                    <CstmButton
                      title="Sign In"
                      onPress={() => {
                        // handleSubmit();
                        user.set({
                          user: true
                        })
                        store.update('user', {
                          user: true
                        })
                      }}
                    />
                  </View>
                </View>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
