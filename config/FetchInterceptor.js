/* eslint-disable prettier/prettier */
import axios from 'axios';
// import Toast from 'react-native-simple-toast';
import {API_BASE_URL} from './AppConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_TOKEN} from '../redux/constants';
import Utils from '../utils';

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

// Config
const TOKEN_PAYLOAD_KEY = 'Authorization';

// API Request interceptor
service.interceptors.request.use(
  async config => {
    const res = await Utils.getMyObject('CURRENT_USER');
    const jwtToken = res;
    // console.log(jwtToken)
    if (jwtToken) {
      config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken.token}`;
    }

    return config;
  },
  error => {
    // Do something with request error here
		// Toast.show('An error occured.');
    Promise.reject(error);
  },
);

// API respone interceptor
service.interceptors.response.use(
  response => {
    return response.data;
  },
  async error => {

    // Remove token and redirect
    if (error.response.status === 400 || error.response.status === 403) {
      AsyncStorage.removeItem(AUTH_TOKEN);
    }

    // Toast.show(`${notificationParam.description}`);
    return Promise.reject(error);
  },
);

export default service;
