import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import {
  fetchSubscriptionsSuccess,
  fetchSubscriptionsFailure,
  updateProfileSuccess,
  updateProfileFailure,
} from './actions';

export function* fetchSubscriptions() {
  try {
    const response = yield call(api.get, 'subscriptions');
    yield put(fetchSubscriptionsSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Falha ao buscar inscrições',
      'Houve um erro ao tentar buscar sua inscrições, tente novamente mais tarde!'
    );
    yield put(fetchSubscriptionsFailure());
  }
}

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };
    const response = yield call(api.put, 'users', profile);
    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Falha na atualização',
      'Houve um erro na atualização, verifique seus dados!'
    );
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest('@user/FETCH_SUBSCRIPTIONS_REQUEST', fetchSubscriptions),
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
]);
