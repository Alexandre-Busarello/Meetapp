export function fetchUserMeetupsRequest() {
  return {
    type: '@meetup/FETCH_USER_MEETUPS_REQUEST',
  };
}

export function fetchUserMeetupsSuccess(userMeetups) {
  return {
    type: '@meetup/FETCH_USER_MEETUPS_SUCCESS',
    payload: { userMeetups },
  };
}

export function fetchUserMeetupsFailure() {
  return {
    type: '@meetup/FETCH_USER_MEETUPS_FAILURE',
  };
}

export function addMeetupRequest(meetup) {
  return {
    type: '@meetup/ADD_REQUEST',
    payload: { meetup },
  };
}

export function addMeetupSuccess(meetup) {
  return {
    type: '@meetup/ADD_SUCCESS',
    payload: { meetup },
  };
}

export function addMeetupFailure() {
  return {
    type: '@meetup/ADD_FAILURE',
  };
}

export function updateMeetupRequest(id, meetup) {
  return {
    type: '@meetup/UPDATE_REQUEST',
    payload: { id, meetup },
  };
}

export function updateMeetupSuccess(meetup) {
  return {
    type: '@meetup/UPDATE_SUCCESS',
    payload: { meetup },
  };
}

export function updateMeetupFailure() {
  return {
    type: '@meetup/UPDATE_FAILURE',
  };
}

export function cancelMeetupRequest(id) {
  return {
    type: '@meetup/CANCEL_REQUEST',
    payload: { id },
  };
}

export function cancelMeetupSuccess(meetup) {
  return {
    type: '@meetup/CANCEL_SUCCESS',
    payload: { meetup },
  };
}

export function cancelMeetupFailure() {
  return {
    type: '@meetup/CANCEL_FAILURE',
  };
}
