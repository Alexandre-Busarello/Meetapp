import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import Header from '~/components/Header';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Subscription from '~/pages/Subscription';
import Profile from '~/pages/Profile';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        Root: createStackNavigator(
          {
            App: createBottomTabNavigator(
              {
                Dashboard,
                Subscription,
                Profile,
              },
              {
                resetOnBlur: true,
                tabBarOptions: {
                  keyboardHidesTabBar: true,
                  activeTintColor: '#FFF',
                  inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
                  style: {
                    backgroundColor: '#2B1A2F',
                  },
                },
              }
            ),
          },
          {
            headerBackTitleVisible: false,
            defaultNavigationOptions: navigation => ({
              header: <Header {...navigation} />,
            }),
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'Root' : 'Sign',
      }
    )
  );
