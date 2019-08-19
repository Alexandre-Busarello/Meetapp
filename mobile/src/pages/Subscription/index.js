import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { cancelSubMeetupRequest } from '~/store/modules/meetup/actions';
import { fetchSubscriptionsRequest } from '~/store/modules/user/actions';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import { MeetupFlatList } from './styles';

function Subscription({ isFocused }) {
  const dispatch = useDispatch();

  const subscriptions = useSelector(store => store.user.subscriptions);
  const loadingSubscriptions = useSelector(
    store => store.user.loadingSubscriptions || false
  );

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchSubscriptionsRequest());
    }
  }, [dispatch, isFocused]);

  function handleRefresh() {
    dispatch(fetchSubscriptionsRequest());
  }

  function handleCancelSubscription(meetupId) {
    dispatch(cancelSubMeetupRequest(meetupId));
  }

  return (
    <Background>
      <MeetupFlatList
        data={subscriptions}
        keyExtractor={item => String(item.id)}
        onRefresh={handleRefresh}
        refreshing={loadingSubscriptions}
        renderItem={({ item }) => (
          <Meetup
            data={item}
            onCancel={() => handleCancelSubscription(item.id)}
          />
        )}
      />
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="assignment" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscription);
