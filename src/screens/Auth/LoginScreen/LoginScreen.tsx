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
import {
  CstmButton,
  CstmInput,
  CstmErrorText,
  BiometricVerification,
} from '../../../components';
import QuickActions, {ShortcutItem} from 'react-native-quick-actions';
import {WINDOW_HEIGHT} from '../../../constants';
import {State, useHookstate} from '@hookstate/core';

// @ts-ignore
import store from 'react-native-simple-store';

import Images from '../../../assets/images';
import {userStore} from '../../../stores/userStore';
import {handleLoginUser} from '../utils/functions';
import {globalState} from '../../../stores/globalAppState';
import {Loader} from '../../../components/Loader';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

const LoginScreen = ({navigation}: NativeStackHeaderProps) => {
  const user: State<any> = useHookstate(userStore.user);
  const loadingState: State<boolean> = useHookstate(globalState.loader);
  const biometricState: State<boolean> = useHookstate(globalState.useBiometric);
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
              email: '',
              password: '',
            }}
            onSubmit={values => {
              const {email, password} = values;
              handleLoginUser(email, password, navigation);
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
                    title={'Email'}
                    placeholder={'Your email'}
                    value={values.email}
                    keyType={'default'}
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
                      loader={false}
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
      <Loader isShow={loadingState.get()} />

      {biometricState.get() && (
        <BiometricVerification
          // onAuthenticate={() => console.log('User Authenticated')}
          onAuthenticate={() => navigation.navigate('Draw')}
        />
      )}
    </View>
  );
};

export default LoginScreen;
