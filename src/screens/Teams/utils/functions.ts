import {showMessage} from 'react-native-flash-message';
import {api} from '../../../api';
import {alert_Dur} from '../../../constants';
import {teamStore} from '../../../stores/teamStore';
import {userStore} from '../../../stores/userStore';

const getAllTeams = async () => {
  const user: any = userStore.get()?.user;
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/teams');
    if (result?.ok) {
      teamStore?.teams?.set(result?.data?.data);
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

const addTeam = async (data: any) => {
  const user: any = userStore.get()?.user;
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.post('/teams', data);
    console.log('result addTeam', result);
    if (result?.ok) {
      getAllTeams();
      return {status: true};
    }
  } catch (error) {
    console.log('error addTeam', error);
    return {status: true, message: error};
  }
};

const deleteTeams = async (id: number) => {
  const user: any = userStore.get()?.user;
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.delete(`/teams/${id}`);
    if (result?.ok) {
      getAllTeams();
      showMessage({
        message: 'Teams deleted successfully',
        type: 'success',
        duration: alert_Dur,
      });
      return {status: true};
    }
  } catch (error) {
    console.log('error getAllUsers', error);
    return {status: false};
  }
};

const updateTeam = async (data: any) => {
  const user: any = userStore.get()?.user;
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.patch(`/teams/${data?.data?.id}`, data);
    console.log('result updateTeam', result);
    if (result?.ok) {
      getAllTeams();
      return {status: true};
    }
  } catch (error) {
    console.log('error updateTeam', error);
    return {status: true, message: error};
  }
};
export {getAllTeams, addTeam, deleteTeams, updateTeam};
