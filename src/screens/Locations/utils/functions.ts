import {showMessage} from 'react-native-flash-message';
import {api} from '../../../api';
import {alert_Dur} from '../../../constants';
import { globalState } from '../../../stores/globalAppState';
import {userStore} from '../../../stores/userStore';

const getAllLocations = async () => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/locations');
    if (result?.ok) {
      globalState?.locations?.set(result?.data?.data);
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

const addLocation = async (data: any) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.post('/locations', data);
    console.log('result Add Location', result);
    if (result?.ok) {
      getAllLocations();
      return {status: true};
    }else {
      return {status: false, message: result};
    }
  } catch (error) {
    console.log('error addLocation', error);
    return {status: true, message: error};
  }
};

const deleteLocation = async (id: number) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.delete(`/locations/${id}`);
    if (result?.ok) {
      getAllLocations();
      showMessage({
        message: 'Location deleted successfully',
        type: 'success',
        duration: alert_Dur,
      });
      return {status: true};
    }else {
      return {status: false, message: result};
    }
  } catch (error) {
    console.log('error DeleteLocation', error);
    return {status: false};
  }
};

const updateLocation = async (data: any) => {
  const user: any = userStore.user.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.patch(`/locations/${data?.data?.id}`, data);
    console.log('result Location', result);
    if (result?.ok) {
      getAllLocations();
      return {status: true};
    }else {
      return {status: false, message: result};
    }
  } catch (error) {
    console.log('error Location', error);
    return {status: true, message: error};
  }
};

export {getAllLocations, addLocation, deleteLocation, updateLocation};
