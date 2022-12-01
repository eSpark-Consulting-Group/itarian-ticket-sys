import {create} from 'apisauce';

import {
  REACT_APP_PROD_EU_MODE,
  REACT_APP_PROD_US_MODE,
  REACT_APP_STAGE_MODE,
  REACT_APP_FAVEO_MODE,
  REACT_APP_CANNY_MODE,
} from '@env';
import {userStore} from '../stores/userStore';

export const cannyApiKey = 'e0379baa-ed8d-0b13-ef80-0d9f679adc79'; //! Do not remove (secret api key for canny.io)
const user: any = userStore.get()?.user;
const USER_TOKEN = user?.token;

export const api = create({
  baseURL: REACT_APP_FAVEO_MODE,
  headers: {
    Authorization: USER_TOKEN
      ? `Basic ${USER_TOKEN}`
      : 'Basic YWNjb3VudDpmYXZlby1hcGk=',
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
  },
});

export const cannyApi = create({
  baseURL: REACT_APP_CANNY_MODE,
});
