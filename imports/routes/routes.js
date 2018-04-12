import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup';
import ChatDashboard from '../ui/ChatDashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import UserProfile from '../ui/UserProfile';
import ChatRegister from '../ui/ChatRegister';
import CreateChat from '../ui/CreateChat';

const onEnterNotePage = (nextState) => {
  Session.set('selectedNoteId', nextState.params.id);
};
const onLeaveNotePage = () => {
  Session.set('selectedNoteId', undefined);
};
export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/chat');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};
export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
};
export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Login} privacy="unauth"/>
      <Route path="/create" component={CreateChat} privacy="auth"/>
      <Route path="/user/:id" component={UserProfile} privacy="auth"/>
      {/* <Route path="/register" component={ChatRegister} privacy="auth"/> */}
      <Route path="/signup" component={Signup} privacy="unauth"/>
      <Route path="/chat" component={ChatDashboard} privacy="auth"/>
      <Route path="/chat/:id" component={ChatDashboard} privacy="auth" onEnter={onEnterNotePage} onLeave={onLeaveNotePage}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
