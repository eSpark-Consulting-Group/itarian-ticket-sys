import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import Images from '../../../assets/images';
import {SCREEN_HEIGHT, WINDOW_HEIGHT} from '../../../constants';
import styles from './style';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Theme, useTheme} from '@react-navigation/native';
import {CstmButton} from '../../../components';
import {handleVerifyOTP, requestSmsOtp} from '../utils/functions';
// @ts-ignore
import CountDown from 'react-native-countdown-component';

const OTPScreen = ({navigation, route}: any) => {
  const paramsData = route?.params?.data;

  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(300);
  const [expired, setExpired] = useState(false);

  console.log(
    'OTPScreen route.?params',
    route?.params?.data,
    paramsData?.data?.otpType,
  );
  const {colors}: Theme = useTheme();

  const onSubmit = () => {
    var obj = {
      otp: otp,
      otpKey: paramsData?.otpKey,
      otpType: paramsData?.otpType,
    };
    console.log('obj obj obj', obj);
    handleVerifyOTP(obj);
  };

  const onResend = async () => {
    setCounter(0);
    const result = await requestSmsOtp(paramsData, navigation);
    if (result) {
      setCounter(300);
      setExpired(!expired);
    }
  };
  return (
    <View style={{backgroundColor: colors.background}}>
      <View style={styles.imageContainer}>
        <Image
          source={Images.Logo}
          resizeMode={'contain'}
          style={styles.headerImage}
        />
      </View>
      <View style={styles.imageContainer}>
        <Text style={{fontWeight: 'bold', color: colors.text, fontSize: 25}}>
          OTP Verification
        </Text>
        <Text style={{}}>
          We sent your code to your{' '}
          {paramsData?.otpType == 'sms'
            ? 'Phone Number'
            : '2 Factor Authenticator App'}
        </Text>
        {!expired && paramsData?.otpType == 'sms' && (
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginVertical: 5}}>OTP will expire in</Text>
            <CountDown
              until={counter}
              onFinish={() => {
                setExpired(!expired);
              }}
              timeToShow={['M', 'S']}
              timeLabels={{m: 'MM', s: 'SS'}}
              style={{width: '15%'}}
              digitStyle={{backgroundColor: 'none'}}
              separatorStyle={{
                color: colors.primary,
                marginBottom: 16,
                marginHorizontal: -15,
              }}
              digitTxtStyle={{color: colors.primary}}
              timeLabelStyle={{color: 'transparent'}}
              showSeparator
              size={12}
            />
          </View>
        )}
      </View>
      <View style={{marginTop: SCREEN_HEIGHT * 0.15}}>
        <OTPInputView
          style={{width: '80%', height: 100, alignSelf: 'center'}}
          pinCount={6}
          code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => setOtp(code)}
          autoFocusOnLoad={false}
          codeInputFieldStyle={{
            ...styles.underlineStyleBase,
            color: colors.text,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 5,
            height: 40,
            width: 40,
          }}
          codeInputHighlightStyle={{
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 5,
          }}
        />

        <CstmButton
          disabled={otp?.length != 6}
          title="Continue"
          loader={false}
          onPress={() => onSubmit()}
        />
        {paramsData?.otpType == 'sms' && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{alignSelf: 'center', marginVertical: SCREEN_HEIGHT * 0.15}}
            disabled={!expired}
            onPress={() => {
              // _resendOtp()
              onResend();
            }}>
            <Text
              style={[
                styles.resendCode,
                {color: colors.primary + (!expired ? '40' : '')},
              ]}>
              Resend OTP Code
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OTPScreen;
