import {showMessage} from 'react-native-flash-message';
// @ts-ignore
import store from 'react-native-simple-store';

import {api} from '../../../api';
import {loader} from '../../../stores/globalAppState';
import {userStore} from '../../../stores/userStore';

const handleLoginUser = async (email: string, password: string) => {
  loader.set(true);
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
    loader.set(false);
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
      const {displayName} = data?.sessionData;
      showMessage({
        message: 'Authentication Successful',
        type: 'success',
        icon: 'auto',
        autoHide: true,
        duration: 100,
      });
      userStore.user.set(displayName);
      store.update('user', {
        user: displayName,
      });
    }
  } else {
    loader.set(false);
  }
};

export {handleLoginUser};
