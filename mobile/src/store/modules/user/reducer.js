import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  subscriptions: [],
  loading: false,
  loadingSubscriptions: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        break;
      }
      case '@user/UPDATE_PROFILE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        draft.loading = false;
        break;
      }
      case '@user/UPDATE_PROFILE_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }
      case '@user/FETCH_SUBSCRIPTIONS_REQUEST': {
        draft.loadingSubscriptions = true;
        break;
      }
      case '@user/FETCH_SUBSCRIPTIONS_SUCCESS': {
        draft.subscriptions = action.payload.subscriptions.map(s => ({
          ...s.meetup,
          subscribed: true,
        }));
        draft.loadingSubscriptions = false;
        break;
      }
      case '@meetup/CANCEL_SUB_SUCCESS': {
        const { meetup_id } = action.payload.subscription;
        const sub = draft.subscriptions.find(item => item.id === meetup_id);
        sub.subscribed = false;
        break;
      }
      case '@auth/FETCH_SUBSCRIPTIONS_FAILURE': {
        draft.profile = null;
        draft.loadingSubscriptions = false;
        break;
      }
      default:
    }
  });
}
