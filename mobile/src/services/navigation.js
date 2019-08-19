import { NavigationActions } from 'react-navigation';

const config = {};
export function setNavigator(nav) {
  console.tron.log(nav);
  if (nav) {
    config.navigator = nav;
  }
}
export function navigate(routeName, params) {
  console.tron.log(config);
  if (config.navigator && routeName) {
    const action = NavigationActions.navigate({ routeName, params });
    config.navigator.dispatch(action);
  }
}
export function goBack() {
  if (config.navigator) {
    const action = NavigationActions.back({});
    config.navigator.dispatch(action);
  }
}
