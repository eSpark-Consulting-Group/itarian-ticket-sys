import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Linking,
  Keyboard,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';

import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {State, useHookstate} from '@hookstate/core';
// @ts-ignore
import store from 'react-native-simple-store';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';
import {
  CstmButton,
  CstmInput,
  CstmErrorText,
  BiometricVerification,
  Separator,
  GapView,
} from '../../../components';
import QuickActions from 'react-native-quick-actions';
import {WINDOW_HEIGHT} from '../../../constants';

import Images from '../../../assets/images';
import {userStore} from '../../../stores/userStore';
import {handleLoginUser} from '../utils/functions';
import {globalState} from '../../../stores/globalAppState';
import {Loader} from '../../../components/Loader';
import {handleColdBoot} from '../../../utils/helperFunctions';
import {Theme, useTheme} from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
});

const LoginScreen = ({navigation}: NativeStackHeaderProps) => {
  const user: State<any> = useHookstate(userStore.user);
  const loadingState: State<boolean> = useHookstate(globalState.loader);
  const biometricState: State<boolean> = useHookstate(globalState.useBiometric);
  const [showScanner, setShowScanners] = useState(false);
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

  const handleScanner = () => {
    if (biometricState.get()) {
      setShowScanners(true);
    } else {
      Alert.alert(
        'Enable Biometric Authentication',
        'You can enable biometric authentication from App Settings',
      );
    }
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
          <Separator text="OR" />
          <View style={styles.scannerBtnContainer}>
            <TouchableOpacity
              activeOpacity={biometricState.get() ? 0 : 1}
              onPress={handleScanner}
              style={{
                ...styles.fingerScannerBtn,
                borderColor: biometricState.get()
                  ? colors.primary
                  : colors.primary + '81',
              }}>
              <MCI
                name="fingerprint"
                color={
                  biometricState.get() ? colors.primary : colors.primary + '81'
                }
                size={50}
              />
            </TouchableOpacity>
            <GapView />
            <Text
              style={{
                color: biometricState.get()
                  ? colors.primary
                  : colors.primary + '81',
                fontSize: 14,
              }}>
              Biometric Scan
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <Loader isShow={loadingState.get()} />

      {showScanner && (
        <BiometricVerification
          onAuthenticate={() => {
            user.set(true);
            setShowScanners(false);
          }}
          onCancel={() => setShowScanners(false)}
        />
      )}
    </View>
  );
};

export default LoginScreen;
