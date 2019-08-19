import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

import AppConfig from '~/config/AppConfig';

if (__DEV__) {
  const tron = Reactotron.configure({
    host: AppConfig.address,
    port: 9090,
  })
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  console.tron = tron;

  tron.clear();
}
