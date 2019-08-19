import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import history from '~/services/history';

import {
  fetchUserMeetupsSuccess,
  fetchUserMeetupsFailure,
  cancelMeetupSuccess,
  cancelMeetupFailure,
  updateMeetupSuccess,
  updateMeetupFailure,
  addMeetupSuccess,
  addMeetupFailure,
} from './actions';

export function* fetchUserMeetups() {
  try {
    const response = yield call(api.get, 'user-meetups', {
      params: {
        timestamp: new Date().getTime(),
      },
    });
    const data = response.data.map(meetup => ({
      ...meetup,
      dateFormatted: format(parseISO(meetup.date), "dd 'de' MMMM, 'às' HH'h'", {
        locale: pt,
      }),
    }));

    yield put(fetchUserMeetupsSuccess(data));
  } catch (err) {
    toast.error('Erro ao obter os dados do meetup!');
    yield put(fetchUserMeetupsFailure());
  }
}

export function* addMeetup({ payload }) {
  try {
    const response = yield call(api.post, 'meetups', payload.meetup);
    yield put(addMeetupSuccess(response.data));

    history.push('/dashboard');

    toast.success('Meetup cadastrado com sucesso!');
  } catch (err) {
    toast.error('Erro ao tentar cadastrar o meetup!');
    yield put(addMeetupFailure());
  }
}

export function* updateMeetup({ payload }) {
  try {
    const response = yield call(
      api.put,
      `meetups/${payload.id}`,
      payload.meetup
    );
    yield put(updateMeetupSuccess(response.data));

    history.push('/dashboard');

    toast.success('Meetup atualizado com sucesso!');
  } catch (err) {
    toast.error('Erro ao tentar atualizar o meetup!');
    yield put(updateMeetupFailure());
  }
}

export function* cancelMeetup({ payload }) {
  try {
    const response = yield call(api.delete, `meetups/${payload.id}`);
    yield put(cancelMeetupSuccess(response.data));

    history.push('/dashboard');

    toast.success('Meetup cancelado com sucesso!');
  } catch (err) {
    // console.tron.log(err);
    toast.error('Erro ao tentar cancelar o meetup!');
    yield put(cancelMeetupFailure());
  }
}

export default all([
  takeLatest('@meetup/FETCH_USER_MEETUPS_REQUEST', fetchUserMeetups),
  takeLatest('@meetup/ADD_REQUEST', addMeetup),
  takeLatest('@meetup/UPDATE_REQUEST', updateMeetup),
  takeLatest('@meetup/CANCEL_REQUEST', cancelMeetup),
]);
