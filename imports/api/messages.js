import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import uuid from 'uuid';
import moment from 'moment'

export const Messages = new Mongo.Collection('messages')

if (Meteor.isServer) {
  Meteor.publish('messages', function() {
    return Messages.find({ userId: this.userId })
  })
}

Meteor.methods({
  'messages.insert'(text) {
    if (!this.userId) {
      throw new Meteor.Error('Not Authorized');
    }

    new SimpleSchema({
      text: {
        type: String,
        label: 'Your Text',
        min: 1
      }
    }).validate({ text })

    Messages.insert({
      _id: uuid(),
      text,
      userId: this.userId,
      whenMessageRecievied: moment().format('LT'),
      star: false
    })
  },
  'messages.star'(_id, star) {
    if (!this.userId) {
      throw new Meteor.Error('Not Authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      star: {
        type: Boolean
      }
    }).validate({ _id, star })

    Messages.update({
      _id,
      userId: this.userId
    }, {
      $set: { star }
    })
  },
  'messages.remove'(_id) {
    if(!this.userId) {
      throw new Meteor.Error('Not Authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Messages.remove({ _id, userId: this.userId });
  }
})
