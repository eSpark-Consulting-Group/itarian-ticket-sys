import {cannyApi, cannyApiKey} from '../../../api';
import {CannyCategory} from '../../../types';

export const getCategories = async (req: CannyCategory) => {
  const data = {...req, apiKey: cannyApiKey};
  try {
    const res = await cannyApi.post('/categories/list', data);
    return res;
  } catch (err) {
    console.log('Error on fetch categories', err);
    throw new Error('Error ' + err);
  }
};
