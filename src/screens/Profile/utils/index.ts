import { showMessage } from 'react-native-flash-message';
import {api} from '../../../api';
import { alert_Dur } from '../../../constants';
import {userStore} from '../../../stores/userStore';

const filterUser = async (params: string = '') => {
  const user: any = userStore.get()?.user;
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get(`/users?${params}`);
    if (result?.ok) {
      return result?.data?.data[0]
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

const updateUser = async (id: number, data: any) => {
  const user: any = userStore.get()?.user;
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.patch(`/users/${id}`, data);
    if (result?.ok) {
      showMessage({
        message: 'profile updated successfully',
        type: 'success',
        duration: alert_Dur,
      });
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

export {filterUser, updateUser};
