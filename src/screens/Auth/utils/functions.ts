import {showMessage} from 'react-native-flash-message';
// @ts-ignore
import store from 'react-native-simple-store';

import {api} from '../../../api';
import {globalState} from '../../../stores/globalAppState';
import {userStore} from '../../../stores/userStore';

const handleLoginUser = async (
  email: string,
  password: string,
  remember: any,
  navigation: any,
) => {
  globalState.loader.set(true);
  console.log('email:', email);
  console.log('password:', password);
  const response = await api.post('/api/auth', {
    email: 'testwiz@yopmail.com',
    // testwiz@yopmail.com //?: simple
    // test2fa2@yopmail.com //?: authenticator 2fa
    // otptester@yopmail.com //?: sms 2fa
    // email,
    password: 'Admin123!@',
    // password,
    nameSpace: 'ServiceDesk',
  });
  if (response.ok) {
    const resData: any = response.data;
    globalState.loader.set(false);
    // console.log("handleLoginUser", response.data);
    if (resData.code == 'ERR_USER_NOT_FOUND') {
      showMessage({
        message: 'Incorrect Email or Password',
        type: 'danger',
        icon: 'auto',
      });
    }
    if (resData.code == 'SUCCESS_AUTHENTICATION') {
      const {data} = resData;
      const {displayName, email, userId, camSessionId} = data?.sessionData;

      const userObj: any = {
        user_name: displayName,
        email: email,
        userId: userId,
      };
      if (remember) {
        navigation.navigate('Pin', {newPin: true});
        userObj['sessionId'] = camSessionId;
      } else {
        showMessage({
          message: 'Authentication Successful',
          type: 'success',
          icon: 'auto',
          autoHide: true,
          duration: 100,
        });
        navigation.navigate('Draw');
      }
      console.log('userObj', userObj);

      store.update('user', userObj);
      userStore.user.set(userObj);
    }

    if (resData.code == 'OTP_REQUIRED') {
      if (resData?.data?.otpType == 'sms') {
        const result = await requestSmsOtp(resData?.data, navigation);
        if (result) {
          navigation?.navigate('OTPScreen', {
            data: resData?.data,
          });
        }
      } else {
        navigation?.navigate('OTPScreen', {
          data: resData?.data,
        });
      }
    }
  } else {
    globalState.loader.set(false);
  }
};

const requestSmsOtp = async (data: any, navigation: any) => {
  globalState.loader.set(true);

  const response = await api.post('/api/request-otp-sms', {
    otpKey: data?.otpKey,
  });
  if (response.ok) {
    const resData: any = response.data;
    globalState.loader.set(false);
    console.log('requestSmsOtp', response.data, data);
    if (resData?.code == 'ERR_OTP_VERIFICATION_CODE_ATTEMPT_LIMIT_REACHED') {
      showMessage({
        message: 'Too many login attempts try again after 1 hour',
        type: 'danger',
        icon: 'auto',
      });
    }
    if (resData?.code == 'ERR_OTP_KEY_INVALID') {
      showMessage({
        message: 'OTP key is invalid',
        type: 'danger',
        icon: 'auto',
      });
      navigation?.goBack();
    }
    if (resData?.code == 'SUCCESS_OTP_VERIFICATION_CODE_SENT') {
      return true;
    } else {
      return false;
    }
  } else {
    globalState.loader.set(false);
    return false;
  }
};

const handleVerifyOTP = async (data: any) => {
  globalState.loader.set(true);

  const response = await api.post('/api/verify-otp', {
    otpKey: data?.otpKey,
    otp: data?.otp,
    otpType: data?.otpType,
  });
  if (response.ok) {
    const resData: any = response.data;
    globalState.loader.set(false);
    if (resData?.code == 'ERR_OTP_INVALID') {
      showMessage({
        message: 'You enter invalid OTP!',
        type: 'danger',
        icon: 'auto',
      });
      return false;
    }
    if (resData.code == 'SUCCESS_AUTHENTICATION') {
      const {data} = resData;
      const {displayName, email, userId} = data?.sessionData;
      showMessage({
        message: 'Authentication Successful',
        type: 'success',
        icon: 'auto',
        autoHide: true,
        duration: 100,
      });
      const userObj: any = {
        user_name: displayName,
        email: email,
        userId: userId,
      };
      store.update('user', userObj);
      userStore.user.set(userObj);
      return true;
    }
  } else {
    globalState.loader.set(false);
    return false;
  }
};

export {handleLoginUser, handleVerifyOTP, requestSmsOtp};
