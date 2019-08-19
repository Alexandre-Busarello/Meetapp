import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    // if (rest.oldPassword && !rest.password) {
    //   toast.warn('É necessário informar uma nova senha para trocar.');
    //   return;
    // }

    // if (rest.oldPassword && rest.password && !rest.confirmPassword) {
    //   toast.warn('A confirmação da nova senha é obrigatória.');
    //   return;
    // }

    const profile = Object.assign(
      { name, email, avatar_id },
      rest.oldPassword ? rest : {}
    );
    const response = yield call(api.put, 'users', profile);
    yield put(updateProfileSuccess(response.data));

    toast.success('Perfil atualizado com sucesso!');
  } catch (err) {
    toast.error('Erro ao atualizar o perfil, confira seus dados!');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
