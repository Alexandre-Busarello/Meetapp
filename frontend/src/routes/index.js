import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import Meetup from '~/pages/Meetup';
import Details from '~/pages/Details';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/create-meetup" component={Meetup} isPrivate />
      <Route path="/meetup/:meetupId" component={Meetup} isPrivate />
      <Route path="/detail/:meetupId" component={Details} isPrivate />
    </Switch>
  );
}
