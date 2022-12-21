import {showMessage} from 'react-native-flash-message';

import {api} from '../../../api';
import { alert_Dur } from '../../../constants';
import {globalState} from '../../../stores/globalAppState';
import {ticketStore} from '../../../stores/ticketStore';
import {userStore} from '../../../stores/userStore';

const getAllUsers = async () => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  console.log(`Basic ${USER_TOKEN}`);
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/users');
    if (result?.ok) {
      const data = result?.data?.data?.map((val: any) => {
        return {
          id: val?.id,
          company_name: val?.attributes?.company,
          email: val?.attributes?.email,
          name: val?.attributes?.user_name,
          ...val?.attributes,
        };
      });
      userStore?.users?.set(data);
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};

const getTicketsByUserId = async (userId: string) => {
  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  console.log(`Basic ${USER_TOKEN}`);
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get(`/users/${userId}?include=tickets`);
    if (result?.ok) {
      const data = result?.data?.included;
      ticketStore?.tickets?.set(data || []);
    }
  } catch (error) {
    console.log('error getTicketsByUserId', error);
  }
};

const addTicket = async (data: any) => {
  const user: any = userStore?.user?.get();
  const activeMember: any = globalState?.agendaMember?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.post('/tickets', data);
    console.log('result addTicket', result);
    if (result?.ok) {
      getTicketsByUserId(activeMember?.id);
      return {status: true};
    } else {
      return {status: false, message: result};
    }
  } catch (error) {
    console.log('error addTicket', error);
    return {status: true, message: error};
  }
};

const deleteTicket = async (id: number) => {
  const user: any = userStore?.user?.get();
  const activeMember: any = globalState?.agendaMember?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.delete(`/tickets/${id}`);
    if (result?.ok) {
      getTicketsByUserId(activeMember?.id);
      showMessage({
        message: 'Ticket deleted successfully',
        type: 'success',
        duration: alert_Dur,
      });
      return {status: true};
    }else {
      return {status: false, message: result};
    }
  } catch (error) {
    console.log('error deleteTickets', error);
    return {status: false};
  }
};

const updateTicket = async (data: any) => {
  const user: any = userStore?.user?.get();
  const activeMember: any = globalState?.agendaMember?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.patch(`/tickets/${data?.data?.id}`, data);
    console.log('result updatetickets', result);
    if (result?.ok) {
      getTicketsByUserId(activeMember?.id);
      return {status: true};
    }else {
      return {status: false, message: result};
    }
  } catch (error) {
    console.log('error updatetickets', error);
    return {status: true, message: error};
  }
};
export {getAllUsers, getTicketsByUserId, addTicket, updateTicket, deleteTicket};
