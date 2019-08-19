import axios from 'axios';

import AppConfig from '~/config/AppConfig';

const api = axios.create({
  baseURL: `http://${AppConfig.address}:4444`,
});

export default api;
