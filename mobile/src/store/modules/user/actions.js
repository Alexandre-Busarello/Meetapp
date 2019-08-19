export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}
export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}

export function fetchSubscriptionsRequest() {
  return {
    type: '@user/FETCH_SUBSCRIPTIONS_REQUEST',
  };
}

export function fetchSubscriptionsSuccess(subscriptions) {
  return {
    type: '@user/FETCH_SUBSCRIPTIONS_SUCCESS',
    payload: { subscriptions },
  };
}

export function fetchSubscriptionsFailure() {
  return {
    type: '@user/FETCH_SUBSCRIPTIONS_FAILURE',
  };
}
