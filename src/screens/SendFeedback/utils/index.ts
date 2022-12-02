/**
 *
 * @param req
 * @returns res
 */

import {cannyApi, cannyApiKey} from '../../../api';
import {CannyCategory, CannyPosts} from '../../../types';

const getCategories = async (req?: CannyCategory) => {
  const data: {apiKey: string & CannyCategory} = {...req, apiKey: cannyApiKey};
  try {
    const res = await cannyApi.post('/categories/list', data);
    return res;
  } catch (err) {
    console.log('Error on fetch categories', err);
    throw new Error('Error ' + err);
  }
};

const getPosts = async (req?: CannyPosts) => {
  const data: {apiKey: string} = {...req, apiKey: cannyApiKey};
  try {
    console.log('chla');
    const res = await cannyApi.post('/posts/list', data);
    return res;
  } catch (err) {
    console.log('Error on fetch categories', err);
    throw new Error('Error ' + err);
  }
};

const getPostbyId = async (req?: {id?: string}) => {
  const data: {apiKey: string} = {...req, apiKey: cannyApiKey};
  try {
    const res = await cannyApi.post('/posts/retrieve', data);
    return res;
  } catch (err) {
    console.log('Error on fetch categories', err);
    throw new Error('Error ' + err);
  }
};

export {getCategories, getPosts, getPostbyId};
