import axios from 'axios';
import { axiosConf } from '@/config/app_config';

const service = axios.create(axiosConf);

service.interceptors.response.use(
    function(response) {
      return Promise.resolve(response);
    },
    function(error) {
      return Promise.reject(error);
    },
);

export default service;
