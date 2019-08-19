import produce from 'immer';

const INITIAL_STATE = {
  list: [],
  page: 1,
  loading: false,
  isRefreshing: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/FETCH_REQUEST': {
        draft.page = 1;
        draft.loading = true;
        draft.isRefreshing = true;
        break;
      }
      case '@meetup/FETCH_MORE_REQUEST': {
        draft.isRefreshing = true;
        break;
      }
      case '@meetup/FETCH_SUCCESS': {
        const { meetups } = action.payload;
        draft.list = meetups;
        draft.loading = false;
        draft.isRefreshing = false;
        break;
      }
      case '@meetup/FETCH_MORE_SUCCESS': {
        const { meetups, page } = action.payload;
        draft.list = [...draft.list, ...meetups];
        if (meetups.length > 0) {
          draft.page = page;
        }
        draft.isRefreshing = false;
        break;
      }
      case '@meetup/SUBSCRIPTION_SUCCESS': {
        const { meetup_id } = action.payload.subscription;
        const meetup = draft.list.find(item => item.id === meetup_id);
        meetup.subscribed = true;
        break;
      }
      case '@meetup/FAILURE': {
        draft.loading = false;
        draft.isRefreshing = false;
        break;
      }
      default:
    }
  });
}
