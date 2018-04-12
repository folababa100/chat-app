import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const GroupMembers = new Mongo.Collection('group_members')

if (Meteor.isServer) {
  Meteor.publish('group_members', function () {
    return GroupMembers.find();
  })
}

Meteor.methods({
  'group_members'() {
    if (!this.userId) {
      throw new Meteor.Error('Not Authorized user')
    } else {
      GroupMembers.insert({
        user: Meteor.user().username
      })
    }
  }
})
