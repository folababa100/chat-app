import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import moment from 'moment'

export const Groups = new Mongo.Collection('groups');

if (Meteor.isServer) {
  Meteor.publish('groups', function () {
    return Groups.find();
  })
}

Meteor.methods({
  'groups.insert'(description) {

    new SimpleSchema({
      description: {
        type: String,
        min: 10
      },
      isPublic: {
        type: Boolean
      }
    }).validate({ description })

    return Groups.insert({
      description,
      createdBy: Meteor.user().username,
      dateCreated: moment().format('LLL'),
      isPublic: false
    })

    // if (chatRoomId) {
    //   return GroupMembers.insert({ chatRoomId: chatRoomId, userId: Meteor.userId() })
    // }
  }
})
