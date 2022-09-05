import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Linking,
  Keyboard,
} from 'react-native';

import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Theme, useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import styles from './style';
import {CstmButton, CstmInput, CstmErrorText} from '../../../components';
import QuickActions, {ShortcutItem} from 'react-native-quick-actions';
import {WINDOW_HEIGHT} from '../../../constants';
import {useState as useHState, State} from '@hookstate/core';
import {globalState} from '../../../utils/globalState';
// @ts-ignore
import store from 'react-native-simple-store';
import Images from '../../../assets/images';
const validationSchema = Yup.object().shape({
  username: Yup.string().required().min(5).label('Username'),
  password: Yup.string().required().min(6).label('Password'),
});

const LoginScreen = () => {
  const user: State<any> = useHState(globalState.user);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const {colors}: Theme = useTheme();

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
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
          source={Images.Logo}
          resizeMode={'contain'}
          style={styles.headerImage}
        />
      </View>
      <ScrollView>
        <KeyboardAvoidingView
          style={keyboardStatus ? styles.container : {}}
          behavior="padding">
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={values => {
              user.set({
                user: values,
              });
              store.update('user', {
                user: values,
              });
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
                    placeholder={'Your username'}
                    value={values.username}
                    keyType={'default'}
                    onChangeText={handleChange('username')}
                    onChange={() => {}}
                    onBlur={() => setFieldTouched('username')}
                  />
                  {touched.username && errors.username ? (
                    <CstmErrorText errorMsg={errors.username} />
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
                        handleSubmit();
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
