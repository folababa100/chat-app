import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { Messages } from '../imports/api/messages';
import { Groups } from "../imports/api/groups";
import { GroupMembers } from "../imports/api/group-members";
import { Chat } from "../imports/api/chat";
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  
});
