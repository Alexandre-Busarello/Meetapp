import React, { useState, useEffect, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { fetchMeetupsRequest } from '~/store/modules/meetup/actions';

import Background from '~/components/Background';
import MeetupList from '~/components/MeetupList';

import {
  LoadingContainer,
  Container,
  Header,
  PreviousDay,
  DateText,
  NextDay,
} from './styles';

function Dashboard({ isFocused }) {
  const dispatch = useDispatch();

  const loading = useSelector(store => store.meetup.loading);

  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

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
            <DateText>{dateFormatted}</DateText>
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
