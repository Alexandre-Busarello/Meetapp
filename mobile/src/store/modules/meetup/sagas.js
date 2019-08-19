import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { format } from 'date-fns';
import api from '~/services/api';
import {
  fetchMeetupsSuccess,
  fetchMoreMeetupsSuccess,
  meetupFailure,
  subscriptionMeetupSuccess,
  cancelSubMeetupSuccess,
} from './actions';

export function* fetchMeetups({ payload }) {
  try {
    const response = yield call(api.get, 'meetups', {
      params: {
        date: format(payload.date, 'yyyy-MM-dd'),
        page: payload.page,
        timestamp: new Date().getTime(),
      },
    });

    yield put(fetchMeetupsSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Falha ao obter meetups',
      'Houve um erro ao obter os meetups, tente novamente mais tarde'
    );
    yield put(meetupFailure());
  }
}

export function* fetchMoreMeetups({ payload }) {
  try {
    const response = yield call(api.get, 'meetups', {
      params: {
        date: format(payload.date, 'yyyy-MM-dd'),
        page: payload.page,
        timestamp: new Date().getTime(),
      },
    });

    yield put(fetchMoreMeetupsSuccess(response.data, payload.page));
  } catch (err) {
    Alert.alert(
      'Falha ao obter meetups',
      'Houve um erro ao obter os meetups, tente novamente mais tarde'
    );
    yield put(meetupFailure());
  }
}

export function* subscriptionMeetup({ payload }) {
  try {
    const response = yield call(
      api.post,
      `meetups/${payload.meetupId}/subscriptions`
    );

    yield put(subscriptionMeetupSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Falha ao se inscrever',
      'Houve um erro ao tentar se inscrever no meetup selecionado, verifique se ele já não ocorreu'
    );
    yield put(meetupFailure());
  }
}

export function* cancelSubMeetup({ payload }) {
  try {
    const response = yield call(
      api.delete,
      `meetups/${payload.meetupId}/subscriptions`
    );
    yield put(cancelSubMeetupSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Falha ao cancelar',
      'Houve um erro ao tentar cancelar sua inscrição no meetup, tente novamente mais tarde!'
    );
    yield put(meetupFailure());
  }
}

export default all([
  takeLatest('@meetup/FETCH_REQUEST', fetchMeetups),
  takeLatest('@meetup/FETCH_MORE_REQUEST', fetchMoreMeetups),
  takeLatest('@meetup/SUBSCRIPTION_REQUEST', subscriptionMeetup),
  takeLatest('@meetup/CANCEL_SUB_REQUEST', cancelSubMeetup),
]);
