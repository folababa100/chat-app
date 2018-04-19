import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import uuid from 'uuid';
import moment from 'moment'

import { GroupMembers } from "./group-members";

export const Groups = new Mongo.Collection('groups');

if (Meteor.isServer) {
  Meteor.publish('groups', function () {
    return Groups.find();
  })
}

Meteor.methods({
  'groups.insert'(description) {

    new SimpleSchema({
      name: {
        type: String,
        min: 4
      },
      description: {
        type: String,
        min: 10
      },
      isPublic: {
        type: Boolean
      }
    }).validate({ name, description })

    let chatRoomId = Groups.insert({
      name,
      description,
      createdBy: Meteor.user().username,
      dateCreated: moment().format('LLL'),
      isPublic: false
    })

    if (chatRoomId) {
      return GroupMembers.insert({ chatRoomId: chatRoomId, userId: Meteor.userId() })
    }
  }
})
