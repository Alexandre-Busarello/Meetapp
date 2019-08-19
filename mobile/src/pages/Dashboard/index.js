import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { subDays, addDays } from 'date-fns';

import { fetchMeetupsRequest } from '~/store/modules/meetup/actions';

import Background from '~/components/Background';
import MeetupList from '~/components/MeetupList';
import DateInput from '~/components/DateInput';

import {
  LoadingContainer,
  Container,
  Header,
  PreviousDay,
  NextDay,
} from './styles';

function Dashboard({ isFocused }) {
  const dispatch = useDispatch();

  const loading = useSelector(store => store.meetup.loading);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchMeetupsRequest(date, 1));
    }
  }, [date, dispatch, isFocused]);

  useEffect(() => {
    dispatch(fetchMeetupsRequest(date, 1));
  }, [date, dispatch]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Background>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator size="small" color="#FFF" />
        </LoadingContainer>
      ) : (
        <Container>
          <Header>
            <PreviousDay type="button" onPress={handlePrevDay}>
              <Icon name="chevron-left" size={36} color="#FFF" />
            </PreviousDay>
            <DateInput date={date} onChange={setDate} />
            <NextDay type="button" onPress={handleNextDay}>
              <Icon name="chevron-right" size={36} color="#FFF" />
            </NextDay>
          </Header>
          <MeetupList date={date} />
        </Container>
      )}
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
