import {api} from '../../../api';
import {companyStore} from '../../../stores/companyStore';
import {userStore} from '../../../stores/userStore';

let companiesCache: any;
export const getAllCompanies = async (cacheEnabled: boolean = true) => {
  if (companiesCache && cacheEnabled) {
    companyStore?.companies?.set(companiesCache);
    return;
  }

  const user: any = userStore?.user?.get();
  const USER_TOKEN = user?.token;
  api.setHeaders({
    Authorization: `Basic ${USER_TOKEN}`,
  });
  try {
    const result: any = await api.get('/organizations');
    if (result?.ok) {
      const data = result?.data?.data?.map((val: any) => {
        return {
          ...val?.attributes,
          id: val?.id,
        };
      });
      companiesCache = data;
      companyStore?.companies?.set(companiesCache);
    }
  } catch (error) {
    console.log('error getAllUsers', error);
  }
};
