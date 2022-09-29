import React, {useState} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';
import AndroidOpenSettings from 'react-native-android-open-settings';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {State, useHookstate} from '@hookstate/core';

import styles from './style';
import Images from '../../../assets/images';
import {BiometricVerification, CstmPressable} from '../../../components';
import {useUpdateEffect} from '../../../utils/hooks';
import {userStore} from '../../../stores/userStore';

const PinScreen = () => {
  const user: State<any> = useHookstate(userStore.user);
  const [pin, setPin] = useState('');
  const [showScanner, setShowScanners] = useState(false);

  const {colors, dark}: Theme = useTheme();

  const handleDigit = (digit: string) => {
    if (pin.length < 4) setPin(pin + digit);
  };

  useUpdateEffect(() => {
    if (pin.length == 4) {
      console.log('done');
    }
  }, [pin]);

  const handleScanner = () => {
    //! do not remove
    FingerprintScanner.isSensorAvailable()
      .then(biometryType => {
        console.log('Biometric', biometryType);
        setShowScanners(true);
      })
      .catch(error => {
        setShowScanners(false);
        Alert.alert(error.name, error.message, [
          {
            text: 'Open Security',
            style: 'default',
            onPress: () => AndroidOpenSettings.securitySettings(),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={Images.Logo}
          resizeMode={'contain'}
          style={styles.headerImage}
        />
      </View>
      <OTPInputView
        style={{width: '60%', height: 100, alignSelf: 'center'}}
        pinCount={4}
        code={pin} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        onCodeChanged={code => {
          setPin(code);
          console.log('code', code);
        }}
        onCodeFilled={code => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
        secureTextEntry
        editable={false}
        autoFocusOnLoad={false}
        codeInputFieldStyle={{
          ...styles.underlineStyleBase,
          color: colors.text,
          borderColor: colors.border,
          borderBottomWidth: 2,
          borderRadius: 5,
          height: 60,
          width: 40,
          fontSize: 24,
        }}
        selectionColor={colors.text}
        codeInputHighlightStyle={{
          borderColor: colors.border,
          borderRadius: 5,
          color: colors.text,
        }}
      />
      <Text style={{color: colors.text, fontSize: 16, fontWeight: '500'}}>
        Forgot PIN?
      </Text>
      <View style={{width: '80%', alignItems: 'center'}}>
        <View style={{...styles.row}}>
          <CstmPressable
            onPress={() => handleDigit('1')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>1</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => handleDigit('2')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>2</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => handleDigit('3')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>3</Text>
          </CstmPressable>
        </View>
        <View style={{...styles.row}}>
          <CstmPressable
            onPress={() => handleDigit('4')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>4</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => handleDigit('5')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>5</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => handleDigit('6')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>6</Text>
          </CstmPressable>
        </View>
        <View style={{...styles.row}}>
          <CstmPressable
            onPress={() => handleDigit('7')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>7</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => handleDigit('8')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>8</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => handleDigit('9')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>9</Text>
          </CstmPressable>
        </View>
        <View style={{...styles.row}}>
          <CstmPressable
            onPress={handleScanner}
            android_ripple={{borderless: true}}>
            <II
              name="md-finger-print"
              size={36}
              color={colors.text}
              style={styles.icon}
            />
          </CstmPressable>
          <CstmPressable
            onPress={() => handleDigit('0')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>0</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => setPin(pin.slice(0, pin.length - 1))}
            android_ripple={{borderless: true}}>
            <II
              name="backspace-outline"
              size={36}
              color={colors.text}
              style={styles.icon}
            />
          </CstmPressable>
        </View>
      </View>
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

export default PinScreen;
