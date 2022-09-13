import {showMessage} from 'react-native-flash-message';
// @ts-ignore
import store from 'react-native-simple-store';

import {api} from '../../../api';
import {globalState} from '../../../stores/globalAppState';
import {userStore} from '../../../stores/userStore';

const handleLoginUser = async (email: string, password: string) => {
  globalState.loader.set(true);
  console.log('email:', email);
  console.log('password:', password);
  const response = await api.post('/api/auth', {
    // email: email, //"fixer101@yopmail.com"
    email: 'fixer101@yopmail.com', //
    // password: password, // "Admin123!@"
    password: 'Admin123!@', //
    nameSpace: 'ServiceDesk',
  });
  if (response.ok) {
    const resData: any = response.data;
    globalState.loader.set(false);
    console.log(response.data);
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
        userId: userId
      }
      store.update('user', userObj);
      userStore.user.set(userObj);
    }
  } else {
    globalState.loader.set(false);
  }
};

export {handleLoginUser};
