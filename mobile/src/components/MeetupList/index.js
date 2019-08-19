import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchMeetupsRequest,
  fetchMoreMeetupsRequest,
  subscriptionMeetupRequest,
} from '~/store/modules/meetup/actions';

import Meetup from '~/components/Meetup';

import { MeetupFlatList } from './styles';

export default function MeetupList({ date }) {
  const dispatch = useDispatch();

  const meetups = useSelector(store => store.meetup.list);
  const loading = useSelector(store => store.meetup.loading);
  const isRefreshing = useSelector(store => store.meetup.isRefreshing);
  const page = useSelector(store => store.meetup.page);

  function handleSubscription(meetupId) {
    dispatch(subscriptionMeetupRequest(meetupId));
  }

  function handleRefresh() {
    dispatch(fetchMeetupsRequest(date, 1));
  }

  function handleEndReached() {
    dispatch(fetchMoreMeetupsRequest(date, page + 1));
  }

  return (
    <MeetupFlatList
      data={meetups}
      keyExtractor={item => String(item.id)}
      onRefresh={handleRefresh}
      refreshing={loading || isRefreshing}
      onEndReachedThreshold={0.3}
      onEndReached={handleEndReached}
      renderItem={({ item }) => (
        <Meetup
          data={item}
          onSubscription={() => handleSubscription(item.id)}
        />
      )}
    />
  );
}
