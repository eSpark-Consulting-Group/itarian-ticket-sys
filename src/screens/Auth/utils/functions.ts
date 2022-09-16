import {showMessage} from 'react-native-flash-message';
// @ts-ignore
import store from 'react-native-simple-store';

import {api} from '../../../api';
import {globalState} from '../../../stores/globalAppState';
import {userStore} from '../../../stores/userStore';

const handleLoginUser = async (
  email: string,
  password: string,
  navigation: any,
) => {
  globalState.loader.set(true);
  console.log('email:', email);
  console.log('password:', password);
  const response = await api.post('/api/auth', {
    // email: email, //"fixer101@yopmail.com"
    email: 'test2fafree@yopmail.com', //
    // password: password, // "Admin123!@"
    password: 'Admin123!@', //
    nameSpace: 'ServiceDesk',
  });
  if (response.ok) {
    const resData: any = response.data;
    globalState.loader.set(false);
    console.log("handleLoginUser", response.data);
    if (resData.code == 'ERR_USER_NOT_FOUND') {
      showMessage({
        message: 'Incorrect Email or Password',
        type: 'danger',
        icon: 'auto',
      });
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
    }

    if (resData.code == 'OTP_REQUIRED') {
      if (resData?.data?.otpType == 'sms') {
        requestSmsOtp(resData, navigation);
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
    otpKey: data?.data?.otpKey,
  });
  if (response.ok) {
    const resData: any = response.data;
    globalState.loader.set(false);
    console.log("requestSmsOtp", response.data);
    if(resData?.code == "SUCCESS_OTP_VERIFICATION_CODE_SENT") {
      navigation?.navigate('OTPScreen', {
        data: data,
      });
    }
  } else {
    globalState.loader.set(false);
  }
};

export {handleLoginUser};
