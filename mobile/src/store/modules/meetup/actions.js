export function fetchMeetupsRequest(date, page) {
  return {
    type: '@meetup/FETCH_REQUEST',
    payload: { date, page },
  };
}

export function fetchMeetupsSuccess(meetups) {
  return {
    type: '@meetup/FETCH_SUCCESS',
    payload: { meetups },
  };
}

export function fetchMoreMeetupsRequest(date, page) {
  return {
    type: '@meetup/FETCH_MORE_REQUEST',
    payload: { date, page },
  };
}

export function fetchMoreMeetupsSuccess(meetups, page) {
  return {
    type: '@meetup/FETCH_MORE_SUCCESS',
    payload: { meetups, page },
  };
}

export function subscriptionMeetupRequest(meetupId) {
  return {
    type: '@meetup/SUBSCRIPTION_REQUEST',
    payload: { meetupId },
  };
}

export function subscriptionMeetupSuccess(subscription) {
  return {
    type: '@meetup/SUBSCRIPTION_SUCCESS',
    payload: { subscription },
  };
}

export function cancelSubMeetupRequest(meetupId) {
  return {
    type: '@meetup/CANCEL_SUB_REQUEST',
    payload: { meetupId },
  };
}

export function cancelSubMeetupSuccess(subscription) {
  return {
    type: '@meetup/CANCEL_SUB_SUCCESS',
    payload: { subscription },
  };
}

export function meetupFailure(meetups) {
  return {
    type: '@meetup/FAILURE',
    payload: { meetups },
  };
}
