import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');

  onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
  const selectedMessageId = Session.get('selectedMessageId');

  if (selectedMessageId) {
    browserHistory.replace(`chat/${selectedMessageId}`);
  }
})

Meteor.startup(() => {
  Session.set('selectedMessageId', undefined)
  ReactDOM.render(routes, document.getElementById('app'));
});
