import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import uuid from 'uuid'
import { Messages } from "./messages";

export const Chat = new Mongo.Collection('chat');

Meteor.methods({

  'chat.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('Unauthorized User')
    }

    new SimpleSchema({

    })

    Chat.insert({
      userId: Meteor.userId()
    })
  }
})